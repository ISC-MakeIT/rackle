import * as React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Elevator} from '../components/elevatorComponent/Elevator';
import {Tab} from '../components/elevatorComponent/Tab';
import { ElevatorMarker, ElevatorCapacity } from 'src/domains/map';
import { MapData} from '../dummydata/mapData';
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
    if (MapData.elevatorMarkers == undefined) return null;

    const capacities = this.sizeClipping() || [];
    const currentElevatorMarkers = this.currentElevatorMarkers(MapData.elevatorMarkers);
    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.containerView}>
            <FlatList
              data={capacities}
              contentContainerStyle={{ flexDirection: 'row'}}
              renderItem={size => {
                return (
                  <Tab
                    size={size.item}
                    changeCapacity={this.changeCapacity}
                    key={`tab_${size.index}`}
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
                  size={elevatorMarker.item.size}
                  initializedLocation={MapData.initializedLocation!}
                  elevatorMarkers={MapData.elevatorMarkers!}
                  key={`elevatorMarker_${elevatorMarker.index}`}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }

  private changeCapacity = (size: ElevatorCapacity) => {
    this.setState({ currentCapacity: size });
  }

  private sizeClipping = () => {
    if (MapData.elevatorMarkers == undefined) return;

    const size = _.flatMap(MapData.elevatorMarkers, (e => e.size));
    return _.uniq(size);
  }

  private currentElevatorMarkers(elevatorMarkers: ElevatorMarker[]) {
    return _.filter(elevatorMarkers, e => this.state.currentCapacity === e.size);
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
