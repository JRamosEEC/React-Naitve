import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from './App';
import SocketIOClient from '.socket.io-client';
import { PhotoItem } from './Components/PhotoItem';

import { connectMessageSocket } from './Functions/messagingSocket.ts';
import { getInboxMessagesSocket } from './Functions/messagingSocket.ts';
import { listenForMessage } from './Functions/messagingSocket.ts';

// Home component!
type ProfilePageNavigationProp = NativeStackNavigationProp<ConversationStackParamList, 'MessageStack'>;
export const UserMessaging = ({ navigation, route }: ProfilePageNavigationProp) => {
  const params = route.params;
  const userId = params?.userId;
  const username = params?.username;
  const profile_image = params?.profile_image;

  const [inboxMessages, setInboxMessages] = useState({});
  const [message, setMessage] = useState('');

  type msgData = {
    pairId: string,
    sender: string,
    receiver: string,
    message: string,
    isRead: number,
  }

  const updateInbox = (msgData: msgData) => {
    setMessage(msgData);
    let tempInbox = inboxMessages;
    //Compound key
    let friendName = msgData.sender == username ? msgData.receiver : msgData.sender;

    if (msgData.pairId in tempInbox) {
      tempInbox[msgData.pairId]['message'] = msgData.message; 
      tempInbox[msgData.pairId]['isRead'] = msgData.isRead; 
    } else {
      tempInbox[msgData.pairId] = {
        pairId: msgData.pairId,
        friendName: friendName,
        message: msgData.message,
        isRead: msgData.isRead,
      };
    }

    setInboxMessages(tempInbox);
  };

  const ToConversation = async (friendName: string) => {
    const conversationData = {
      friendName: friendName,
      userId: userId,
      username: username,
      profile_image: profile_image,
    };
    navigation.navigate('UserConversation', conversationData);
  };

  useEffect(() => {
    connectMessageSocket(userId);
    getInboxMessagesSocket(username);
  }, []);

  useEffect(() => {
    //This was working at first, but for some reason it stopped when I started loading inbox
    listenForMessage(inboxMessages, updateInbox);
  }, [inboxMessages]);

  return (
    <View style={styles.page}>
      <SafeAreaView style={styles.container}>
        <PhotoItem id={ 1 } imageUrl={ profile_image.length > 1 ? profile_image : "https://pbs.twimg.com/profile_images/1040024706890383361/FflvWQ3S_400x400.jpg"} width={200} height={200}/>

        <ScrollView style={styles.scrollView}>
          {Object.keys(inboxMessages).map((key) => {
            return (
                <TouchableOpacity key={key} onPress={() => ToConversation(inboxMessages[key].friendName)}>
                <View style={styles.rowContainer}>
                    <PhotoItem id={ key } imageUrl="https://pbs.twimg.com/profile_images/1040024706890383361/FflvWQ3S_400x400.jpg" width={50} height={50}/>
                    <View style={{flex: 1}}>
                      <Text style={styles.username}>{inboxMessages[key].friendName}</Text>
                      <Text style={styles.text}>{inboxMessages[key].message}</Text>
                    </View>
                </View>
                </TouchableOpacity>
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
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
