import { View, Image, Text, StyleSheet } from 'react-native';

interface Props {
  id: number;
  imageUrl: string;
  focussed: boolean;
}

export const PhotoItem = ({ id, imageUrl, focussed }: Props) => {
  return (
    <View
      style={styles.viewContainer}
    >
      <Image
        source={{ uri: imageUrl }}
        style={[focussed ? styles.largeImage : styles.image]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageCard: {
    marginLeft: 10,
    fontSize: 18,
  },
  image: {
    width: 75,
    height: 75,
  },
  largeImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  viewContainer: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    borderColor: 'black',
  }
});
