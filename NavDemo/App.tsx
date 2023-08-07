import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export type StackParamList = {
  Home: undefined;
  Details: {itemId: number, otherParam?: string};
  Modal: undefined;
  VeryCoolScreen: {coolnessFactor: number}
};

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: true, headerTitle: 'Home Custom Title', headerTitleStyle: {color:'blue'}, headerStyle: {backgroundColor:'lightgray'}}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{headerBackTitle:'Kill This Stack!'}}/>
        <Stack.Screen name="Modal" component={ModalScreen} options={{presentation:'modal'}}/>
        <Stack.Screen name="VeryCoolScreen" component={VeryCoolScreen} options={{headerTitle:"So cool you can't even see it", presentation:'modal', headerStyle: {backgroundColor:'orange'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;
export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to details" onPress={() => {
        navigation.navigate('Details', {
          itemId: 123,
          otherParam: 'Blah',
        });
      }}/>
      <View style={{width: 20, height: 20}}></View>
      <Button title="Go to the cool screen" onPress={() => {
        navigation.navigate('VeryCoolScreen', {
          coolnessFactor: 9001,
        });
      }}/>
      <View style={{width: 20, height: 20}}></View>
      <Button title="Open Modal"  onPress={() => {
        navigation.navigate('Modal');
      }}/>
    </View>
  );
}

type DetailsScreenNavigationProp = StackNavigationProp<StackParamList, 'Details'>;
type DetailsScreenRouteProp = RouteProp<StackParamList, 'Details'>
export function DetailsScreen() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const {params} = useRoute<DetailsScreenRouteProp>();

  return (
    <View style={styles.container}>
      <Text>{params.itemId}</Text>
      <Text>{params.otherParam}</Text>
      <Button title="Go to home" onPress={() => {
        navigation.navigate('Home', {});
      }}/>
    </View>
  );
}

type VeryCoolScreenScreenNavigationProp = StackNavigationProp<StackParamList, 'VeryCoolScreen'>;
type VeryCoolScreenScreenRouteProp = RouteProp<StackParamList, 'VeryCoolScreen'>
export function VeryCoolScreen() {
  const navigation = useNavigation<VeryCoolScreenScreenNavigationProp>();
  const {params} = useRoute<VeryCoolScreenScreenRouteProp>();

  return (
    <View style={styles.container}>
      <Text>Coolness Factor = {params.coolnessFactor}</Text>
      <Button title="Say bye to the coolness" onPress={() => {
        navigation.navigate('Home', {});
      }}/>
    </View>
  );
}

type ModalScreenNavigationProp = StackNavigationProp<StackParamList, 'Modal'>;
export function ModalScreen() {
  const navigation = useNavigation<ModalScreenNavigationProp>();

  //We're listening for the modal to close
  const closeAndNavigate = () => {
    const unsubscribe = navigation.addListener('transitionEnd', () => {
      navigation.navigate('Details', {itemId: 777})
      unsubscribe();
    });
    navigation.dispatch(StackActions.pop(1));
  };

  return (
    <View style={styles.container}>
      <Text>Modal Screen</Text>
      <Button title="Go to details" onPress={() => {
        closeAndNavigate();
      }}/>
      <Button title="Go to modal AGAIN?" onPress={() => {
        navigation.push('Modal');
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
