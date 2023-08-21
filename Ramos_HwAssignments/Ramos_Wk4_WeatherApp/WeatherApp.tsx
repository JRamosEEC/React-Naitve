import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { UseFetch } from './Functions/useFetch';
import { Weather } from './Weather';
import { Forecast } from './Forecast';

export type StackParamList = {
  Weather: undefined;
  Forecast: undefined;
};

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const ForecastTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Forecast5Day') {
            iconName = '5-circle';
          } else if (route.name === 'Forecast7Day') {
            iconName = '7-circle';
          }

          // You can return any component that you like here
          return <FontAwesomeIcon icon={ faCircle } size={size} color={color}/>
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Forecast5Day" component={Forecast} initialParams={{timeSpan: 5}} options={{title: "Five Day", headerShown: false}} />
      <Tab.Screen name="Forecast7Day" component={Forecast} initialParams={{timeSpan: 7}} options={{title: "Seven Day", headerShown: false}} />
    </Tab.Navigator>
  );
};

export default function WeatherApp() {
  return (
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'left',
        }}
      >
        <Drawer.Screen name="Weather" component={Weather} options={{title: "Current Weather", headerTitleAlign: "center"}}/>
        <Drawer.Screen name="Forecast" component={ForecastTab} options={{title: "Forecast", headerTitleAlign: "center"}}/>
      </Drawer.Navigator>
  );
}
