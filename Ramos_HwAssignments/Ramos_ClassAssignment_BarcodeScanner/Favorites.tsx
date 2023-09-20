import React, { useState, useEffect } from 'react';
import { Text, ScrollView, FlatList, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from './App';
import { PhotoItem } from './PhotoItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFetch } from './Functions/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'

export const Favorites = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused()

  const [items, setItems] = useState({});

  const favoriteItems = async () => {
    try {
      let currentFavorites = await AsyncStorage.getItem('favorites');
      currentFavorites = currentFavorites != null ? JSON.parse(currentFavorites) : [];
      setItems(!currentFavorites ? {} : currentFavorites);
    } catch (e) {
      setItems({});
    }
  }

  useEffect(() => {
      if(isFocused){
        favoriteItems();
      }
  }, [isFocused]);

  const goToDetail = (data: any) => {
    if (data != null)
      navigation.navigate('ProductDetail', {
        data: data,
    });
  };

  const renderItem = ({item}: any) => {
    const url = items[item].image;
    const title = items[item].title;
    return (
      <TouchableOpacity style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'lightblue',
      }}

      onPress={() => {goToDetail(items[item])}}
      >
          <PhotoItem id={item} imageUrl={url} width={75} height={75}/>
          <Text style={{fontWeight:'bold', maxWidth: '70%'}}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <FlatList
          data={Object.keys(items)}
          numColumns={1}
          keyExtractor={(item) => item}
          renderItem={(item) => renderItem(item)}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: 'white',
    gap:15
  },
});
