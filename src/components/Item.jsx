import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';

const Item = ({navigation, item}) => {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={() =>
          navigation.navigate('Details', {
            item: item,
          })
        }>
        <Image
          style={styles.image}
          source={{
            uri: item.strMealThumb,
          }}
        />
      </Pressable>

      <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.strMeal}</Text>

      <Text>
        Starting at <Text style={{fontWeight: 'bold'}}>₹176</Text>
      </Text>

      <Text style={{fontWeight: 'semibold'}}>⚡ Today in 90 mins</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  card: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 3,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 10,
  },
});
