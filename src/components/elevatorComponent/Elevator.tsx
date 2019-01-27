import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import EStyleSheet, { clearCache } from 'react-native-extended-stylesheet';
import { Region, MovieMarker, ToiletMarker, ElevatorMarker, GuideLine } from 'src/domains/map';

interface Props {
  capacity: number;
  navigation: any;
  elevatorMarkers: ElevatorMarker[];
  initializedLocation: Region;
}

export const Elevator: React.SFC<Props> = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate('Map', {elevatorMarkers: props.elevatorMarkers, initializedLocation: props.initializedLocation})}>
        <View style={styles.leftContainer}></View>
        <View style={styles.centerContainer}>
          <Text style={styles.centerContainerTop}>JR横浜駅西口　階段隣</Text>
          <Text>収容人数：{props.capacity}人（450kg）</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightContainerTop}>○</Text>
          <Text style={styles.rightContainerBottom}>使用可能</Text>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  leftContainer: {
    width: `${width} * 0.14`,
    height: `${height} * 0.08`,
    backgroundColor: '#63BF8E',
  },
  centerContainer: {
    marginLeft: 20,
    marginRight: 10,
    width: `${width} * 0.46`,
    height: `${height} * 0.05`,
  },
  centerContainerTop: {
    fontSize: 16,
  },
  rightContainer: {
    width: `${width} * 0.11`,
    height: `${height} * 0.06`,
  },
  rightContainerTop: {
    fontSize: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    color: '#63BF8E',
  },
  rightContainerBottom: {
    fontSize: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#63BF8E',
  },
});
