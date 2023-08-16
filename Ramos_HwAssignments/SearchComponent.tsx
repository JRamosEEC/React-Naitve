import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';

interface ImageData {
  id: number;
  url: string;
}

interface Props {
  imageData: ImageData[];
  updateList: any;
}

export const SearchComponent = ({imageData, updateList}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const search = (query: string) => {
    const filteredImages = imageData.filter((image) => {
      return image.url.toLowerCase().includes(query.toLowerCase())
    });

    setSearchQuery(query);
    updateList(filteredImages);
  }

  return (
      <>
        <TextInput
          value={searchQuery}
          onChangeText={(text) => { search(text); }}
          placeholder="Search Here"
          style={styles.textInput}
        />
      </>
    );
};

const styles = StyleSheet.create({
  textInput: {
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 100,
  },
});
