import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {useState, useEffect} from 'react';
import Item from '../components/Item';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const Home = ({navigation}) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setMeals(data.meals))
      .catch(error => console.error(error));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={meals}
        renderItem={({item}) => <Item item={item} navigation={navigation} />}
        keyExtractor={item => item.idMeal}
        ItemSeparatorComponent={<View style={{height: 10}} />}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dadada',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    width: 105,
  },
  btnText: {fontWeight: '400'},
});
