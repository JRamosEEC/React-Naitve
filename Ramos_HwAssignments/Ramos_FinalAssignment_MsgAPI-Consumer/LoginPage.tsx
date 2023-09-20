import { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { postData } from './Functions/postData.ts';

type LoginPageNavigationProp = NativeStackNavigationProp;
export const LoginPage = () => {
  const navigation = useNavigation<LoginPageNavigationProp>();

  const loginAPI = 'https://www.jramosportfolio.com/loginAPI';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [resMsg, setResMsg] = useState('');

  const handlePress = async () => {
    const loginData = {
      username: username,
      password: password,
    };

    const validLogin = await postData(loginAPI, loginData);
    setResMsg(validLogin?.message);

    if (validLogin?.message == 'Success' && validLogin?.userData.length > 0) {
      navigation.navigate('LoggedIn', {
        userId: validLogin.userData[0]?.user_id,
        username: validLogin.userData[0]?.username,
        role: validLogin.userData[0]?.role,
        birthdate: validLogin.userData[0]?.birthdate,
        first_name: validLogin.userData[0]?.first_name,
        last_name: validLogin.userData[0]?.last_name,
        email: validLogin.userData[0]?.email,
        profile_image: validLogin.userData[0]?.profile_image,
      });
    }
  };

  return (
    <View style={styles.page}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textHeader}>Login With JJL Account</Text>

        <Text style={styles.text}>Username:</Text>
        <TextInput style={styles.textBox} onChangeText={setUsername}/>
        <Text style={styles.text}>Password:</Text>
        <TextInput style={styles.textBox} onChangeText={setPassword}/>
        <Button title="Login" onPress={handlePress} />
        <Text style={{fontSize: 8, color: 'white'}}>{resMsg.length > 0 ? resMsg : "Something went wrong!"}</Text>
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
    justifyContent: 'center',
    backgroundColor: '#2c2d40',
  },
  textHeader: {
    color: "#f1f1f1",
    fontSize: 25,
    paddingBottom: 20,
  },
  text: {
    color: "#f1f1f1",
    fontSize: 18,
  },
  textBox: {
    backgroundColor: '#d3d3d3',
    width: '50%',
    height: 30,
    fontSize: 15,
    marginBottom: 15,
  },
});
