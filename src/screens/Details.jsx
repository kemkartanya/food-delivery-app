import {Button, Image, StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({route}) => {
  const {item} = route.params;
  const ingredients = Array.from({length: 20}, (_, index) => {
    const ingredientKey = `strIngredient${index + 1}`;
    return item[ingredientKey];
  }).filter(
    ingredient =>
      // Filter out null, undefined, empty strings and whitespace-only strings
      ingredient &&
      ingredient.trim() !== '' &&
      ingredient.toLowerCase() !== 'null',
  );

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getAllKeys();
      return storedCart ? storedCart : [];
    } catch (e) {}
  };

  const addToCart = async item => {
    try {
      let fetchedCart = await loadCart(); // Load the existing cart

      const existing = fetchedCart.find(id => id === item.idMeal);
      if (existing) {
        const itemString = await AsyncStorage.getItem(id);
        const existingItem = JSON.parse(itemString); // Assuming item is stored as JSON

        const cartItem = {
          id: item.idMeal,
          price: parseInt(item.idMeal),
          qty: existingItem.qty + 1,
          name: item.strMeal,
          img: item.strMealThumb,
        };

        await AsyncStorage.setItem(item.idMeal, JSON.stringify(cartItem));
      } else {
        const cartItem = {
          id: item.idMeal,
          price: parseInt(item.idMeal),
          qty: 1,
          name: item.strMeal,
          img: item.strMealThumb,
        };
        await AsyncStorage.setItem(item.idMeal, JSON.stringify(cartItem));
      }

      Alert.alert(
        'Hurray!',
        `${cartItem.name} of price: $${cartItem.price} with quantity: ${cartItem.qty} added`,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    } catch (e) {
      Alert.alert("Couldn't add, try again!!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{uri: item.strMealThumb}} />
        <View style={styles.titleBox}>
          <Text style={styles.title}>{item.strMeal}</Text>
          <Text style={{fontSize: 18, fontWeight: 'semibold'}}>₹176</Text>
        </View>
        <View>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Ingredients</Text>
            <Text style={styles.boxContent}>{ingredients.join(', ')}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Preparation Instructions</Text>
            <Text style={styles.boxContent}>{item.strInstructions}</Text>
          </View>
          <Pressable style={{margin: 10}} onPress={() => addToCart(item)}>
            <Button color={'red'} title="Add +"></Button>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  image: {
    width: '100%',
    height: '200',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  box: {
    margin: 5,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    fontStyle: 'italic',
  },
  boxContent: {
    padding: 2,
  },
  titleBox: {
    width: '400',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 3,
  },
});
