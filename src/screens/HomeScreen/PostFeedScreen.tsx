import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { ScreensParamList } from 'types/types';
import { post } from 'utils/request';
import UploadButton from 'components/UploadButton';
import ZoomImage from 'components/ZoomImage';
import { showLoadingModal, closeLoadingModal } from 'components/Dialog';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type WebScreenNavigationProp = StackNavigationProp<
  ScreensParamList,
  'PostFeedScreen'
>;
type WebScreenRouteProp = RouteProp<ScreensParamList, 'PostFeedScreen'>;

export interface Props {
  navigation: WebScreenNavigationProp;
  route: WebScreenRouteProp;
}
function PostFeedScreen({ navigation }: Props) {
  const [localUris, setLocalUris] = useState<string[]>([]);
  const [desc, setDesc] = useState('');
  const descRef = React.useRef('');
  const isUploading = React.useRef(false);
  const fileIds = React.useRef<number[]>([]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={styles.submit}
          onPress={async () => {
            const images = fileIds.current;
            if (isUploading.current) {
              return Alert.alert('有图片正在上传，请等待完成后再提交');
            }
            if (!images.length) {
              return Alert.alert('请上传至少一张图片');
            }
            showLoadingModal();
            const { ok } = await post('/feed', {
              desc: descRef.current,
              images,
            });
            closeLoadingModal();
            if (ok) {
              navigation.goBack();
            } else {
              Alert.alert('提交失败');
            }
          }}
        >
          提交
        </Text>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="请输入描述..."
        value={desc}
        onChangeText={text => {
          descRef.current = text;
          setDesc(text);
        }}
        multiline={true}
        style={styles.textInput}
      />
      <View style={styles.imagesContainer}>
        {localUris.map((imageUri, i) => (
          <ZoomImage key={i} source={{ uri: imageUri }} style={styles.image} />
        ))}
        {localUris.length < 9 && (
          <UploadButton
            tag="feed"
            onUpload={() => (isUploading.current = true)}
            onUploadFinished={({ fileId, localUri }) => {
              isUploading.current = false;
              if (fileId) {
                fileIds.current.push(fileId);
                setLocalUris(localUris.concat(localUri));
              }
            }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    padding: 0,
    fontSize: 18,
    marginBottom: 10,
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
  submit: {
    fontSize: 20,
    marginRight: 22,
  },
});
export default PostFeedScreen;
