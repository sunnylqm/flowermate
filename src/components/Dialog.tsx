import React, { ReactElement } from 'react';
import RootSiblings from 'react-native-root-siblings';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import { navigate } from 'utils/navigationService';
import { Card, Button } from 'react-native-elements';
// @ts-ignore
import GallerySwiper from 'react-native-gallery-swiper';

interface DialogProps {
  onClose: () => void;
}
export function showDialogFactory<P>(
  Dialog: React.ComponentType<P & DialogProps>,
) {
  let modal: RootSiblings | null;
  return (props: P) => {
    if (modal) {
      return;
    }
    return new Promise(resolve => {
      const element = (
        <Dialog
          {...props}
          onClose={() => {
            if (modal) {
              modal.destroy();
              modal = null;
            }
            resolve();
          }}
        />
      );
      modal = new RootSiblings(element);
    });
  };
}

export const showImageResultDialog = showDialogFactory<ImageResultDialogProps>(
  ImageResultDialog,
);
interface ImageResultDialogProps {
  name: string;
  imageUri: ImageSourcePropType;
  webUri?: string;
  content: ReactElement;
}
function ImageResultDialog({
  name,
  imageUri,
  webUri,
  content,
  onClose,
}: ImageResultDialogProps & DialogProps) {
  return (
    <View style={styles.fullScreenModal}>
      <Card title={name} image={imageUri} containerStyle={{ width: '80%' }}>
        {webUri ? (
          <>
            {content}
            <Button
              onPress={() => {
                onClose();
                return navigate('WebScreen', { uri: webUri });
              }}
              title="查看网页百科"
              containerStyle={{ marginBottom: 10 }}
            />
          </>
        ) : (
          <Text style={{ marginBottom: 10 }}>抱歉，暂时无法识别</Text>
        )}
        <Button onPress={onClose} title="关闭" />
      </Card>
    </View>
  );
}

let loadingModal: RootSiblings | null;
export function showLoadingModal(message?: string) {
  if (loadingModal) {
    return;
  }
  const element = <LoadingModal message={message} />;
  loadingModal = new RootSiblings(element);
}
export function closeLoadingModal() {
  if (loadingModal) {
    loadingModal.destroy();
    loadingModal = null;
  }
}

function LoadingModal({ message }: { message?: string }) {
  return (
    <View style={styles.fullScreenModal}>
      <ActivityIndicator />
      <Text>{message}</Text>
    </View>
  );
}

interface ImageViewerProps {
  imageUrls: ImageSourcePropType[];
}

function ImageViewer({ imageUrls, onClose }: ImageViewerProps & DialogProps) {
  return (
    <View style={styles.fullScreenModal}>
      <GallerySwiper
        images={imageUrls}
        onSingleTapConfirmed={onClose}
        sensitiveScroll={false}
      />
    </View>
  );
}
export const showImageViewer = showDialogFactory<ImageViewerProps>(ImageViewer);

const styles = StyleSheet.create({
  fullScreenModal: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200,200,200,.5)',
    zIndex: 20,
  },
});
