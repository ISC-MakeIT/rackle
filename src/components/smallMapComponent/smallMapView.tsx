import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
// import MapViewComponent from '../mapComponents/MapViewComponent';
// import Colors from '../../constants/Colors';

interface Props {
  indoorLevel: string;
  initializedLocation: InitializedLocation;
  markers: [{
    movieMarkers: MovieMarkers[],
  }, {
    publicFacilityMarkers: PublicFacilityMarkers[]
  }];
  guideLines: guideLines[];
}

interface State {
  guideLines: {
    floor: string,
    lineLatLng: {
      latitude: number,
      longitude: number,
    }[],
  }[];
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

export default class MapViewComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  public render() {

    return (
      <MapViewComponent

      />
    );
  }

}
