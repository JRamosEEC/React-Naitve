import { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, Image, SafeAreaView, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { PhotoItem } from './PhotoItem';
import { SearchComponent } from './SearchComponent';
import { StyleSheet } from 'react-native';
import { StackParamList } from './App';
import Animated, {
  useSharedValue,
  sharedTransitionTag,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ImageData {
  id: number;
  url: string;
}

const imageData: ImageData[] = [];
for (let i = 1; i < 70; i++) {
  imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;
export const PhotoGallery = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const verticalMargin = useSharedValue(5);

  const [activePhotoItems, setActivePhotoItems] = useState(imageData);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const newMargin = 2 + event.contentOffset.y / 30;
      if (newMargin < 2) {
        verticalMargin.value = 2;
      } else if (newMargin > 20) {
        verticalMargin.value = 20;
      } else {
        verticalMargin.value = newMargin;
      }
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginVertical: verticalMargin.value,
    };
  });

  const renderItem = ({item}: any) => {
    const handleImagePress = () => {
      navigation.navigate('ImageDetails', {
        imageUrl: item.url,
      });
    };

    return (
      <TouchableOpacity onPress={(item) => handleImagePress()}>
        <Animated.Image
          sharedTransitionTag={`tag-${item.url}`}
          style={[styles.thumbnail, animatedStyle]}
          source={{ uri: item.url}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.viewContainer}>
      <SearchComponent imageData={imageData} updateList={setActivePhotoItems} />

      <Animated.FlatList
        contentContainerStyle={{ alignItems:'center', paddingTop:20}}
        data={activePhotoItems}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderItem(item)}
        onScroll={scrollHandler}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  thumbnail: {
    width: 75,
    height: 75,
    borderRadius: 10,
    margin: 5,
  },
});
