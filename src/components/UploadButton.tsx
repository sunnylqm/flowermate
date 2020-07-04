import React from 'react';
import { post } from 'utils/request';
import pickImage from 'utils/pickImage';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewProps,
  StyleProp,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface UploadButtonProps {
  tag: string;
  style?: StyleProp<ViewProps>;
  onUpload(): void;
  onUploadFinished({
    fileId,
    localUri,
  }: {
    fileId: number;
    localUri: string;
  }): void;
}
export default function UploadButton({
  style,
  onUpload,
  onUploadFinished,
}: UploadButtonProps) {
  const [uploading, setUploading] = React.useState(false);
  async function uploadImage() {
    if (uploading) {
      return;
    }
    const image = await pickImage();
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append('file', {
      uri: image.path,
      type: image.mime,
      name: 'file.jpg',
    });
    setUploading(true);
    onUpload();
    const { data: fileId } = await post('/file', formData);
    setUploading(false);
    onUploadFinished({
      fileId,
      localUri: image.path,
    });
  }
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={uploadImage}>
      {uploading ? (
        <ActivityIndicator />
      ) : (
        <Icon style={styles.icon} name="plus" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2b2b2b',
  },
  icon: {
    fontSize: 30,
  },
});
