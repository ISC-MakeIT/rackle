import * as React from 'react';
import { Dimensions, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Props { elevatorModalView: boolean; }

export const ElevatorModal: React.FC<Props> = props => {
    const modalStyle = props.elevatorModalView ? styles.appear : styles.hidden;
    return (
      <View style={modalStyle}>
        {props.children}
      </View>
    );
  };

EStyleSheet.build();
const {width, height} = Dimensions.get('screen');

const styles = EStyleSheet.create({
  appear: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    position: 'absolute',
  },
  hidden: {
    display: 'none',
    zIndex: 20,
  },
});
