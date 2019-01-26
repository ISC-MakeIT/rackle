import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import EStyleSheet, { clearCache } from 'react-native-extended-stylesheet';

interface Props {
  elevatorMarkers?: ElevatorMarker[];
}

type ElevatorCapacity = 6 | 12;
export interface ElevatorMarker {
  floor: string;
  capacity: ElevatorCapacity;
  latitude: number;
  longitude: number;
}

export const Elevator: React.SFC<Props> = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftContainer}></View>
      <View style={styles.centerContainer}>
        <Text></Text>
        <Text>収容人数：　</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text></Text>
        <Text></Text>
      </View>
    </TouchableOpacity>
  );
};

EStyleSheet.build({});
const {width, height} = Dimensions.get('screen');

const styles = EStyleSheet.create({
  container: {
    width: `${width} * 0.89`,
    height: `${height} * 0.11`,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'space-around',
  },
  leftContainer: {
    width: `${width} * 0.14`,
    height: `${height} * 0.08`,
    backgroundColor: '#00ff00',
  },
  centerContainer: {
    width: `${width} * 0.46`,
    height: `${height} * 0.05`,
    backgroundColor: '#0000FF',
  },
  rightContainer: {
    width: `${width} * 0.11`,
    height: `${height} * 0.06`,
    backgroundColor: '#000000',
  },
});
