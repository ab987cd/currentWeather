import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {LOCATION_CACHE_TIME, LOCATION_REQUEST_TIMEOUT} from '../../Constants';

export const hasLocationPermission = async () => {
  //this function automatically ask location permission, if not granted
  if (
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
  ) {
    const status = await Geolocation.requestAuthorization('always');
    return status;
  }
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (hasPermission) {
    return true;
  }
  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  }
  return false;
};

export const getPosition = () =>
  new Promise((resolve, reject) => {
    const locationDataSet = {};
    Geolocation.getCurrentPosition(
      position => {
        locationDataSet.isLocationAvailable = true;
        locationDataSet.userCoordinates = position.coords;
        locationDataSet.timestamp = position.timestamp;
        locationDataSet.mocked = position.mocked;
        resolve(locationDataSet);
      },
      error => {
        locationDataSet.isLocationAvailable = false;
        locationDataSet.locationError = error;
        locationDataSet.userCoordinates = {};
        resolve(locationDataSet);
      },
      {
        timeout: LOCATION_REQUEST_TIMEOUT,
        maximumAge: LOCATION_CACHE_TIME,
      },
    );
  });

export const convertToCalsius = kelvin => {
  const calsius = kelvin - 273
  return calsius.toFixed(2);
};
