import { ScreensParamList } from '@/types/types';
import { goBack } from '@/utils/navigationService';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ItemDetailScreen() {
  const route = useRoute<RouteProp<ScreensParamList, 'ItemDetailScreen'>>();
  const item = route.params.item;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Image style={styles.cover} source={item.cover} />
        <View style={styles.title}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>￥{item.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.desc}>
          Major Node.js versions enter Current release status for six months,
          which gives library authors time to add support for them. After six
          months, odd-numbered releases (9, 11, etc.) become unsupported, and
          even-numbered releases (10, 12, etc.) move to Active LTS status and
          are ready for general use. LTS release status is "long-term support",
          which typically guarantees that critical bugs will be fixed for a
          total of 30 months. Production applications should only use Active LTS
          or Maintenance LTS releases.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.closeButton} onPress={goBack}>
        <Icon style={styles.closeIcon} name="close" />
      </TouchableOpacity>
      <View style={styles.footer}>
        <View style={styles.iconWrapper}>
          <Icon style={styles.heart} name="heart-o" />
        </View>
        <TouchableOpacity style={styles.addToCart}>
          <Text style={styles.buttonText}>添加到购物车</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  inner: {
    paddingHorizontal: '6%',
    paddingTop: 20,
    paddingBottom: 80,
  },
  cover: {
    height: 450,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  title: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 30,
    color: '#222',
  },
  desc: {
    lineHeight: 24,
    color: 'grey',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    backgroundColor: 'white',
    paddingTop: 22,
    paddingBottom: 30,
    paddingHorizontal: '6%',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    backgroundColor: '#eee',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    fontSize: 20,
  },
  addToCart: {
    flex: 1,
    height: 40,
    backgroundColor: 'green',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderColor: '#bbb',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  closeIcon: {
    fontSize: 20,
    color: '#222',
  },
});
export default ItemDetailScreen;
