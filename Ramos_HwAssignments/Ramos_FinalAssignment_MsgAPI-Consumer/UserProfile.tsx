import { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from './App';
import { PhotoItem } from './Components/PhotoItem';

// Home component!
type ProfilePageNavigationProp = NativeStackNavigationProp<TabParamList, 'Profile'>;
export const UserProfile = ({ navigation, route }: ProfilePageNavigationProp) => {
  const params = route.params;
  const username = params?.username;
  const role = params?.role;
  const birthdate = params?.birthdate;
  const first_name = params?.first_name;
  const last_name = params?.last_name;
  const email = params?.email;
  const profile_image = params?.profile_image;

  return (
    <View style={styles.page}>
      <SafeAreaView style={styles.container}>
        <PhotoItem id={ 1 } imageUrl={ profile_image.length > 1 ? profile_image : "https://pbs.twimg.com/profile_images/1040024706890383361/FflvWQ3S_400x400.jpg"} width={200} height={200}/>
        <Text style={styles.textHeader}>Hello {username}!</Text>

        <Text style={styles.textHeader}>Profile Details</Text>

        <Text style={styles.titleText}>Full Name</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>{first_name}</Text>
          <Text style={styles.text}>{last_name}</Text>
        </View>

        <Text style={styles.titleText}>Birthdate</Text>
        <Text style={styles.text}>{birthdate}</Text>

        <Text style={styles.titleText}>Email</Text>
        <Text style={styles.text}>{email}</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#2c2d40',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 15,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: '#2c2d40',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 25,
  },
  textHeader: {
    color: "#f1f1f1",
    fontSize: 25,
    paddingBottom: 20,
  },
  titleText: {
    color: "#f1f1f1",
    fontSize: 24,
  },
  text: {
    color: "#f1f1f1",
    fontSize: 22,
  },
  textBox: {
    backgroundColor: '#d3d3d3',
    width: '50%',
    height: 30,
    fontSize: 15,
    marginBottom: 15,
  },
});
