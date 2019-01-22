import * as React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MarkerComponent from './MarkerComponent';
import PolylineComponent from './PolylineComponent';
import CustomMap from '../mapComponents/CustomMap';

interface Props {
  indoorLevel: string;
  initializedLocation: InitializedLocation;
  movieMarkers?: MovieMarkers[];
  publicFacilityMarkers?: PublicFacilityMarkers[];
  guideLines?: guideLines[];
  guideLinesColor?: string;
}

interface State {
  indoorLevel: string;
  initializedLocation: InitializedLocation;
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
  latitude: number;
  longitude: number;
}

export default class MapViewComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      indoorLevel: this.props.indoorLevel,
      initializedLocation: this.props.initializedLocation,
    };
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state.indoorLevel === nextState.indoorLevel ? false : true;
  }

  public render() {
    const movieMarker = this.props.movieMarkers ?
      <MarkerComponent indoorLevel={this.state.indoorLevel} movieMarkers={this.props.movieMarkers} /> : null;
    const publicFacilityMarker = this.props.publicFacilityMarkers ?
      <MarkerComponent indoorLevel={this.state.indoorLevel} publicFacilityMarkers={this.props.publicFacilityMarkers} /> : null;
    const bigMapPolyline = this.props.guideLines ?
      <PolylineComponent indoorLevel={this.state.indoorLevel} guideLines={this.props.guideLines} /> : null;
    const smallMapPolyline = this.props.guideLinesColor ? this.props.guideLines ?
      <PolylineComponent indoorLevel={this.state.indoorLevel} guideLines={this.props.guideLines} guideLinesColor={this.props.guideLinesColor} /> : null : null;
    return (
      <MapView
        customMapStyle= {CustomMap.mapStyle}
        showsIndoorLevelPicker={this.props.guideLinesColor ? false : true}
        showsTraffic={false}
        showsBuildings={false}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={this.state.initializedLocation}
        onRegionChange={(e: Region) => this.locationChange(e)}
        minZoomLevel={this.props.guideLinesColor ? 17 : 18}
        onPress={(e: any) => console.log (e.nativeEvent.coordinate)} // debugのため
        onIndoorLevelActivated={(e: any) => { this.changeIndoorLevel(e.nativeEvent.IndoorLevel.name); }}
        loadingEnabled={true}
      >
        {movieMarker}
        {publicFacilityMarker}
        {bigMapPolyline}
        {smallMapPolyline}
      </MapView>
    );
  }

  private changeIndoorLevel(indoorLevel: string) {
    const validatedIndoorLevel = indoorLevel.replace(/階/, '');
    const currentFloor = validatedIndoorLevel.substr(-2);
    this.setState({
      indoorLevel: currentFloor,
    });
  }

  private locationChange(region: Region) {
    this.setState({
      initializedLocation: region,
    });
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
  },
});
