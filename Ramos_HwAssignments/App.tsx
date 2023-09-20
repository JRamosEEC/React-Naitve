import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

//Default page is photo gallery now because I'm pretty heavily vested here
import { PhotoGallery } from './PhotoGallery';
import { ImageDetails } from './ImageDetails';
import { ImageModal } from './ImageModal';

//HW Assignments
import PhotoGalleryApp from './Ramos_Wk3_PhotoGalleryNav/PhotoGalleryApp.tsx';
import WeatherApp from './Ramos_Wk4_WeatherApp/WeatherApp.tsx';
import BarcodeScannerApp from './Ramos_ClassAssignment_BarcodeScanner/BarcodeScannerApp.tsx';
import AnimateApp from './Ramos_ClassAssignment_ReAnimated/AnimateApp.tsx';

//Final Assignment
import MsgApp from './Ramos_FinalAssignment_MsgAPI-Consumer/MessagingApp.tsx';

import Ionicons from '@expo/vector-icons/Ionicons';

export type StackParamList = {
  Home: undefined;
  ImageDetails: { imageUrl: string };
  ImageModal: { imageUrl: string};
};

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//Homework Assignments
const HomeStack = createStackNavigator<StackParamList>();
const DetailsStack = createStackNavigator<StackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="PhotoG" component={PhotoGalleryApp} />
    </HomeStack.Navigator>
  );
};
const HW3PhotoGalleryNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Homework') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          // You can return any component that you like here
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
        }}
      >
        {/* Homework Assignments */}
        <Drawer.Screen name="Week2-PhotoGallery" component={PhotoGallery} />
        <Drawer.Screen name="Week3-PhotoGalleryWithNav" component={HW3PhotoGalleryNav} />
        <Drawer.Screen name="Week4-WeatherApp" component={WeatherApp} />

        {/* Class Assignments */}
        <Drawer.Screen name="Week4-Class-BarcodeScannerApp" component={BarcodeScannerApp} />
        <Drawer.Screen name="Week7-Class-Animate" component={AnimateApp} />

        {/* Final Assignment */}
        <Drawer.Screen name="Final-Assignment-Messaging-App" component={MsgApp} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
