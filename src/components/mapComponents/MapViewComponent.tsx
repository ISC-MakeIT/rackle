import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MarkerComponent from './MarkerComponent';
import PolylineComponent from './PolylineComponent';

interface MapViewComponentProps {
  indoorLevel: string;
  initializedLocation: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers: [{
    movieMarkers: Array<{
      floor: string,
      movieId: number,
      latitude: number,
      longitude: number,
    }>,
  }, {
    publicFacilityMarkers: Array<{
      floor: string,
      type: 'toilet' | 'elevator',
      latitude: number,
      longitude: number,
    }>;
  }];
  guideLines: Array<{
    floor: string,
    path: Array<{
      latitude: number,
      longitude: number,
    }>,
  }>;
}

interface MapViewComponentState {
  indoorLevel: string;
  initializedLocation: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  currentStateMarkers: {
    movieMarkers: Array<{
      floor: string,
      movieId: number,
      latitude: number,
      longitude: number,
    }>,
    publicFacilityMarkers: Array<{
      floor: string,
      type: 'toilet' | 'elevator',
      latitude: number,
      longitude: number,
    }>;
  };
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default class MapViewComponent extends React.Component<MapViewComponentProps, MapViewComponentState> {
  constructor(props: MapViewComponentProps) {
    super(props);
    this.state = {
      indoorLevel: this.props.indoorLevel,
      initializedLocation: this.props.initializedLocation,
      currentStateMarkers: this.currentStateMarkersGenerate(this.props.indoorLevel),
    };
  }

  public shouldComponentUpdate(nextProps: MapViewComponentProps, nextState: MapViewComponentState) {
    if (this.state.indoorLevel === nextState.indoorLevel) {
      return false;
    }
    return true;
  }

  public render() {
    const movieMarkers = this.state.currentStateMarkers.movieMarkers;
    const currentMovieMarker = movieMarkers.map((point, index: number) => {
      const latLng = {
        latitude: point.latitude,
        longitude: point.longitude,
      };
      return (
        <MarkerComponent key={index} latLng={latLng} iconName={'floor'} pinColor={'rgb(150,255,0)'} />
      );
    });

    const publicFacilityMarkers = this.state.currentStateMarkers.publicFacilityMarkers;
    const currentPublicFacilityMarker = publicFacilityMarkers.map((point, index: number) => {
      const latLng = {
        latitude: point.latitude,
        longitude: point.longitude,
      };
      return (
        <MarkerComponent key={index} latLng={latLng} iconName={point.type} pinColor={'rgb(255,255,0)'} />
      );
    });

    return (
      <View style={styles.container}>
        <MapView
          showsTraffic={false}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.initializedLocation}
          onRegionChange={(e: Region) => this.locationChange(e)}
          minZoomLevel={18}
          // onPress={(e: any) => console.log (e.nativeEvent.coordinate)}
          onIndoorLevelActivated={(e: any) => { this.indoorLevel(e.nativeEvent.IndoorLevel.name); }}
        >
          {currentMovieMarker}
          {currentPublicFacilityMarker}
          <PolylineComponent
            indoorLevel={this.state.indoorLevel}
            guideLines={this.props.guideLines}
          />
        </MapView>
      </View>
    );
  }

  private indoorLevel(level: string) {
    const floor = level.substr(-2);
    const currentStateMarkers = this.currentStateMarkersGenerate(floor);
    this.setState({
      indoorLevel: floor,
      currentStateMarkers,
    });
  }

  private locationChange(region: Region) {
    this.setState({
      initializedLocation: region,
    });
  }

  private currentStateMarkersGenerate(indoorLevel: string, markers = this.props.markers) {
    const movieMarkers = markers[0].movieMarkers.filter(movieMarker => movieMarker.floor === indoorLevel);
    const publicFacilityMarkers = markers[1].publicFacilityMarkers.filter(publicFacilityMarker => publicFacilityMarker.floor === indoorLevel);
    return {
      movieMarkers,
      publicFacilityMarkers,
    };
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 700,
    margin: 0,
    padding: 0,
    width: 420,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',

  },
});
