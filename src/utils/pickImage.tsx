import ActionSheet from 'react-native-action-sheet';
import ImagePicker, { Image as ImageFile } from 'react-native-image-crop-picker';

export function openPicker() {
  return ImagePicker.openPicker({
    // compressImageMaxWidth: 1200,
    // compressImageMaxHeight: 1200,
    compressImageMaxWidth: 600,
    compressImageMaxHeight: 600,
    forceJpg: true,
  }).catch(e => {});
}

export function openCamera() {
  return ImagePicker.openCamera({
    // width: 900,
    // height: 1200,
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
        options: ['拍摄', '从相册选择'],
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
