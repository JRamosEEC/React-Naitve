import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer, useNavigation, useRoute, RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from './App';
import { useFetch } from './Functions/useFetch';

type ScannerNavigationProp = StackNavigationProp<ScannerStackParamList, 'BarcodeScanner'>;

export const BarcodeScanner = () => {
  const navigation = useNavigation<ScannerNavigationProp>();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const defaultURL = {data: "https://rn-products-1d8a6-default-rtdb.firebaseio.com/products/1.json"};
  const [productURL, setProductURL] = useState("");
  const {data, loading, error} = useFetch(productURL);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    if (data != null)
      navigation.navigate('ProductDetail', {
        data: data,
    });
  }, [data]);

  const handleBarCodeScanned = (qrData) => {
    setScanned(true);

    setProductURL(qrData.data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        barCodeTypes={BarCodeScanner.Constants.BarCodeType.qr}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => {setScanned(false); setProductURL("")}} />}

      <Button title={'force load'} onPress={() => handleBarCodeScanned(defaultURL)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
