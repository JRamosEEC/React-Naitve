import { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, SafeAreaView, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { StackParamList } from './App';
import { useFetch } from './Functions/useFetch';
import { PhotoItem } from './PhotoItem';

type WeatherNavigationProp = StackNavigationProp<StackParamList, 'Weather'>;

export const Forecast = () => {
  const navigation = useNavigation<WeatherNavigationProp>();

  const route = useRoute();
  const { timeSpan } = route.params;

  const {data, loading, error} = useFetch(`http://api.weatherapi.com/v1/forecast.json?q=02893&days=${timeSpan}&key=2c1c6cbbec964d26907230624231608`);

  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] =  useState('');

  const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    setLocation(data?.location);
    setCurrentWeather(data?.forecast?.forecastday);
  }, [data?.location, data?.current]);

  return (
    <SafeAreaView style={styles.viewContainer}>
      <Text style={styles.headerText}>Forecast For</Text>
      <Text style={styles.headerText}>{location?.name}, {location?.region}</Text>
      { currentWeather ? currentWeather.map(data => {
          return (
            <View key={data.date} style={styles.inlineContainer}>
              <Text style={{fontWeight: 'bold'}}>{dayOfWeek[new Date(data.date_epoch * 1000).getDay()]} </Text>

              <Text style={{fontWeight: 'bold'}}>{data.day.maxtemp_f}°F | </Text>
              <Text style={{fontWeight: 'bold'}}>{data.day.mintemp_f}°F </Text>

              <Text style={{fontWeight: 'bold'}}>{data.day.condition.text} </Text>
              <PhotoItem id={ 1 } imageUrl={ 'https:' + data.day.condition.icon } height={50} width={50} />
            </View>
          );
        }) : <Text style={{fontWeight: 'bold'}}>An Error Occurred</Text> 
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  inlineContainer: {
    flexDirection: 'row',
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
