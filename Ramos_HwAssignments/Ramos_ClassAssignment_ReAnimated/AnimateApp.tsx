import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AnimationPage } from './AnimationPage.tsx';

export type AnimateStackParamList = {
  AnimationPage: undefined;
};

const Tab = createBottomTabNavigator();
const AnimateStack = createStackNavigator<AnimateStackParamList>();

const AnimateStackNavigator = () => {
  return (
    <AnimateStack.Navigator>
      <AnimateStack.Screen name="Animate" component={AnimationPage} options={{headerShown: false}}/>
    </AnimateStack.Navigator>
  );
};

export default function AnimateApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          return <FontAwesomeIcon icon={ faCircle } size={size} color={color}/>
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="AnimationPage" component={AnimateStackNavigator} options={{title: "Animation Page", headerShown: false}} />
    </Tab.Navigator>

  );
}
