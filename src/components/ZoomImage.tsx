import React from 'react';
import { Image, TouchableWithoutFeedback, ImageProps } from 'react-native';
import { showImageViewer } from './Dialog';

export default function ZoomImage(props: ImageProps) {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        showImageViewer({
          imageUrls: [props.source],
          // imageUrls: [
          //   {
          //     url: props.source.uri,
          //   },
          // ],
        })
      }
    >
      <Image {...props} />
    </TouchableWithoutFeedback>
  );
}
