import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableOpacity, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from './App';
import { PhotoItem } from './PhotoItem';
import { BubbleComponent } from './BubbleComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'

const RatingStar = (rating) => {
  const maxStars = 5;

  const stars = Array.from({ length: maxStars }, (_, index) => (
    <Icon
      key={index}
      name={index+1 < rating ? 'star' : 'star-o'}
      size={20}
      color="gold"
    />
  ));

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars}
    </View>
  );
};

const storeFavorite = async ({key, value}) => {
  try {
      //alert(JSON.stringify(value));
    let currentFavorites = await AsyncStorage.getItem(key);
    currentFavorites = currentFavorites != null ? JSON.parse(currentFavorites) : [];

    const passedKey = Object.keys(value);
    const favoritesIndex = Object.keys(currentFavorites).indexOf(passedKey[0]);
    if (!currentFavorites || !favoritesIndex > -1) {
      const updatedFavorites = {...(currentFavorites ?? []), ...value};
      await AsyncStorage.setItem(key, JSON.stringify(updatedFavorites));
      return true;
    }
    return true;
  } catch (e) {
    return false;
  }
};

const removeFavorite = async ({key, value}) => {
  try {
    let currentFavorites = await AsyncStorage.getItem(key);
    currentFavorites = currentFavorites != null ? JSON.parse(currentFavorites) : [];

    const passedKey = Object.keys(value);
    const favoritesIndex = Object.keys(currentFavorites).indexOf(passedKey[0]);
    if (favoritesIndex > -1) {
      delete currentFavorites[passedKey];
      const jsonFavorites = JSON.stringify(currentFavorites);
      await AsyncStorage.setItem(key, jsonFavorites);
      return true;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export default RatingStar;
export const ProductDetail = (data: any) => {
  const productData = data?.route?.params?.data;
  const isFocused = useIsFocused()

  const [isFavorite, setIsFavorite] = useState(false);

  const changeFavorite = async (item: any) => {
    let res = false;
    if(!isFavorite) {
      res = await storeFavorite({key: 'favorites', value: item});
    } else {
      res = await removeFavorite({key: 'favorites', value: item});
    }

    if(res) {
      setIsFavorite(!isFavorite);
    }
  }

  const inFavorites = async (key: any) => {
    try {
      let currentFavorites = await AsyncStorage.getItem('favorites');
      currentFavorites = currentFavorites != null ? JSON.parse(currentFavorites) : [];

      const favoritesIndex = Object.keys(currentFavorites).indexOf(key);
      if (favoritesIndex > -1) {
        setIsFavorite(true);
        return;
      }
      setIsFavorite(false);
    } catch (e) {
      setIsFavorite(false);
    }
  }

  useEffect(() => {
      if(isFocused){
        inFavorites(productData?.title);
      }
  }, [isFocused])

  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <PhotoItem id={ 1 } imageUrl={ productData?.image } width={200} height={200}/>
          </View>

          <Text style={styles.productTitle}>{productData?.title}</Text>
          <BubbleComponent color={'lime'} text={ productData?.category } />

          <View style={styles.horizontalRule} />

          <View style={styles.rating}>
            {RatingStar(productData?.rating?.rate)}
            <Text style={{fontWeight:'bold'}}>Total Reviews: {productData?.rating?.count}</Text>

            <View style={styles.favoriteBtnContainer}>
              <TouchableOpacity onPress={() => {
                const passedItem = {};
                const key = productData?.title;
                passedItem[key] = productData;
                changeFavorite(passedItem)}
              }>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-o'} // Use 'heart' for filled heart, 'heart-o' for empty heart
                  size={24}
                  color={isFavorite ? 'red' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.priceText}>${productData?.price}</Text>
        </View>
        <View style={styles.cartBtnsContainer}>
            <View style={styles.cartBtn}><Button title={'Add To Cart'} /></View>
            <View style={styles.cartBtn}><Button title={'Buy Now'} /></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    gap:25
  },
  horizontalRule: {
    alignSelf:'center',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width:'90%'
  },
  productTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection:'row',
    flexWrap:'wrap',
    paddingTop:10,
    paddingLeft: 2,
    gap:10,
    alignItems:'center',
  },
  priceText: {
    paddingLeft: 2,
    fontSize: 25,
    fontWeight: 'bold',
  },
  cartBtnsContainer: {
    flex:1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    gap:10
  },
  cartBtn: {
    width: '90%',
  },
  favoriteBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 5,
  },
});
