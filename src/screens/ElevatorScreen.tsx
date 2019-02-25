import * as React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Elevator} from '../components/elevatorComponent/Elevator';
import {Tab} from '../components/elevatorComponent/Tab';
import { ElevatorMarker, ElevatorCapacity } from 'src/domains/map';
//import { MapData} from '../dummydata/mapData';
import Color from '../constants/Colors';
import { getGuidelines } from '../services/guidelines';
import * as _ from 'lodash';

interface Props {
  navigation: any;
}

interface State {
  currentCapacity: ElevatorCapacity;
  elevator: any;
  indoorLevel: any;
  initializedLocation: any;
  objectPoints: any;
}

export default class ElevatorScreen extends React.Component<Props, State> {
  public static navigationOptions = {
    headerStyle: {
      backgroundColor: Color.mainColor,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: Color.white,
    },
    headerTitle: 'エレベーター情報',
  };

  readonly state = {
    currentCapacity: 6,
    elevator: undefined,
  };

  async componentDidMount () {
    const mapData = await getGuidelines(6, 11);
    const objectPoints = this.indoorChanges(mapData.object_points);
    const initialSelectedCarousel = objectPoints[0];

    this.setState({
      indoorLevel: '1',
      initializedLocation: {
        latitude: 35.46588771428577,
        longitude: 139.62227088041905,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      elevator: this.currentElevator(objectPoints),
      objectPoints,
    });
  }

  render() {
    if (this.state.elevator == undefined) return null;

    const capacities = this.sizeClipping() || [];
    const currentElevatorMarkers = this.state.elevator;
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
                  size={elevatorMarker.item.caption}
                  initializedLocation={this.state.initializedLocation!}
                  elevatorMarkers={elevatorMarker.item}
                  key={`elevatorMarker_${elevatorMarker.item.id}`}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }

  private currentElevator = (items: any) => {
    return items.filter((item: any) => item.type === 'elevator');
  }

  private indoorChanges = (items: any) => {
    if (items == undefined) return;

    return items.map((item: any) => {
      const floor = String(item.floor).replace('-', 'B');
      item.floor = floor;
      return item;
    });
  }

  private changeCapacity = (size: ElevatorCapacity) => {
    this.setState({ currentCapacity: size });
  }

  private sizeClipping = () => {
    if (this.state.elevator == undefined) return;

    const size = _.flatMap(this.state.elevator, ((e: any) => e.caption));
    return _.uniq(size);
  }

  private currentElevatorMarkers(elevatorMarkers: ElevatorMarker[]) {
    return _.filter(elevatorMarkers, e => this.state.currentCapacity === e.caption);
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
