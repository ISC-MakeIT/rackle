import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MarkerComponent from './MarkerComponent';
import PolylineComponent from './PolylineComponent';

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
  indoorLevel: string;
  initializedLocation: InitializedLocation;
  currentStateMarkers: {
    movieMarkers: MovieMarkers[],
    publicFacilityMarkers: PublicFacilityMarkers[],
  };
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
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
      indoorLevel: this.props.indoorLevel,
      initializedLocation: this.props.initializedLocation,
      currentStateMarkers: this.currentStateMarkersGenerate(this.props.indoorLevel),
    };
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state.indoorLevel === nextState.indoorLevel ? false : true;
  }

  public render() {
    const movieMarkers = this.state.currentStateMarkers.movieMarkers;
    const currentMovieMarkers = movieMarkers.map((point, index: number) => {
      const latLng = {
        latitude: point.latitude,
        longitude: point.longitude,
      };
      return (
        <MarkerComponent key={`movieMarker_${index}`} latLng={latLng} iconName={'floor'} pinColor={'rgb(150,255,0)'} />
      );
    });

    const publicFacilityMarkers = this.state.currentStateMarkers.publicFacilityMarkers;
    const currentPublicFacilityMarkers = publicFacilityMarkers.map((point, index: number) => {
      const latLng = {
        latitude: point.latitude,
        longitude: point.longitude,
      };
      return (
        <MarkerComponent key={`publicFacilityMarker_${index}`} latLng={latLng} iconName={point.type} pinColor={'rgb(255,255,0)'} />
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
          onPress={(e: any) => console.log (e.nativeEvent.coordinate)} // debugのため
          onIndoorLevelActivated={(e: any) => { this.changeIndoorLevel(e.nativeEvent.IndoorLevel.name); }}
        >
          {currentMovieMarkers}
          {currentPublicFacilityMarkers}
          <PolylineComponent
            indoorLevel={this.state.indoorLevel}
            guideLines={this.props.guideLines}
          />
        </MapView>
      </View>
    );
  }

  private changeIndoorLevel(level: string) {
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
