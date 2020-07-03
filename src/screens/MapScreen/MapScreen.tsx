import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { MapLocation, Report } from 'types/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { get } from 'utils/request';
// @ts-ignore
import { MapView } from 'react-native-amap3d';
import actions from 'reduxState/actions';
import qs from 'qs';
import ReportMarker from './ReportMarker';
import { screenWidth } from 'utils/constants';

interface ReportsMap {
  [id: string]: Report;
}

interface Props {}

export default function MapScreen({}: Props) {
  const dispatch = useDispatch();
  const [reportsMap, setReportsMap] = useState<ReportsMap>({});
  async function checkReportsByLocation(mapLocation: MapLocation) {
    const { data: reports } = await get(
      `/location/?${qs.stringify({ ...mapLocation, type: 'reports' })}`,
    );

    if (reports && reports.length) {
      const newReportsMap = { ...reportsMap };
      for (const report of reports) {
        newReportsMap[report.id] = report;
      }
      setReportsMap(newReportsMap);
    }
  }

  // @ts-ignore
  function onLocation({ nativeEvent: { latitude: lat, longitude: lon } }) {
    // updateLocation({ lat, lon });
    dispatch(actions.setLocation({ lat, lon }));
  }

  function onStatusChangeComplete({
    nativeEvent: {
      latitude: lat,
      longitude: lon,
      latitudeDelta: latDelta,
      longitudeDelta: lonDelta,
    },
  }: {
    nativeEvent: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
  }) {
    checkReportsByLocation({ lon, lat, lonDelta, latDelta });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        mapType="satellite"
        // showsCompass={false}
        showsLocationButton
        locationEnabled
        locationInterval={5000}
        onLocation={onLocation}
        onStatusChangeComplete={onStatusChangeComplete}
      >
        {Object.keys(reportsMap).map((reportId) => (
          <ReportMarker key={reportId} report={reportsMap[reportId]} />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => dispatch(actions.showCameraOptions())}
      >
        <Icon name="camera" size={24} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postButton: {
    position: 'absolute',
    left: screenWidth / 2 - 30,
    bottom: '5%',
    zIndex: 10,
    backgroundColor: '#fffa',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
