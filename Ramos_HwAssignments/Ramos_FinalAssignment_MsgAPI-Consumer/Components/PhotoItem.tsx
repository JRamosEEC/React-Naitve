import { View, Image, Text, StyleSheet } from 'react-native';

interface Props {
  id: number;
  imageUrl: string;
  width: number;
  height: number;
}

export const PhotoItem = ({ id, imageUrl, width, height }: Props) => {
  return (
    <View
      style={styles.viewContainer}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: width,
          height: height,
          borderWidth: 3,
          borderColor: 'lightgray',
          borderRadius: 100,
          overflow: 'hidden',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    borderColor: 'black',
  }
});
