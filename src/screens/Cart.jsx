import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../components/CartItem';

const Cart = () => {
  const [cart, setCart] = useState([]); // array of keys of cart-items
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getAllKeys();
        setCart(storedCart);
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    };
    loadCart();
  }, []); // Dependency array excludes `cart`

  useEffect(() => {
    if (cart.length > 0) {
      calculateTotal();
    }
  }, [cart]); // Separate effect for recalculating total

  const calculateTotal = async () => {
    try {
      const itemsArray = await AsyncStorage.multiGet(cart);
      const totalCost = itemsArray.reduce((sum, [_, itemString]) => {
        const item = JSON.parse(itemString);
        return sum + (item?.qty || 0) * (item?.price || 0);
      }, 0);

      setTotal(totalCost);
    } catch (e) {
      console.error('Error calculating total:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <Text style={{fontSize: 16, fontWeight: 'semibold'}}>Review items</Text>
      <FlatList
        data={cart}
        keyExtractor={id => id}
        renderItem={({id}) => <CartItem id={id} cart={cart} />}
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
