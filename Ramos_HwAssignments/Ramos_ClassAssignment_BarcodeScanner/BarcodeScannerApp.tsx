import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { BarcodeScanner } from './BarcodeScanner';

export type StackParamList = {
  BarcodeScanner: undefined;
};
const Stack = createStackNavigator<StackParamList>();

export default function WeatherApp() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}
