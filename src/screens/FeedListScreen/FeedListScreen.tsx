import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ScreensParamList } from 'types/types';
import { get } from 'utils/request';
import qs from 'qs';
import { Report } from 'types/types';
import FeedItem from './FeedItem';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from 'reduxState/selectors';

const limit = 10;

type FeedListScreenRouteProp = RouteProp<ScreensParamList, 'FeedListScreen'>;
interface Props {}
function FeedListScreen({}: Props) {
  const user = useSelector(selectUser)!;
  const [listData, setListData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState<string | null>(null);
  const isEndReached = React.useRef(false);
  const isFetching = React.useRef(false);
  const isFocused = useIsFocused();
  const route = useRoute<FeedListScreenRouteProp>();
  const showMyself = route.params?.showMyself ?? false;
  useEffect(() => {
    if (isFocused) {
      getListData(true);
    }
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
        offset: isRefresh ? 0 : offset,
        limit,
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
      setOffset(currentCount);
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
      <FlatList<Report>
        data={listData}
        refreshing={loading === 'refresh'}
        onRefresh={() => getListData(true)}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <FeedItem item={item} />}
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
});
export default FeedListScreen;
