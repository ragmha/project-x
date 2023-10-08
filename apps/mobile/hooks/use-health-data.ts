import { useState, useEffect, useCallback } from 'react';
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';

import supabase from '../lib/supabase';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

type UseHealthData = {
  steps: number;
  flights: number;
  distance: number;
  refetch: () => Promise<void>;
};

export const useHealthData = (date: Date): UseHealthData => {
  const [hasPermission, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err) {
        console.error(`Error checking availability: ${err}`);
        return;
      }

      if (!isAvailable) {
        console.error('HealthKit is not available');
        return;
      }

      AppleHealthKit.initHealthKit(permissions, (error) => {
        if (error) {
          console.error(`Error getting permission: ${error}`);
          return;
        }

        setHasPermission(true);
      });
    });
  }, []);

  const fetchData = useCallback(async () => {
    if (!hasPermission) {
      return;
    }

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    try {
      const stepCount = await new Promise<number>((resolve, reject) => {
        AppleHealthKit.getStepCount(options, (error, results) => {
          if (error) {
            reject(new Error(`Error getting steps count: ${error}`));
          } else {
            resolve(results.value);
          }
        });
      });

      const flightsCount = await new Promise<number>((resolve, reject) => {
        AppleHealthKit.getFlightsClimbed(options, (error, results) => {
          if (error) {
            reject(new Error(`Error getting flights count: ${error}`));
          } else {
            resolve(results.value);
          }
        });
      });

      const distanceCount = await new Promise<number>((resolve, reject) => {
        AppleHealthKit.getDistanceWalkingRunning(options, (error, results) => {
          if (error) {
            reject(new Error(`Error getting distance count: ${error}`));
          } else {
            resolve(results.value);
          }
        });
      });

      setSteps(stepCount);
      setFlights(flightsCount);
      setDistance(distanceCount);

      // Save data to Supabase once current and before midnight

      const { data, error } = await supabase.from('health_data').upsert([
        {
          date: new Date().toISOString(),
          steps: stepCount,
          flights: flightsCount,
          distance: distanceCount,
        },
      ]);

      if (error) {
        console.error(`Error pushing data to Supabase: ${error.message}`);
      } else {
        console.log(`Data pushed to Supabase: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error(error);
    }
  }, [hasPermission]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = async () => {
    await fetchData();
  };

  return {
    steps,
    flights,
    distance,
    refetch,
  };
};
