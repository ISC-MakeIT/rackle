import * as React from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo';

interface Props { modalView: boolean; changeTopModal: () => void; }

export const Modal: React.FC<Props> = props => {
    const modalStyle = props.modalView ? styles.appear : styles.hidden;
    const topModalStyle = props.modalView ? styles.topModal : styles.hidden;
    return (
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0.5 }}
        style={modalStyle}
      >
        <TouchableOpacity
          style={topModalStyle}
          onPress={props.changeTopModal}
        >
        </TouchableOpacity>
        {props.children}
      </LinearGradient>
    );
  };

EStyleSheet.build();
const {width, height} = Dimensions.get('screen');

const styles = EStyleSheet.create({
  appear: {
    flex: 1,
    width: width,
    height: height,
    position: 'absolute',
    paddingBottom: '0.5rem',
    bottom: 0,
    justifyContent: 'center',
    zIndex: 0,
  },
  topModal: {
    width: width,
    height: height * 0.5,
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  hidden: {
    display: 'none',
  },
});
