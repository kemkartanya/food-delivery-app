import {Button, Image, StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({navigation, route}) => {
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
    const storedCart = await AsyncStorage.getItem('cart');
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    return parsedCart;
  };

  const addToCart = async item => {
    let fetchedCart = await loadCart(); // Load the existing cart

    // Check if item already exists in the cart
    const existingItem = fetchedCart.find(
      cartItem => cartItem.id === item.idMeal,
    );

    const cartItem = {
      id: item.idMeal,
      price: parseInt(item.idMeal),
      qty: existingItem ? existingItem.qty + 1 : 1,
      name: item.strMeal,
    };

    // Update cart by replacing existing item or adding new one
    fetchedCart = fetchedCart.filter(cartItem => cartItem.id !== item.idMeal);
    const updatedCart = [...fetchedCart, cartItem];

    // Save the updated cart
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));

    Alert.alert(
      'Item added to Cart',
      `${cartItem.name} price: $${cartItem.price} quantity: ${cartItem.qty}`,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{uri: item.strMealThumb}} />
        <Text style={styles.title}>{item.strMeal}</Text>
        <View>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Ingredients</Text>
            <Text style={styles.boxContent}>{ingredients.join(', ')}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Preparation Instructions</Text>
            <Text style={styles.boxContent}>{item.strInstructions}</Text>
          </View>
          <Pressable onPress={() => addToCart(item)}>
            <Button title="add to cart"></Button>
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
    padding: 10,
  },
  image: {
    width: '100%',
    height: '200',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  box: {
    marginVertical: 3,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    fontStyle: 'italic',
  },
  boxContent: {
    padding: 2,
  },
});
