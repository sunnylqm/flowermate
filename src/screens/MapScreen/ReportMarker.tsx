import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore
import { Marker } from 'react-native-amap3d';
import { getImageUrl } from 'utils/constants';
import { Report } from 'types/types';
import { showImageResultDialog } from 'components/Dialog';
import dayjs from 'dayjs';

export default function ReportMarker({ report }: { report: Report }) {
  const markerRef = React.useRef<Marker>();
  const imageUri = { uri: getImageUrl(report.images[0]) };
  function showReportDetail() {
    const { name, baike_info } = report.extra!;

    showImageResultDialog({
      name,
      imageUri,
      webUri: baike_info.baike_url,
      content: (
        <Text style={{ marginBottom: 10 }}>
          {report.user!.username} 拍摄于 {dayjs(report.createdAt).format('YYYY-MM-DD hh:mm')}
        </Text>
      ),
    });
  }
  return (
    <Marker
      ref={markerRef}
      coordinate={{
        latitude: report.lat,
        longitude: report.lon,
      }}
      infoWindowDisabled={true}
      onPress={showReportDetail}
      icon={() => (
        <TouchableOpacity style={styles.markerWrapper} onPress={showReportDetail}>
          <Image
            onLoad={() => {
              setTimeout(() => markerRef.current.sendCommand('update'), 100);
            }}
            source={imageUri}
            style={styles.markerImage}
          />
        </TouchableOpacity>
      )}
    ></Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    resizeMode: 'cover',
  },
});
