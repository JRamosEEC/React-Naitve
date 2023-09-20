import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Final Assignment Pages
import { LoginPage } from './LoginPage.tsx';
import { UserProfile } from './UserProfile.tsx';
import { UserMessaging } from './UserMessaging.tsx';
import { Conversation } from './Conversation.tsx';

export type ConversationStackParamList = {
  MessageStack: {
    userId: string,
    username: string,
    profile_image: string,
  };
  UserConversation: {
    friendName: string,
    userId: string,
    username: string,
    profile_image: string,
  };
};
const ConversationStack = createNativeStackNavigator<ConversationStackParamList>();
type ConversationNavProp = NativeStackNavigationProp<ConversationStackParamList, 'Messages'>;
const ConversationComponent = ({ navigation, route }: ConversationNavProp) => {
  const params = route.params;
  const userId = params?.userId;
  const username = params?.username;
  const profile_image = params?.profile_image;

  return (
    <ConversationStack.Navigator screenOptions={{ headerShown: false }}>
      <ConversationStack.Screen name="MessageStack" component={UserMessaging} initialParams={{
        userId: userId,
        username: username,
        profile_image: profile_image,
      }}/>
      <ConversationStack.Screen name="UserConversation" component={Conversation} />
    </ConversationStack.Navigator>
  );
};

export type TabParamList = {
  Profile: {
    username: string,
    role: string,
    birthdate: string,
    first_name: string,
    last_name: string,
    email: string,
    profile_image: string,
  };
  Messages: {
    userId: string,
    username: string,
    profile_image: string,
  };
};

const Tab = createBottomTabNavigator<TabParamList>();
type AppNavigationProp = NativeStackNavigationProp<TabParamList, 'LoggedIn'>;
const AppLoggedIn = ({ navigation, route }: AppNavigationProp) => {
  const params = route.params;
  const userId= params?.userId;
  const username = params?.username;
  const role = params?.role;
  const birthdate = params?.birthdate;
  const first_name = params?.first_name;
  const last_name = params?.last_name;
  const email = params?.email;
  const profile_image = params?.profile_image;

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }: AppNavigationProp) => ({
        tabBarIcon: ({ focused, color, size }: {focused: string, color: string, size: number}) => {
          let iconName: string;

          if (route.name === 'Profile' || route.name === 'Messages') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'RunningOutOfTime') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          // You can return any component that you like here
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Profile" component={UserProfile} initialParams={{
        username: username,
        role: role,
        birthdate: birthdate,
        first_name: first_name,
        last_name: last_name,
        email: email,
        profile_image: profile_image,
      }}/>
      <Tab.Screen name="Messages" component={ConversationComponent} initialParams={{
        userId: userId,
        username: username,
        profile_image: profile_image,
      }}/>
    </Tab.Navigator>
  );
};

export type StackParamList = {
  LoggedIn: {
    userId: string,
    username: string,
    role: string,
    birthdate: string,
    first_name: string,
    last_name: string,
    email: string,
    profile_image: string,
  };
};
const MessagingStack = createNativeStackNavigator<StackParamList>();
export default function MsgApp() {
  return (
    <MessagingStack.Navigator screenOptions={{ headerShown: false }}>
      <MessagingStack.Screen name="MessagingApp" component={LoginPage} />
      <MessagingStack.Screen name="LoggedIn" component={AppLoggedIn} />
    </MessagingStack.Navigator>
  );
};
