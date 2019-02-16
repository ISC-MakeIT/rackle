import * as React from 'react';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo';

interface Props { modalView: boolean; }

export const Modal: React.FC<Props> = props => {
    const modalStyle = props.modalView ? styles.appear : styles.hidden;
    return (
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.7)',  'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={modalStyle}
      >
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
    height: height * 0.5,
    position: 'absolute',
    paddingBottom: '0.5rem',
    bottom: 0,
    justifyContent: 'center',
    zIndex: 0,
  },
  hidden: {
    display: 'none',
  },
});
