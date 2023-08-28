import { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, SafeAreaView, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { StackParamList } from './App';
import { useFetch } from './Functions/useFetch';
import { PhotoItem } from './PhotoItem';

type WeatherNavigationProp = StackNavigationProp<StackParamList, 'Weather'>;

export const Weather = () => {
  const navigation = useNavigation<WeatherNavigationProp>();

  const {data, loading, error} = useFetch('http://api.weatherapi.com/v1/current.json?q=02893&key=2c1c6cbbec964d26907230624231608');

  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] =  useState('');

  useEffect(() => {
    setLocation(data?.location);
    setCurrentWeather(data?.current);
  }, [data?.location, data?.current]);

  return (
    <SafeAreaView style={styles.viewContainer}>
      <Text style={styles.headerText}>{location?.name}, {location?.region}</Text>
      <PhotoItem id={ 1 } imageUrl={ 'https:' + currentWeather?.condition?.icon } height={250} width={250} />
      <Text style={styles.tempText}>{currentWeather?.condition?.text}</Text>
      <Text style={styles.tempText}>{currentWeather?.temp_f}°</Text>
      <Text style={{fontWeight: 'bold'}}>Feels like: {currentWeather?.feelslike_f}°</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  headerText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  tempText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
