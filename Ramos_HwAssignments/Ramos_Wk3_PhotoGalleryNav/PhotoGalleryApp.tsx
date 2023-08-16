import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { PhotoGallery } from './PhotoGallery';
import { ImageDetails } from './ImageDetails';
import { ImageModal } from './ImageModal';

export type StackParamList = {
  Home: undefined;
  ImageDetails: { imageUrl: string };
  ImageModal: { imageUrl: string};
};
const Stack = createStackNavigator<StackParamList>();

export default function PhotoGalleryApp() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={PhotoGallery} options={{headerShown: false}}/>
        <Stack.Screen name="ImageDetails" component={ImageDetails} options={{headerStyle: {backgroundColor: 'lightgray'}}}/>
        <Stack.Screen name="ImageModal" component={ImageModal} options={{presentation:'modal', title: '', headerTintColor: 'white', headerStyle: {backgroundColor: 'black', borderBottomWidth: 0}}}/>
      </Stack.Navigator>
  );
}
