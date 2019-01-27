import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Region, MovieMarker, ToiletMarker, ElevatorMarker, GuideLine } from 'src/domains/map';
import MapView from '../components/mapComponents/MapViewComponent';

interface Props {
  navigation: any;
}

interface State {
  indoorLevel: string;
}

export default class MapScreen extends React.Component<Props, State> {
  public static navigationOptions = {
    headerStyle: { display: 'none' },
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      indoorLevel: this.props.navigation.state.params.indoorLevel,
    };
  }

  public render() {
    //console.log(this.props.navigation.state.params.elevatorMarkers);
    return (
      <View style={styles.map}>
        <MapView
          indoorLevel={this.state.indoorLevel}
          initializedLocation={this.props.navigation.state.params.initializedLocation}
          elevatorMarkers={this.props.navigation.state.params.elevatorMarkers}
          changeIndoorLevel={this.changeIndoorLevel.bind(this)}
        />
      </View>
    );
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
    width: 100,
    height: 100,
  },
});
