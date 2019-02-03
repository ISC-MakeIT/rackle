import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo';
import Color from '../constants/Colors';

interface Props { modalView: boolean; }

export const Modal: React.FC<Props> = props => {
    const style = props.modalView ? styles.appear : styles.hidden;
    return (
      <LinearGradient
        colors={[Color.black, 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={style}
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
    height: height * 0.48,
    position: 'absolute',
    bottom: 0,
    //marginBottom: height * 0.1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  hidden: {
    display: 'none',
  },
});
