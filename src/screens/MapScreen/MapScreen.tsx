import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MapLocation, Report } from 'types/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { get } from 'utils/request';
import { MapView } from 'react-native-amap3d';
import actions from 'reduxState/actions';
import qs from 'qs';
import ReportMarker from './ReportMarker';
import { screenWidth } from 'utils/constants';
import { selectLocation } from 'reduxState/selectors';

interface ReportsMap {
  [id: string]: Report;
}

interface Props {}
export default function MapScreen({}: Props) {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        // showsCompass={false}
        center={location && { latitude: location.lat, longitude: location.lon }}
        showsLocationButton
        locationEnabled
        locationInterval={5000}
        onLocation={(e) => {
          dispatch(actions.setLocation({ lat: e.latitude, lon: e.longitude }));
        }}
        onStatusChangeComplete={({ region }) => {
          checkReportsByLocation({
            lon: region.longitude,
            lat: region.latitude,
            lonDelta: region.longitudeDelta,
            latDelta: region.latitudeDelta,
          });
        }}
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
