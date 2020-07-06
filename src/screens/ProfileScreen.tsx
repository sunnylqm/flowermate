import actions from 'reduxState/actions';
import React, { useState } from 'react';
import { Alert, StyleSheet, View, SafeAreaView, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'utils/navigationService';
import { ListItem } from 'react-native-elements';
import { getUserAvatar } from 'utils/constants';
import ActionSheet from 'react-native-action-sheet';
import pickImage from 'utils/pickImage';
import { showLoadingModal, closeLoadingModal } from 'components/Dialog';
import { post, put } from 'utils/request';
import { selectUser } from 'reduxState/selectors';
import { User } from 'types/types';

interface Props {}

function ProfileScreen({}: Props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)!;
  const setUser = React.useCallback(
    (user: User) => dispatch(actions.setUser(user)),
    [dispatch],
  );
  const logout = React.useCallback(() => dispatch(actions.logout()), [
    dispatch,
  ]);
  function changeProfile() {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['更换头像', '取消'],
        cancelButtonIndex: 1,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          const pic = await pickImage();
          if (!pic) {
            return;
          }
          const formData = new FormData();
          formData.append('file', {
            uri: pic.path,
            type: pic.mime,
            name: 'file.jpg',
          });
          showLoadingModal('正在上传...');
          const { data: fileId } = await post('/file', formData);
          if (fileId) {
            const { ok } = await put(`/user/${user.id}`, {
              avatar: fileId,
            });
            if (ok) {
              setUser({ ...user, avatar: fileId });
            }
          }
          closeLoadingModal();
        }
      },
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarItem}>
        <ListItem
          leftAvatar={{
            // title: user.username,
            source: getUserAvatar(user),
            containerStyle: {
              width: 64,
              height: 64,
              borderRadius: 32,
              overflow: 'hidden',
            },
          }}
          title={user.username}
          subtitle={user.email}
          onPress={changeProfile}
          chevron
        />
      </View>

      <View style={styles.listGroup}>
        <ListItem
          chevron
          bottomDivider
          title="我的动态"
          leftIcon={{ name: 'collections' }}
          onPress={() =>
            navigate('FeedListScreen', { title: '我的动态', showMyself: true })
          }
        />
        <ListItem
          chevron
          bottomDivider
          title="我的鉴定"
          leftIcon={{ name: 'collections' }}
          onPress={() => navigate('ReportListScreen')}
        />
      </View>
      <View style={styles.listGroup}>
        {/* <ListItem
          title="启动开课吧"
          leftAvatar={{
            source: require('assets/kaikeba.png'),
            containerStyle: {
              width: 24,
              height: 24,
              borderRadius: 12,
              overflow: 'hidden',
            },
          }}
          chevron
          onPress={async () => {
            const url = 'kaikeba://';
            if (await Linking.canOpenURL(url)) {
              Linking.openURL(url);
            } else {
              Alert.alert('你似乎还没有安装开课吧');
            }
          }}
        /> */}
        <ListItem
          title="退出登录"
          leftIcon={{ name: 'power-settings-new' }}
          chevron
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  listGroup: {
    marginVertical: 6,
  },
  avatarItem: {
    marginTop: 40,
    marginBottom: 30,
  },
});
export default ProfileScreen;
