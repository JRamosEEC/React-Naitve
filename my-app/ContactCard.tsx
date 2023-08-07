import { View, Image, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  image: string;
}

export const ContactCard = ({ name, image }: Props) => {
  return (
    <View
      style={styles.viewContainer}
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      <Text style={styles.contactCard}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contactCard: {
    marginLeft: 10,
    fontSize: 18,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  viewContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  }
});
