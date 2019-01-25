import * as React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MarkerComponent from './MarkerComponent';
import PolylineComponent from './PolylineComponent';
import CustomMap from '../mapComponents/CustomMap';
import { MovieMarker, ToiletMarker, ElevatorMarker, GuideLine, Region} from '../../domains/map';

interface Props {
  indoorLevel: string;
  initializedLocation: Region;
  movieMarkers?: MovieMarker[];
  toiletMarkers?: ToiletMarker[];
  elevatorMarkers?: ElevatorMarker[];
  guideLines?: GuideLine[];
  guideLinesColor?: string;
  changeIndoorLevel: any;
  screenChange?: any;
  currentScreen?: 'video' | 'map';
}

interface State {
  initializedLocation: Region;
}

export default class MapViewComponent extends React.Component<Props, State> {
  readonly state = {
    initializedLocation: this.props.initializedLocation,
  };

  public shouldComponentUpdate(nextProps: Props, _: State) {
    return this.props.indoorLevel === nextProps.indoorLevel ? false : true;
  }

  public render() {
    const movieMarker = this.props.movieMarkers ?
      <MarkerComponent indoorLevel={this.props.indoorLevel} movieMarkers={this.props.movieMarkers} /> : null;
    const toiletMarker = this.props.toiletMarkers ?
      <MarkerComponent indoorLevel={this.props.indoorLevel} toiletMarkers={this.props.toiletMarkers} /> : null;
    const elevatorMarker = this.props.elevatorMarkers ?
      <MarkerComponent indoorLevel={this.props.indoorLevel} elevatorMarkers={this.props.elevatorMarkers} /> : null;
    const mainColorPolyline = this.props.guideLines ?
      <PolylineComponent indoorLevel={this.props.indoorLevel} guideLines={this.props.guideLines} /> : null;
    const subColorPolyline = this.props.guideLinesColor && this.props.guideLines ?
      <PolylineComponent indoorLevel={this.props.indoorLevel} guideLines={this.props.guideLines} guideLinesColor={this.props.guideLinesColor} /> : null;
    // return (
    //   <MapView
    //     customMapStyle= {CustomMap.mapStyle}
    //     showsIndoorLevelPicker={!this.props.guideLinesColor ? true : false}
    //     showsTraffic={false}
    //     showsBuildings={false}
    //     provider={PROVIDER_GOOGLE}
    //     style={styles.map}
    //     region={this.state.initializedLocation}
    //     onRegionChange={(e: Region) => this.locationChange(e)}
    //     minZoomLevel={this.props.guideLinesColor ? 17 : 18}
    //     // onPress={(e: any) => console.log (e.nativeEvent.coordinate)} // debugのため
    //     // onPress={this.props.guideLinesColor ? () => this.props.screenChange(this.screenChangeCheck()) : undefined}
    //     onIndoorLevelActivated={(e: any) => { this.props.changeIndoorLevel(e.nativeEvent.IndoorLevel.name); }}
    //     loadingEnabled={true}
    //   >
    //     {movieMarker}
    //     {toiletMarker}
    //     {elevatorMarker}
    //     {subColorPolyline}
    //     {mainColorPolyline}
    //   </MapView>
    // );
    return (
      <MapView
        customMapStyle= {CustomMap.mapStyle}
        showsIndoorLevelPicker={!this.props.guideLinesColor ? true : false}
        showsTraffic={false}
        showsBuildings={false}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={this.state.initializedLocation}
        onRegionChange={(e: Region) => this.locationChange(e)}
        minZoomLevel={this.props.guideLinesColor ? 17 : 18}
        // onPress={(e: any) => console.log (e.nativeEvent.coordinate)} // debugのため
        onPress={this.props.guideLinesColor ? () => this.props.screenChange(this.screenChangeCheck()) : undefined}
        onIndoorLevelActivated={(e: any) => { this.props.changeIndoorLevel(e.nativeEvent.IndoorLevel.name); }}
        loadingEnabled={true}
        scrollEnabled={!this.props.guideLinesColor ? true : false}
        rotateEnabled={!this.props.guideLinesColor ? true : false}
      >
        {movieMarker}
        {toiletMarker}
        {elevatorMarker}
        {subColorPolyline}
        {mainColorPolyline}
      </MapView>
    );
  }

  private locationChange(region: Region) {
    this.setState({
      initializedLocation: region,
    });
  }

  private screenChangeCheck () {
    return this.props.currentScreen === 'video' ? 'map' : 'video';
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
  },
});
