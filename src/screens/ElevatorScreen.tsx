import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Elevator} from '../components/elevatorComponent/Elevator';
import {Tab} from '../components/elevatorComponent/Tab';

export default class MapViewComponent extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.containerView}>
            <Tab />
            <Tab />
            <Tab />
          </View>
          <Elevator />
          <Elevator />
        </View>
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: '#F8F7F4',
    height: height,
  },
  containerView: {
    marginTop: 30,
    flexDirection: 'row',
  },
});
