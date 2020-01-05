import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { navigate } from 'utils/navigationService';
import { get } from 'utils/request';
import qs from 'qs';
import { Report } from 'types/types';
import dayjs from 'dayjs';
import ZoomImage from 'components/ZoomImage';
import { getImageUrl } from 'utils/constants';

const limit = 10;

interface Props {}

function ReportListScreen({}: Props) {
  const [listData, setListData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState<string | null>(null);
  const isEndReached = React.useRef(false);
  useEffect(() => {
    getListData();
  }, []);
  async function getListData(isRefresh?: boolean) {
    if (loading) {
      return;
    }
    if (!isRefresh && isEndReached.current) {
      return;
    }
    await setLoading(isRefresh ? 'refresh' : 'more');
    const { data } = await get(
      `/report?${qs.stringify({ offset: isRefresh ? 0 : offset, limit })}`,
    );
    setLoading(null);
    if (data && data.count) {
      if (isRefresh) {
        setListData(data.rows);
        setOffset(0);
      } else {
        setListData(listData.concat(data.rows));
        setOffset(offset + data.count);
      }
      if (data.count < limit) {
        isEndReached.current = true;
      } else {
        isEndReached.current = false;
      }
    }
  }
  function renderItem({ item, index }: { item: Report; index: number }) {
    const { images, createdAt, desc, extra } = item;
    return (
      <View style={styles.listRow}>
        <Text style={styles.timestamp}>
          {dayjs(createdAt).format('YYYY/MM/DD\nHH:mm')}
        </Text>
        <View>
          {!!desc && <Text style={styles.desc}>{desc}</Text>}
          <View style={styles.imagesContainer}>
            {images.map((imageUri, i) => (
              <ZoomImage
                key={i}
                source={{ uri: getImageUrl(imageUri) }}
                style={styles.image}
              />
            ))}
          </View>
          <View style={styles.metaTextContainer}>
            <Text
              style={[styles.metaText, styles.link]}
              onPress={() => {
                const uri = extra?.baike_info?.baike_url;
                if (uri) {
                  navigate('WebScreen', { uri });
                }
              }}
            >
              {extra!.name}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList<Report>
        data={listData}
        refreshing={loading === 'refresh'}
        onRefresh={() => getListData(true)}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        onEndReached={() => getListData()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  listRow: {
    overflow: 'hidden',
    margin: 15,
    flexDirection: 'row',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 18,
    marginBottom: 8,
  },
  metaTextContainer: {
    flexDirection: 'row',
  },
  metaText: {
    fontSize: 13,
    color: 'grey',
    marginRight: 10,
  },
  timestamp: {
    fontSize: 15,
    marginRight: 10,
    color: 'grey',
  },
  link: {
    color: '#0645AD',
  },
});
export default ReportListScreen;
