import * as React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../../constants/Colors';

interface Props {
  capacity: string;
  changeTabCapacity: (capacity: string) => void;
  currentCapacity: string;
}

export const Tab: React.FC<Props> = props => {

  const changeTabCapacity = () => {
    props.changeTabCapacity(props.capacity);
  };

  const tabStyle = props.currentCapacity === props.capacity ? styles.currentTargetTab : styles.container;
  const textStyle = props.currentCapacity === props.capacity ? styles.currentTargetTabText : styles.containerText;

  return (
    <TouchableOpacity
      style={tabStyle}
      onPress={changeTabCapacity}
    >
      <Text style={textStyle}>{props.capacity}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginBottom: height * 0.03,
  },
  containerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: Color.mainColor,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  currentTargetTab: {
    width: `${width} * 0.30`,
    height: `${height} * 0.04`,
    borderColor: Color.mainColor,
    borderWidth: 1,
    backgroundColor: Color.mainColor,
    marginBottom: height * 0.03,
  },
  currentTargetTabText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: Color.white,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});
