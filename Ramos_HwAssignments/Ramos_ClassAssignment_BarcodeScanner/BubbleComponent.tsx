import { View, Image, Text, StyleSheet } from 'react-native';


interface Props {
  text: string;
  color: string;
}

export const BubbleComponent = ({ text, color }: Props) => {
  return (
    <View
      style={{
        backgroundColor: color,
        borderRadius: 25,
        alignSelf: 'flex-start',
        padding: 10,
      }}
    >
      <Text style={{fontWeight:'bold'}}>{text}</Text>
    </View>
  );
};

