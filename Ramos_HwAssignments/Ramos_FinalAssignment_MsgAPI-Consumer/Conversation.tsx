import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from './App';
import SocketIOClient from '.socket.io-client';
import { PhotoItem } from './Components/PhotoItem';

import { connectMessageSocket } from './Functions/messagingSocket.ts';
import { getChatMessagesSocket } from './Functions/messagingSocket.ts';
import { getChatMessagesBatchSocket } from './Functions/messagingSocket.ts';
import { sendMessageSocket } from './Functions/messagingSocket.ts';
import { listenForMessage } from './Functions/messagingSocket.ts';

// Home component!
type ProfilePageNavigationProp = NativeStackNavigationProp<TabParamList, 'Profile'>;
export const Conversation = ({ navigation, route }: ProfilePageNavigationProp) => {
  const params = route.params;
  const friendName = params?.friendName;
  const userId = params?.userId;
  const username = params?.username;
  const profile_image = params?.profile_image;

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  type msgData = {
    pairId: string,
    sender: string,
    receiver: string,
    message: string,
    isRead: number,
  }

  const updateChat = (msgData: msgData) => {
    let tempChat = chatMessages;

    let newChat = {
      sender: msgData.sender,
      message: msgData.message,
    };
    tempChat.push(newChat);
    setChatMessages(tempChat);
  };

  const batchUpdate = (msgData: msgData[]) => {
    console.log(msgData);
    setChatMessages(msgData);
  };

  const ToInbox = async () => {
    const conversationData = {
      userId: userId,
      username: username,
      profile_image: profile_image,
    };
    navigation.navigate('MessageStack', conversationData);
  };

  const SendMsg = async () => {
    const conversationData = {
      sender: username,
      message: message,
    };
    await updateChat(conversationData);
    sendMessageSocket(username, message);
  };

  useEffect(() => {
    connectMessageSocket(userId);
    getChatMessagesBatchSocket(friendName, batchUpdate);
  }, []);

  useEffect(() => {
    //This was working at first, but for some reason it stopped when I started loading inbox
    listenForMessage(chatMessages, updateChat);
  }, [chatMessages]);

  return (
    <View style={styles.page}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={ToInbox}>
          <Text style={styles.titleText}>Back to Inbox</Text>
        </TouchableOpacity>

        <PhotoItem id={ 1 } imageUrl={ profile_image.length > 1 ? profile_image : "https://pbs.twimg.com/profile_images/1040024706890383361/FflvWQ3S_400x400.jpg"} width={200} height={200}/>

        <View style={styles.rowContainer}>
          <TextInput style={{backgroundColor:'gray', width: '75%'}} onChangeText={setMessage} value={message}></TextInput>
          <TouchableOpacity style={styles.backBtn} onPress={SendMsg}>
            <Text style={styles.titleText}>Send</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {Object.keys(chatMessages).map((key) => {
            return (
              <View key={key} style={ chatMessages[key].sender == username ? styles.rowContainerRight : styles.rowContainerLeft}>
                  <View style={{flex: 1}}>
                    <Text style={styles.username}>{chatMessages[key].sender}</Text>
                    <Text style={styles.text}>{chatMessages[key].message}</Text>
                  </View>
              </View>
            );
          })}
        </ScrollView>
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
  scrollView: {
    width: '90%',
  },
  backBtn: {
    backgroundColor: 'gray',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingBottom: 10,
  },
  rowContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 10,
  },
  rowContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingLeft: '50%',
    paddingBottom: 10,
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
  username: {
    color: "#f1f1f1",
    fontSize: 18,
  },
  text: {
    color: "#f1f1f1",
    fontSize: 16,
  },
  textBox: {
    backgroundColor: '#d3d3d3',
    width: '50%',
    height: 30,
    fontSize: 15,
    marginBottom: 15,
  },
});
