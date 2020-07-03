import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import { ScreensParamList, Feed } from 'types/types';
import { get } from 'utils/request';
import qs from 'qs';
import FeedItem from './FeedItem';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from 'reduxState/selectors';

const limit = 5;

type FeedListScreenRouteProp = RouteProp<ScreensParamList, 'FeedListScreen'>;
interface Props {}
function FeedListScreen({}: Props) {
  const user = useSelector(selectUser)!;
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState<'refresh' | 'more' | null>(null);
  const isEndReached = React.useRef(false);
  const isFetching = React.useRef(false);
  const isFocused = useIsFocused();
  const route = useRoute<FeedListScreenRouteProp>();
  const showMyself = route.params?.showMyself ?? false;
  useEffect(() => {
    if (isFocused) {
      getListData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  async function getListData(isRefresh?: boolean) {
    if (isFetching.current) {
      return;
    }
    if (!isRefresh && isEndReached.current) {
      return;
    }
    isFetching.current = true;
    setLoading(isRefresh ? 'refresh' : 'more');
    const { data } = await get(
      `/feed?${qs.stringify({
        offset: isRefresh ? 0 : listData.length, // 起始偏移
        limit, // 跨度值
        userId: showMyself ? user.id : undefined,
      })}`,
    );
    setLoading(null);
    if (data && data.rows) {
      let currentCount;
      if (isRefresh) {
        currentCount = data.rows.length;
        setListData(data.rows);
      } else {
        currentCount = data.rows.length + listData.length;
        setListData(listData.concat(data.rows));
      }
      if (currentCount >= data.count) {
        isEndReached.current = true;
      } else {
        isEndReached.current = false;
      }
    }
    isFetching.current = false;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList<Feed>
        data={listData}
        refreshing={loading === 'refresh'}
        onRefresh={() => getListData(true)}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FeedItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={() => getListData()}
        ListFooterComponent={() =>
          loading === 'more' ? <ActivityIndicator /> : null
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    marginVertical: 4,
    backgroundColor: '#bbb',
  },
});
export default FeedListScreen;
