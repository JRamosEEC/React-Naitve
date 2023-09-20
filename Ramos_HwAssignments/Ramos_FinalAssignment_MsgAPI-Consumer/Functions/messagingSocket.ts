import { io } from "socket.io-client";

//Initialize socet on the users id stored in cookie
const socket = io.connect('https://www.JRamosPortfolio.com', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
});

let id = "";

//Check if connection has been interuptted and if so it will autmatically try to recconnect
socket.on("disconnect", (reason) => {});

//When socket is disconnected it'll recconnect once it has a sustainable connection with the server, however the server would have disconnected the user from messaging so on recconnect reconnect to messaging if using WebSocket connection
socket.io.on("reconnect", () => {
    if (id.length > 0) {
      if(socketInUse) {
          connectMessageSocket(id);
      }
    }
});

type msgData = {
  pairId: string,
  sender: string,
  receiver: string,
  message: string,
  isRead: number,
}
type setMessagesCallback = (msgData: msgData) => any;
//Message is received through websocket
export const listenForMessage = (messages: string[], setMessages: setMessagesCallback) => {
  socket.on('chat-message', data => {
      let newMsg = {
        pairId: data.pairId,
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        isRead: data.isRead,
      } as msgData;
      setMessages(newMsg);
  });
};

export const listenForBatchMessage = (setMessages: setMessagesCallback) => {
  socket.on('chat-message-batch', data => {
      console.log(setMessages);
      setMessages(data);
  });
};

//Get chats between 2 users response comes through as a chat message responses --
export const getChatMessagesBatchSocket = (targetUsername: string, setMessages: setMessagesCallback) => {
    listenForBatchMessage(setMessages);
    if(socket.active) {
        socket.emit('get-chat-messages-batch', targetUsername)
        readChatMessagesSocket(targetUsername);
    }
};

//Connect user to socket users to begin receiving messages through socket
export const connectMessageSocket = (userId: string) => {
    if(socket.active) {
        socket.emit('new-user', userId);
        socketInUse = true;
    }
};

//Disconnect from socket users to stop receiving messages through socket
export const disconnectMessageSocket = () => {
    if(socket.active) {
        socket.emit('remove-socket-user');
        socketInUse = false;
    }
};

//Send a message to username with message
export const sendMessageSocket = (targetUsername: string, message: string) => {
    if(socket.active) {
        socket.emit('send-chat-message', targetUsername, message);
    }
};

//Get inbox chat and the display message / latest message
export const getInboxMessagesSocket = (targetUsername: string) => {
    if(socket.active) {
        socket.emit('get-display-messages', targetUsername)
    }
};

//Get chats between 2 users response comes through as a chat message responses --
export const getChatMessagesSocket = (targetUsername: string) => {
    if(socket.active) {
        socket.emit('get-chat-messages', targetUsername)
        readChatMessagesSocket(targetUsername);
    }
};

//Mark chats as read from user
export const readChatMessagesSocket = (targetUsername: string) => {
    if(socket.active) {
        socket.emit('read-chat-messages', targetUsername);
    }
};
