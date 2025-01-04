import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      setCart(parsedCart);
      setTotal(
        parsedCart.reduce(
          (sum, item) => sum + (item.price || 0) * (item.qty || 1),
          0,
        ),
      );
    };
    loadCart();
  }, []);

  const removeFromCart = async item => {
    const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
    setCart(updatedCart);
    setTotal(
      updatedCart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.qty || 1),
        0,
      ),
    );
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.cartItem}>
            <Text>{item.name}</Text>
            <Text>${parseInt(item.price).toFixed(2)}</Text>
            <Text>{item.qty}</Text>
            <Pressable onPress={() => removeFromCart(item)}>
              <Icon name="minuscircleo" size={20} color={'red'} />
            </Pressable>
          </View>
        )}
      />
      <Text style={{fontSize: 16}}>Total: ${total.toFixed(2)}</Text>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {padding: 10, alignContent: 'center', gap: 3},
  title: {fontSize: 20, fontWeight: 'bold'},
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
