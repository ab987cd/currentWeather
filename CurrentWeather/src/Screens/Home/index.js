import React, {useEffect, useCallback, useState} from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {findtemperature} from '../../Redux/Action/userActions';
import {Loader} from '../../Components';

import {
  hasLocationPermission,
  getPosition,
  convertToCalsius,
} from './functions';
import styles from './style';

const Home = () => {
  const [errorFetchLocation ,setError] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(store => store?.userReducer);
  const {data, error, loader} = userData;
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = useCallback(() => {
    hasLocationPermission().then(granted => {
      if (granted) {
        getPosition().then(newLocation => {
          if(newLocation.isLocationAvailable) {
          dispatch(findtemperature(newLocation));
          }else {
            setError(true);
          }
        });
      }
    });
  }, []);

  const dayWiseData = [];
  if (data && data.list && data.list.length) {
    for (let item = 0; item < data.list.length; item = item + 8) {
      dayWiseData.push(data.list[item + 1]);
    }
  }

  const renderErrorView = () => {
    return(
      <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{'Something went wrong'}</Text>
      <TouchableOpacity onPress={getLocation} activeOpacity={0.8} hitSlop={{top:2,left:2,right:2, bottom:2}} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {loader && <Loader loader={true} />}
      {data && data.list && data.list.length ? (
        <>
          <View style={styles.topContainer}>
            <Text style={styles.temperature}>
              {convertToCalsius(data.list[0].main.temp)}
            </Text>
            <Text style={styles.city}>{data.city.name}</Text>
          </View>
          <View style={styles.bottomContainer}>
            {dayWiseData.map((singleDay, index) => (
              <View style={styles.dayWraper} key={singleDay.dt}>
                <Text style={styles.day}>
                  {moment(singleDay.dt_txt).format('dddd')}
                </Text>
                <Text style={styles.dayTemp}>
                  {convertToCalsius(singleDay.main.temp)}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
      {((error && error.hasError) || errorFetchLocation) &&  renderErrorView()}
    </View>
  );
};

export default Home;
