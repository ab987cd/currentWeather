import React, {Component} from 'react';
import {Image, View, Modal, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

import {scale} from '../Styles/scale';
import Color from '../Styles/color';
import Images from '../Assets';

const {width, height} = Dimensions.get('window');

class Loader extends Component {
  returnModal = () => {
    const {loader} = this.props;
    return (
      <Modal
        animationType="none"
        transparent
        visible={loader}
        onRequestClose={() => {}}>
        <View style={styles.loaderContainer}>
          <View
            style={[
              styles.loaderContainer,
              {
                opacity: 0.6,
                backgroundColor: Color.white,
              },
            ]}
          />
          <Image
            source={Images.loader}
            style={styles.loader}
            resizeMode="contain"
          />
        </View>
      </Modal>
    );
  };
  render() {
    const {loader} = this.props;
    if (loader) {
      return this.returnModal();
    }
    return <View />;
  }
}
export default Loader;

Loader.propTypes = {
  loader: PropTypes.bool,
};
Loader.defaultProps = {
  loader: false,
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    opacity: 1,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width,
    height,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 1001,
    height: scale(100),
    width: scale(100),
  },
});
