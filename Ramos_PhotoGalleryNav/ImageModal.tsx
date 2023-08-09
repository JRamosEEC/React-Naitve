import { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, SafeAreaView, Modal, StyleSheet, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { PhotoItem } from './PhotoItem';
import { StackParamList } from './App';

type ImageModalScreenNavigationProp = StackNavigationProp<StackParamList, 'ImageModal'>;
type ImageModalScreenRouteProp = RouteProp<StackParamList, 'ImageModal'>
export const ImageModal = () => {
  const navigation = useNavigation<ImageModalScreenNavigationProp>();
  const {params} = useRoute<ImageModalScreenRouteProp >();

  const [isFocussedImage, setIsFocussedImage] = useState(false);

  const handleOverlayPressed = () => {
    setIsFocussedImage(!isFocussedImage);
  };

  return (
      <>
        <SafeAreaView style={styles.modalViewContainer}>
          <PhotoItem id={ 1 } imageUrl={ params.imageUrl } focussed={ true }/>
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
});
