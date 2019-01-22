import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

interface Props {
  flg: string;
  MapViewComponent: MapViewComponent;
}

interface State {
  flg: string;
}

interface MapViewComponent {
  indoorLevel: string;
  initializedLocation: InitializedLocation;
  markers: [{
    movieMarkers: MovieMarkers[],
  }, {
    publicFacilityMarkers: PublicFacilityMarkers[]
  }];
  guideLines: guideLines[];
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
  lineLatLng: LatLng[];
}

interface LatLng {
  latitude: number;
  longitude: number;
}

export default class MapScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      flg: this.props.flg,
    };
  }

  public render() {
    const currentScreen = this.state.flg === 'map' ? this.mapScreen() : this.videoScreen();
    return (
      <View>
        {currentScreen}
      </View>
    );
  }

  private mapScreen() {

  }

  private videoScreen() {

  }
}
