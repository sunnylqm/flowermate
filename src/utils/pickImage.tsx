import ActionSheet from 'react-native-action-sheet';
import ImagePicker, {
  Image as ImageFile,
} from 'react-native-image-crop-picker';

export async function openPicker() {
  return ImagePicker.openPicker({
    compressImageMaxWidth: 600,
    compressImageMaxHeight: 600,
    forceJpg: true,
  }).catch(e => {});
}

export async function openCamera() {
  return ImagePicker.openCamera({
    width: 450,
    height: 600,
    cropping: true,
    forceJpg: true,
  }).catch(e => {});
}

export default function pickImage(): Promise<ImageFile | null> {
  return new Promise(resolve => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['拍摄', '从相册选择', '取消'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // @ts-ignore
          openCamera().then(resolve);
        } else if (buttonIndex === 1) {
          // @ts-ignore
          openPicker().then(resolve);
        }
      },
    );
  });
}
