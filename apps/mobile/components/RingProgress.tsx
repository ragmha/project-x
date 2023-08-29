import { FC, useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import SVG, { Circle } from 'react-native-svg';

interface RingProgressProps {
  radius?: number;
  strokeWidth?: number;
  progress: number;
}

const color = '#EE0F55';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RingProgress: FC<RingProgressProps> = ({ radius = 100, strokeWidth = 35, progress }) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = innerRadius * 2 * Math.PI;

  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(progress, { duration: 1500 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference],
  }));

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: 'center',
      }}
    >
      <SVG>
        <Circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          strokeWidth={strokeWidth}
          stroke={color}
          opacity={0.2}
        />
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          r={innerRadius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={[circumference * progress, circumference]}
          strokeLinecap="round"
          rotation="-90"
        />
      </SVG>
    </View>
  );
};

export default RingProgress;
