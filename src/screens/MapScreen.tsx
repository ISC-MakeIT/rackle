import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Region, MovieMarker, ToiletMarker, ElevatorMarker, GuideLine } from 'src/domains/map';
import MapView from '../components/mapComponents/MapViewComponent';
import {DummyData} from '../components/mapComponents/DummyData';

interface State {
  indoorLevel: string;
  currentScreen: 'video' | 'map';
  initializedLocation: Region;
  movieMarkers?: MovieMarker[];
  toiletMarkers?: ToiletMarker[];
  elevatorMarkers?: ElevatorMarker[];
  guideLines: GuideLine[];
}

export default class MapScreen extends React.Component<{}, State> {
  public static navigationOptions = {
    headerStyle: { display: 'none' },
  };

  constructor(props: {}) {
    super(props);
    this.state = {
      indoorLevel: DummyData.indoorLevel,
      initializedLocation: DummyData.initializedLocation,
      elevatorMarkers: DummyData.elevatorMarkers,
      changeIndoorLevel: this.changeIndoorLevel,
    };
  }

  public render() {
    return (
      <View>
        <MapView
          indoorLevel={'1'}
          initializedLocation={this.props.initializedLocation}
        />
      </View>
    );
  }

  private screenChange(currentScreen: 'video' | 'map') {
    this.setState({ currentScreen: currentScreen });
  }

  private changeIndoorLevel(indoorLevel: string) {
    const validatedIndoorLevel = indoorLevel.replace(/階/, '');
    const currentFloor = validatedIndoorLevel.substr(-2);
    this.setState({ indoorLevel: currentFloor });
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
  },
  container: {
    marginTop: -44,
  },
});
