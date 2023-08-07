import { useState } from 'react';
import { Text, View, Modal, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { PhotoItem } from './PhotoItem.tsx';
import { StyleSheet } from 'react-native';

interface ImageData {
  id: number;
  url: string;
}

const imageData: ImageData[] = [];
for (let i = 1; i < 70; i++) {
  imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

export const PhotoGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePhotoItems, setActivePhotoItems] = useState(imageData);
  const [isFocussedImage, setIsFocussedImage] = useState(false);
  const [focussedImage, setFocussedImage] = useState({id: 0, url: ''});

  const handleOverlayPressed = () => {
    setIsFocussedImage(!isFocussedImage);
  };

  const renderItem = ({item}: any) => {
    const handleImagePress = () => {
      setFocussedImage(item);
      handleOverlayPressed();
    };

    return (
      <TouchableOpacity onPress={(item) => handleImagePress()}>
        <PhotoItem id={ item.id } imageUrl={ item.url } focussed={false}/>
      </TouchableOpacity>
    );
  };

  const search = (query: string) => {
    const filteredImages = imageData.filter((image) => {
      return image.url.toLowerCase().includes(query.toLowerCase())
    });

    setActivePhotoItems(filteredImages);
    setSearchQuery(query);
  }

  return (
    <View style={styles.viewContainer}>
      <TextInput
        value={searchQuery}
        onChangeText={(text) => { search(text); }}
        placeholder="Search Here"
        style={styles.textInput}
      />

      <FlatList
        data={activePhotoItems}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderItem(item)}
      />

      <Modal
        visible={isFocussedImage}
        transparent={true}
        onRequestClose={() => setIsFocussedImage(false)}
      >
        <TouchableOpacity style={styles.overlayContainer} onPress={(item) => handleOverlayPressed()}>
          <PhotoItem id={ focussedImage.id } imageUrl={ focussedImage.url } focussed={ true }/>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 100,
  },
});
