import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Item {
  name: string;
  cover: ImageSourcePropType;
  price: number;
}
const data: Item[] = [
  { name: 'Brass Planter', cover: require('assets/plants/1.jpg'), price: 198 },
  { name: 'Fox Planter', cover: require('assets/plants/2.jpg'), price: 34 },
];
function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon style={styles.headerLeft} name="bars" size={24} />
        <Text style={styles.headerTitle}>商城</Text>
        <Icon style={styles.headerRight} name="shopping-bag" size={24} />
      </View>
      <FlatList<Item>
        style={styles.list}
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Card item={item} />}
      />
    </SafeAreaView>
  );
}
function Card({ item }: { item: Item }) {
  return (
    <View style={styles.card}>
      <Image style={styles.cover} source={item.cover} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>￥{item.price.toFixed(2)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  header: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerLeft: {
    padding: 10,
    position: 'absolute',
    left: '6%',
  },
  headerRight: {
    padding: 10,
    position: 'absolute',
    right: '6%',
  },
  card: {
    flex: 1,
    padding: 10,
  },
  cover: {
    width: '100%',
    resizeMode: 'cover',
    height: 220,
    borderRadius: 6,
  },
  title: {
    paddingTop: 12,
    paddingBottom: 5,
    paddingLeft: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {},
  list: {
    margin: 15,
  },
});
export default DiscoverScreen;
