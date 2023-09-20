import { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, SafeAreaView, Modal, StyleSheet, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { PhotoItem } from './PhotoItem';
import { StackParamList } from './App';
import Animated, {
  useSharedValue,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  useAnimatedStyle,
} from 'react-native-reanimated';

type ImageModalScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'ImageModal'>;
type ImageModalScreenRouteProp = RouteProp<StackParamList, 'ImageModal'>
export const ImageModal = () => {
  const navigation = useNavigation<ImageModalScreenNavigationProp>();
  const {params} = useRoute<ImageModalScreenRouteProp >();

  //Animation
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotateX: `${offset.value}deg` }, { rotateY: `${offset.value}deg` }],
  }));

  const OFFSET = 360;
  const TIME = 750;
  const DELAY = 200;

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
      <>
        <SafeAreaView style={styles.modalViewContainer}>
          <TouchableOpacity onPress={() => handlePress()}>
            <Animated.Image
              style={[styles.thumbnail, style]}
              source={{ uri: params.imageUrl}}
              resizeMethod="scale"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
};

const styles = StyleSheet.create({
  modalViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'black',
  },
  thumbnail: {
    width: 300,
    height: 300,
    borderRadius: 20,
    margin: 5,
  },
});
