import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BarcodeScanner } from './BarcodeScanner';
import { ProductDetail } from './ProductDetail';
import { Favorites } from './Favorites';

export type ScannerStackParamList = {
  BarcodeScanner: undefined;
  ProductDetail: { data: any };
};

const Tab = createBottomTabNavigator();
const ScannerStack = createStackNavigator<ScannerStackParamList>();
const FavoritesStack = createStackNavigator<ScannerStackParamList>();

const ScannerStackNavigator = () => {
  return (
    <ScannerStack.Navigator>
      <ScannerStack.Screen name="BarcodeScanner" component={BarcodeScanner} options={{headerShown: false}}/>
      <ScannerStack.Screen name="ProductDetail" component={ProductDetail} />
    </ScannerStack.Navigator>
  );
};

const FavoritesStackNavigator = () => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={Favorites} />
    </FavoritesStack.Navigator>
  );
};

export default function BarcodeScannerApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          //if (route.name === 'Forecast5Day') {
          //  iconName = '5-circle';
          //} else if (route.name === 'Forecast7Day') {
          //  iconName = '7-circle';
          //}

          // You can return any component that you like here
          return <FontAwesomeIcon icon={ faCircle } size={size} color={color}/>
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Scanner" component={ScannerStackNavigator} options={{title: "Scanner", headerShown: false}} />
      <Tab.Screen name="FavoritesTab" component={FavoritesStackNavigator} options={{title: "Favorites", headerShown: false}} />
    </Tab.Navigator>

  );
}
