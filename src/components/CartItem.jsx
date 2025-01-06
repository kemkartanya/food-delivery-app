import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventRegister} from 'react-native-event-listeners';

const CartItem = ({item}) => {
  const removeFromCart = async () => {
    try {
      const existing = await AsyncStorage.getItem(item.id);

      if (existing) {
        if (item.qty === 1) {
          await AsyncStorage.removeItem(item.id);
        } else {
          item.qty -= 1;
          await AsyncStorage.setItem(item.id, JSON.stringify(item));
        }

        // Trigger cart update event
        EventRegister.emit('updateCart');
      }
    } catch (e) {}
  };

  const addToCart = async () => {
    try {
      const existing = await AsyncStorage.getItem(item.id);

      if (existing) {
        item.qty += 1;
        await AsyncStorage.setItem(item.id, JSON.stringify(item));

        // Trigger cart update event
        EventRegister.emit('updateCart');
      }
    } catch (e) {}
  };

  return (
    <View style={styles.cartItem}>
      <Image
        style={styles.image}
        source={{
          uri: item.img
            ? item.img
            : 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D',
        }}
      />
      <View style={styles.desc}>
        <View style={styles.lineItem}>
          <Text style={styles.itemName}>{item?.name}</Text>
          <Text style={styles.itemPrice}>₹{item?.price}</Text>
        </View>
        <View style={styles.lineItem}>
          <Text>4</Text>
          <View style={styles.qItem}>
            <Pressable style={{padding: 3}} onPress={() => removeFromCart()}>
              <Icon name="minus" size={20} color={'red'} />
            </Pressable>
            <Text style={styles.qty}>{item?.qty}</Text>
            <Pressable style={{padding: 3}} onPress={() => addToCart()}>
              <Icon name="plus" size={20} color={'red'} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    gap: 10,
  },
  lineItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qItem: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#dadada',
    borderRadius: 8,
    borderWidth: 1,
    shadowOffset: 1,
    justifyContent: 'flex-end',
  },
  image: {width: 70, height: 70, borderRadius: 10},
  desc: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
  qty: {
    backgroundColor: '#dadada',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {fontWeight: 'bold', fontSize: 16},
  itemName: {fontWeight: 'bold'},
});
