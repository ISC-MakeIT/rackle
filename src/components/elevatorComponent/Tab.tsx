import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import EStyleSheet, { clearCache } from 'react-native-extended-stylesheet';

interface Props {
  capacity: number;
  changeIndoorLevel: any;
}

export const Tab: React.SFC<Props> = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.changeIndoorLevel(props.capacity)}>
      <Text style={styles.containerText}>{props.capacity}人乗り</Text>
    </TouchableOpacity>
  );
};

EStyleSheet.build({});
const {width, height} = Dimensions.get('screen');

const styles = EStyleSheet.create({
  container: {
    width: `${width} * 0.30`,
    height: `${height} * 0.04`,
    borderColor: '#63BF8E',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  containerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#63BF8E',
  },
});
