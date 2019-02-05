import * as React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../../constants/Colors';
import { ElevatorCapacity } from 'src/domains/map';

interface Props {
  size: ElevatorCapacity;
  changeCapacity: (e: ElevatorCapacity) => void;
}

export const Tab: React.FC<Props> = props => {

  const changeCapacity = () => {
    props.changeCapacity(props.size);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={changeCapacity}
    >
      <Text style={styles.containerText}>{props.size}人乗り</Text>
    </TouchableOpacity>
  );
};

EStyleSheet.build({});
const {width, height} = Dimensions.get('screen');

const styles = EStyleSheet.create({
  container: {
    width: `${width} * 0.30`,
    height: `${height} * 0.04`,
    borderColor: Color.mainColor,
    borderWidth: 1,
    backgroundColor: Color.white,
  },
  containerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: Color.mainColor,
  },
});
