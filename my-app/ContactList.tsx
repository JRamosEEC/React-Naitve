import { useState } from 'react';
import { Text, View, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { ContactCard } from './ContactCard.tsx'
import { StyleSheet } from 'react-native';

const CONTACTS = [
  {
    id: '1',
    name: 'Dennis',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '2',
    name: 'Sweet Dee',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '3',
    name: 'Frank',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '4',
    name: 'Mac',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
];

export const ContactList = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [activeContacts, setActiveContacts] = useState(CONTACTS);

  const handleOnPress = (name: string) => {
    Alert.alert(`You pressed the ${name} row`)
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={() => handleOnPress(item.name)}>
        <ContactCard name={ item.name } image={ item.image } />
      </TouchableOpacity>
    );
  }

  const search = (query: string) => {
    const filteredContacts = CONTACTS.filter((contact) => {
      return contact.name.toLowerCase().includes(query.toLowerCase())
    });

    setActiveContacts(filteredContacts);
    setSearchQuery(query);
  }

  return (
    <View style={styles.viewContainer}>
      <TextInput
        value={searchQuery}
        onChangeText={(text) => { search(text); }}
        placeholder="Search Here"
        style={styles.textInput}
      />

      <FlatList
        data={activeContacts}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderItem(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  textInput: {
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 100,
  },
});
