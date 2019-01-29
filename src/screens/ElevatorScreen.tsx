import * as React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Elevator} from '../components/elevatorComponent/Elevator';
import {Tab} from '../components/elevatorComponent/Tab';
import { ElevatorMarker, ElevatorCapacity } from 'src/domains/map';
import { DummyData } from '../components/mapComponents/DummyData';
import Color from '../constants/Colors';
import * as _ from 'lodash';

interface Props {
  navigation: any;
}

interface State {
  currentCapacity: ElevatorCapacity;
}

export default class ElevatorScreen extends React.Component<Props, State> {
  readonly state = { currentCapacity: 6 };

  render() {
    if (DummyData.elevatorMarkers == undefined) return null;

    const capacities = this.sizeClipping() || [];
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
                    changeCapacity={this.changeCapacity}
                    key={`tab_${capacity.index}`}
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
                  initializedLocation={DummyData.initializedLocation!}
                  elevatorMarkers={DummyData.elevatorMarkers!}
                  key={`elevatorMarker_${elevatorMarker.index}`}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }

  private changeCapacity = (capacity: ElevatorCapacity) => {
    this.setState({ currentCapacity: capacity });
  }

  private sizeClipping = () => {
    if (DummyData.elevatorMarkers == undefined) return;

    const capacity = _.flatMap(DummyData.elevatorMarkers, (e => e.capacity));
    return _.uniq(capacity);
  }

  private currentElevatorMarkers(elevatorMarkers: ElevatorMarker[]) {
    return _.filter(elevatorMarkers, e => this.state.currentCapacity === e.capacity);
  }
}

EStyleSheet.build({});
const {height} = Dimensions.get('screen');

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
