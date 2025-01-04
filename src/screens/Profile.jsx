import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{width: 100, height: 100, borderRadius: 50}}
        source={{
          uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
        }}
      />
      <Text style={styles.title}>Tanya Kemkar</Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit
        voluptatibus consectetur eveniet cupiditate! Sint delectus provident
        unde rem a commodi itaque ipsum, voluptas animi eveniet quos quasi
        exercitationem eos! Delectus.
      </Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit
        voluptatibus consectetur eveniet cupiditate! Sint delectus provident
        unde rem a commodi itaque ipsum, voluptas animi eveniet quos quasi
        exercitationem eos! Delectus.
      </Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit
        voluptatibus consectetur eveniet cupiditate! Sint delectus provident
        unde rem a commodi itaque ipsum, voluptas animi eveniet quos quasi
        exercitationem eos! Delectus.
      </Text>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
});
