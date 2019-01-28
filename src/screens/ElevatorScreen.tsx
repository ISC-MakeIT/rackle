import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Elevator} from '../components/elevatorComponent/Elevator';
import {Tab} from '../components/elevatorComponent/Tab';
import { ElevatorMarker, ElevatorCapacity } from 'src/domains/map';
import { DummyData } from '../components/mapComponents/DummyData';
import Color from '../constants/Colors';


interface Props {
  navigation: any;
}

interface State {
  currentCapacity: number;
}

export default class ElevatorScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentCapacity: this.sizeClipping()[0],
    };
  }

  render() {
    if (DummyData.elevatorMarkers == undefined) return null;

    const capacities = this.sizeClipping();
    const currentElevatorMarkers = this.currentElevatorMarkers(DummyData.elevatorMarkers);
    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.containerView}>
            <FlatList
              data={capacities}
              contentContainerStyle={{ flexDirection: 'row'}}
              renderItem={capacity => {
                return (
                  <Tab
                    capacity={capacity.item}
                    changeCapacity={this.changeCapacity.bind(this)}
                    keyExtractor={`tab_${capacity.index}`}
                  />
                );
              }}
            />
          </View>
          <FlatList
            data={currentElevatorMarkers}
            renderItem={elevatorMarker => {
              return (
                <Elevator
                  navigation={this.props.navigation}
                  capacity={elevatorMarker.item.capacity}
                  initializedLocation={DummyData.initializedLocation}
                  elevatorMarkers={DummyData.elevatorMarkers}
                  keyExtractor={`elevatorMarker_${elevatorMarker.index}`}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }

  private changeCapacity(capacity: ElevatorCapacity) {
    this.setState({
      currentCapacity: capacity,
    });
  }

  private sizeClipping() {
    if (DummyData.elevatorMarkers == undefined) return null;

    const capacity = DummyData.elevatorMarkers.map(elevatorMarker => elevatorMarker.capacity);
    return capacity.filter((item, index, self) => self.indexOf(item) === index);
  }

  private currentElevatorMarkers(elevatorMarkers: ElevatorMarker[]) {
    return elevatorMarkers.filter(elevatorMarker => this.state.currentCapacity === elevatorMarker.capacity);
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
    backgroundColor: Color.subColorIvory,
    height: height,
  },
  containerView: {
    marginTop: 30,
    flexDirection: 'row',
  },
});
