import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../components/CartItem';
import {EventRegister} from 'react-native-event-listeners';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCartAndCalculateTotal = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (!keys || keys.length === 0) {
        setCart([]);
        setTotal(0);
        return;
      }

      const values = await AsyncStorage.multiGet(keys);

      const parsedCart = values
        .map(([key, value]) => {
          try {
            return JSON.parse(value);
          } catch (e) {
            console.error(`Error parsing item with key ${key}:`, e);
            return null; // Skip invalid entries
          }
        })
        .filter(item => item); // Filter out null/invalid items

      setCart(parsedCart);

      const totalCost = parsedCart.reduce((sum, item) => {
        return sum + item.qty * item.price;
      }, 0);

      setTotal(totalCost);
    } catch (error) {
      console.error('Error loading cart or calculating total:', error);
    }
  };

  useEffect(() => {
    loadCartAndCalculateTotal();

    // Add event listener to refresh the cart when triggered
    const cartListener = EventRegister.addEventListener('updateCart', () => {
      loadCartAndCalculateTotal(); // Reload cart when an update is triggered
    });

    // Cleanup listener on component unmount
    return () => {
      EventRegister.removeEventListener(cartListener);
    };
  }, []); // Only runs once on component mount

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <Text style={{fontSize: 16, fontWeight: 'semibold'}}>Review items</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CartItem item={item} />}
      />
      <View style={{display: 'flex'}}>
        <Text style={styles.totalText}>Amount to be paid</Text>
        <Text style={styles.totalText}>₹{total}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {padding: 10, alignContent: 'center', gap: 5},
  title: {fontSize: 20, fontWeight: 'bold'},
  totalText: {fontSize: 16, fontWeight: 'bold'},
});
