import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import {useState, useEffect} from 'react';

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
        renderItem={({item}) => (
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

            <Text>{item.strMeal}</Text>
          </View>
        )}
        keyExtractor={item => item.idMeal}
        ItemSeparatorComponent={<View style={{height: 10}} />}
        numColumns={3}
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
  image: {
    width: 80,
    height: 65,
    borderRadius: 20,
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
  card: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 100,
    height: 100,
    alignItems: 'center',
    gap: 5,
  },
});
