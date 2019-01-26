import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Elevator} from '../components/elevatorComponent/Elevator';

export default class MapViewComponent extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Elevator />
      </View>
    );
  }
}

EStyleSheet.build({});
const {width, height} = Dimensions.get('screen');

const styles = EStyleSheet.create({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
