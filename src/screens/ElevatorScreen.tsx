import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Elevator} from '../components/elevatorComponent/Elevator';
import {Tab} from '../components/elevatorComponent/Tab';
import { Region, MovieMarker, ToiletMarker, ElevatorMarker, GuideLine } from 'src/domains/map';
import { DummyData } from '../components/mapComponents/DummyData';


interface Props {
  navigation: any;
}

interface State {
  currentCapacity: number;
}

export default class MapViewComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentCapacity: this.sizeClipping()[0],
    };
  }

  render() {
    const capacities = this.sizeClipping();
    const currentElevatorMarkers = this.currentElevatorMarkers();
    if (DummyData.elevatorMarkers == undefined) return null;
    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.containerView}>
            <FlatList
              data={capacities}
              contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap'}}
              renderItem={capacity => {
                return (
                  <Tab
                    capacity={capacity.item}
                    changeIndoorLevel={() => this.changeIndoorLevel}
                    key={`tab${capacity.index}`}
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
                  navigate={this.props.navigation.navigate}
                  capacity={elevatorMarker.item.capacity}
                  key={elevatorMarker.item.latitude}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }

  private changeIndoorLevel(capacity: number) {
    this.setState({
      currentCapacity: capacity,
    });
  }

  private sizeClipping() {
    if (DummyData.elevatorMarkers == undefined) return null;
    const capacity = DummyData.elevatorMarkers.map(elevatorMarker => elevatorMarker.capacity);
    return capacity.filter((item, index, self) => self.indexOf(item) === index);
  }

  private currentElevatorMarkers() {
    if (DummyData.elevatorMarkers == undefined) return null;
    return DummyData.elevatorMarkers.map(elevatorMarker => this.state.currentCapacity === elevatorMarker.capacity);
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
