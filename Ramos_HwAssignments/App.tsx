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

import Ionicons from '@expo/vector-icons/Ionicons';

export type StackParamList = {
  Home: undefined;
  ImageDetails: { imageUrl: string };
  ImageModal: { imageUrl: string};
};

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = createStackNavigator<StackParamList>();
const DetailsStack = createStackNavigator<StackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={PhotoGalleryApp} />
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
        <Drawer.Screen name="Week2-PhotoGallery" component={PhotoGallery} />
        <Drawer.Screen name="Week3-PhotoGalleryWithNav" component={HW3PhotoGalleryNav} />

        {/* Next Weeks Assignment */}
        <Drawer.Screen name="Week4-WeatherApp" component={PhotoGallery} />
      </Drawer.Navigator>


      {/*<Drawer.Navigator
        screenOptions={{
          drawerPosition: 'left',
          drawerType: 'front',
        }}
      >
        <Drawer.Screen name="Home" component={PhotoGallery} />
        <Drawer.Screen name="ImageDetails" component={ImageDetails} />
      </Drawer.Navigator>*/}

      {/*<Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'ImageDetails') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={PhotoGallery} />
        <Tab.Screen name="ImageDetails" component={ImageDetails} />
      </Tab.Navigator>*/}

      {/*<Stack.Navigator>
        <Stack.Screen name="Home" component={PhotoGallery} options={{headerShown: false}}/>
        <Stack.Screen name="ImageDetails" component={ImageDetails} options={{headerStyle: {backgroundColor: 'lightgray'}}}/>
        <Stack.Screen name="ImageModal" component={ImageModal} options={{presentation:'modal', title: '', headerTintColor: 'white', headerStyle: {backgroundColor: 'black', borderBottomWidth: 0}}}/>
      </Stack.Navigator>*/}
    </NavigationContainer>
  );
}
