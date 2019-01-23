import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapViewComponent from './mapComponents/MapViewComponent';

interface Props {
  indoorLevel: string;
  initializedLocation: InitializedLocation;
  movieMarkers?: MovieMarkers[];
  publicFacilityMarkers?: PublicFacilityMarkers[];
  guideLines: guideLines[];
  currentScreen: string;
  mapChange: any;
}

interface MovieMarkers {
  floor: string;
  movieId: number;
  latitude: number;
  longitude: number;
}

interface PublicFacilityMarkers {
  floor: string;
  type: 'toilet' | 'elevator';
  latitude: number;
  longitude: number;
}

interface InitializedLocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface guideLines {
    floor: string;
    latitude: number;
    longitude: number;
  }

export default class SubWindow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const currentScreen = this.props.currentScreen === 'map' ? this.mapScreen() : this.videoScreen();
    return (
      <TouchableOpacity style={style.container} onPress={this.props.mapChange}>
        {currentScreen}
      </TouchableOpacity>
    );
  }

  private mapScreen() {
    return (
      <MapViewComponent
        indoorLevel={this.state.indoorLevel}
        initializedLocation={this.state.initializedLocation}
        movieMarkers={this.state.movieMarkers}
        publicFacilityMarkers={this.state.publicFacilityMarkers}
        guideLines={this.state.guideLines}
      />
    );
  }

  private videoScreen() {
    return (
      <View style={style.container}></View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    position: 'absolute',
    backgroundColor: '#000000',
  },
});
