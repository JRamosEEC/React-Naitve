import { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, SafeAreaView, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { PhotoItem } from './PhotoItem';
import { SearchComponent } from './SearchComponent';
import { StyleSheet } from 'react-native';
import { StackParamList } from './App';

interface ImageData {
  id: number;
  url: string;
}

const imageData: ImageData[] = [];
for (let i = 1; i < 70; i++) {
  imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;
export const PhotoGallery = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [activePhotoItems, setActivePhotoItems] = useState(imageData);

  const renderItem = ({item}: any) => {
    const handleImagePress = () => {
      navigation.navigate('ImageDetails', {
        imageUrl: item.url,
      });
    };

    return (
      <TouchableOpacity onPress={(item) => handleImagePress()}>
        <PhotoItem id={ item.id } imageUrl={ item.url } focussed={false}/>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.viewContainer}>
      <SearchComponent imageData={imageData} updateList={setActivePhotoItems} />

      <FlatList
        data={activePhotoItems}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderItem(item)}
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
});
