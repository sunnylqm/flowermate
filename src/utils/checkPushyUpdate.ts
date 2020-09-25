import { Platform, Alert, Linking } from 'react-native';

import {
  isFirstTime,
  isRolledBack,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';

import _updateConfig from '../../update.json';
// @ts-ignore
const { appKey } = _updateConfig[Platform.OS];
export default async function checkPushyUpdate() {
  if (isFirstTime) {
    markSuccess();
  } else if (isRolledBack) {
    // Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
  }

  try {
    const info = await checkUpdate(appKey);
    if (info.expired) {
      Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
        {
          text: '确定',
          onPress: () => {
            info.downloadUrl && Linking.openURL(info.downloadUrl);
          },
        },
      ]);
    } else if (info.upToDate) {
      // Alert.alert('提示', '您的应用版本已是最新.');
    } else {
      Alert.alert(
        '提示',
        '检查到新的版本' + info.name + ',是否下载?\n' + info.description,
        [
          {
            text: '是',
            onPress: async () => {
              try {
                const hash = await downloadUpdate(info);
                Alert.alert('提示', '下载完毕,是否重启应用?', [
                  {
                    text: '是',
                    onPress: () => {
                      switchVersion(hash!);
                    },
                  },
                  { text: '否' },
                  {
                    text: '下次启动时',
                    onPress: () => {
                      switchVersionLater(hash!);
                    },
                  },
                ]);
              } catch (err) {
                Alert.alert('提示', '更新失败.' + JSON.stringify(err));
              }
            },
          },
          { text: '否' },
        ],
      );
    }
  } catch (err) {
    console.warn(err);
    return;
  }
}
