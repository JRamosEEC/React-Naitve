import { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { PhotoItem } from './PhotoItem';
import { StackParamList } from './App';

type ImageDetailsScreenNavigationProp = StackNavigationProp<StackParamList, 'ImageDetails'>;
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

  return (
      <>
        <SafeAreaView style={styles.viewContainer}>
          <TouchableOpacity onPress={() => handleImagePress(params.imageUrl)}>
            <PhotoItem id={ 1 } imageUrl={ params.imageUrl } focussed={true}/>
          </TouchableOpacity>

          <Text style={styles.headerText}>{ params.imageUrl}</Text>
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
});
