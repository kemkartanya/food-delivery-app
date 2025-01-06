import {Button, Image, StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventRegister} from 'react-native-event-listeners';

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

  const getCartItem = async id => {
    try {
      const itemString = await AsyncStorage.getItem(id);
      return itemString ? JSON.parse(itemString) : null;
    } catch (error) {
      console.error(`Error retrieving item with id ${id}:`, error);
      return null;
    }
  };

  const saveCartItem = async (id, item) => {
    try {
      await AsyncStorage.setItem(id, JSON.stringify(item));
    } catch (error) {
      console.error(`Error saving item with id ${id}:`, error);
      throw error;
    }
  };

  const addToCart = async item => {
    try {
      let cartItem = await getCartItem(item.idMeal);

      if (cartItem) {
        // Update existing item
        cartItem.qty += 1;
      } else {
        // Add new item
        cartItem = {
          id: item.idMeal,
          price: parseInt(item.idMeal, 10), // Ensure proper numeric conversion
          qty: 1,
          name: item.strMeal,
          img: item.strMealThumb,
        };
      }

      await saveCartItem(item.idMeal, cartItem);

      // Trigger cart update event
      EventRegister.emit('updateCart');

      Alert.alert(
        'Hurray!',
        `${cartItem.name} of price: $${cartItem.price} with quantity: ${cartItem.qty} added`,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert("Couldn't add item to cart. Please try again!");
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
