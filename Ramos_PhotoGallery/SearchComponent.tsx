import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { ContactCard } from './ContactCard.tsx'

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

export const SearchComponent = ({query}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContacts, setActiveContacts] = useState(CONTACTS);

  const search = (query: string) => {
    const filteredContacts = CONTACTS.filter((contact) => {
      return contact.name.toLowerCase().includes(query.toLowerCase())
    });

    setActiveContacts(filteredContacts);
    setSearchQuery(query);
  };

  return (
      <>
        <TextInput
          value={searchQuery}
          onChangeText={(text) => { search(text); }}
          placeholder="Search Here"
          style={styles.TextInput}
        />
        <FlatList
          data={activeContacts}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderItem(item)}
        />
      </>
    );
};

const styles = StyleSheet.create({
  TextInput: {
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 100,
  },
});
