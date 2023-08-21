import { View, Image, Text, StyleSheet } from 'react-native';

interface Props {
  id: number;
  imageUrl: string;
  height: number;
  width: number;
}

export const PhotoItem = ({ id, imageUrl, height, width }: Props) => {
  return (
    <View
      style={styles.viewContainer}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{height: height, width: width}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    padding: 4,
    alignItems: 'center',
    borderColor: 'black',
  }
});
