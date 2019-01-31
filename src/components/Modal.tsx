import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Props { modalView: boolean; }

export const Modal: React.FC<Props> = props => {
    const style = props.modalView ? styles.appear : styles.hidden;
    return (
      <View style={style}>
        {props.children}
      </View>
    );
  };

EStyleSheet.build();
const {width, height} = Dimensions.get('screen');

const styles = EStyleSheet.create({
  appear: {
    backgroundColor: '#fff',
    flex: 1,
    width: width,
    height: height * 0.48,
    position: 'absolute',
    bottom: 0,
    marginBottom: height * 0.1,
    justifyContent: 'center',
  },
  hidden: {
    display: 'none',
  },
});
