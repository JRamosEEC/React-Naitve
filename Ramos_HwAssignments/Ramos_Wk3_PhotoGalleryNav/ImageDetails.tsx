import { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Text, View, uImage, SafeAreaView, StyleSheet, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { PhotoItem } from './PhotoItem';
import { StackParamList } from './App';
import Animated, {
  useSharedValue,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  sharedTransitionTag,
  useAnimatedStyle,
} from 'react-native-reanimated';

type ImageDetailsScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'ImageDetails'>;
type ImageDetailsScreenRouteProp = RouteProp<StackParamList, 'ImageDetails'>

export const ImageDetails = () => {
  const navigation = useNavigation<ImageDetailsScreenNavigationProp>();
  const {params} = useRoute<ImageDetailsScreenRouteProp >();
  navigation.setOptions({ title: params.imageUrl });

  const [isFocussedImage, setIsFocussedImage] = useState(false);

  const handleOverlayPressed = () => {
    setIsFocussedImage(!isFocussedImage);
  };

  const handleImagePress = (url: string) => {
   navigation.navigate('ImageModal', {
      imageUrl: url,
    });
  };

  //Animation
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ scaleX: offset.value }],
  }));

  const OFFSET = 2;
  const TIME = 750;
  const DELAY = 200;

  const UNTIL_THE_END_OF_TIME = 20000000000;

  useEffect(() => {
    offset.value = withDelay(
      DELAY,
      withSequence(
        withTiming(-OFFSET, { duration: TIME / 2 }),
        withRepeat(withTiming(OFFSET, { duration: TIME }), UNTIL_THE_END_OF_TIME, true),
        withTiming(0, { duration: TIME / 2 })
      )
    )
  });

  return (
      <>
        <SafeAreaView style={styles.viewContainer}>
          <TouchableOpacity onPress={() => handleImagePress(params.imageUrl)}>
            <Animated.Image
              sharedTransitionTag={`tag-${params.imageUrl}`}
              style={styles.thumbnail}
              source={{ uri: params.imageUrl}}
              resizeMethod="scale"
              resizeMode="cover"
            />
          </TouchableOpacity>

          <Animated.Text style={[styles.headerText, style]}>{ params.imageUrl}</Animated.Text>
          <Text style={styles.headerText}>(Sameul Jackson Lorem Ipsum)</Text>
          <Text>https://slipsum.com</Text>
          <Text>But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.</Text>
        </SafeAreaView>
      </>
    );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: 300,
    height: 300,
    borderRadius: 20,
    margin: 5,
  },
});
