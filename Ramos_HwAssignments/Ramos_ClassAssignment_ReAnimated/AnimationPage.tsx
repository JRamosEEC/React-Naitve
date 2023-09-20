import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, SafeAreaView, Button, StyleSheet } from 'react-native';
import { StackParamList } from './App';
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  withRepeat,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

export const AnimationPage = () => {
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const OFFSET = 40;
  const TIME = 250;
  const DELAY = 400;

  const handlePress = () => {
    offset.value = withDelay(
      DELAY,
      withSequence(
        withTiming(-OFFSET, { duration: TIME / 2 }),
        withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
        withTiming(0, { duration: TIME / 2 })
      )
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, style]} />
      <Button title="shake" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

  },
  box: {
    height: 100,
    width: 100,
    margin: 50,
    backgroundColor: '#b58df1',
    borderRadius: 15,
  },
});
