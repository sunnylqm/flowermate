import actions from '@/reduxState/actions';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@/utils/navigationService';
import { Avatar, Icon, ListItem } from 'react-native-elements';
import { getUserAvatar } from '@/utils/constants';
import ActionSheet from 'react-native-action-sheet';
import pickImage from '@/utils/pickImage';
import { showLoadingModal, closeLoadingModal } from '@/components/Dialog';
import { post, put } from '@/utils/request';
import { selectUser } from '@/reduxState/selectors';
import { User } from '@/types/types';
import { SafeAreaView } from 'react-native-safe-area-context';

function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)!;
  const setUser = React.useCallback(
    (user: User) => dispatch(actions.setUser(user)),
    [dispatch],
  );
  const logout = React.useCallback(
    () => dispatch(actions.logout()),
    [dispatch],
  );
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
        <ListItem onPress={changeProfile}>
          <Avatar
            source={getUserAvatar(user)}
            containerStyle={styles.profileAvatar}
          />
          <ListItem.Content>
            <ListItem.Title>{user.username}</ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>

      <View style={styles.listGroup}>
        <ListItem
          bottomDivider
          onPress={() =>
            navigate('FeedListScreen', { title: '我的动态', showMyself: true })
          }
        >
          <Icon name="collections" />
          <ListItem.Content>
            <ListItem.Title>我的动态</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider onPress={() => navigate('ReportListScreen')}>
          <Icon name="collections" />
          <ListItem.Content>
            <ListItem.Title>我的鉴定</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
      <View style={styles.listGroup}>
        <ListItem bottomDivider onPress={logout}>
          <Icon name="power-settings-new" />
          <ListItem.Content>
            <ListItem.Title>退出登录</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
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
    marginBottom: 30,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
});
export default ProfileScreen;
