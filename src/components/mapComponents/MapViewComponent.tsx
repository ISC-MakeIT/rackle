import * as React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MarkerComponent from './MarkerComponent';
import PolylineComponent from './PolylineComponent';
import CustomMap from '../mapComponents/CustomMap';
import { Region, ToiletMarker } from 'src/domains/map';
import { ObjectPoint } from '../../domains/object_point';

type ScreenNameType = 'video' | 'map';

interface Props {
  indoorLevel: string;
  initializedLocation: Region;
  movieMarkers?: ObjectPoint[];
  toiletMarkers?: ToiletMarker[];
  elevatorMarkers?: ObjectPoint[];
  guideLines?: Partial<ObjectPoint>[];
  guideLinesColor?: string;
  changeIndoorLevel: (nextIndoorLevel: string) => void;
  screenChange?: () => void;
  currentScreen?: ScreenNameType;
  currentCarousel?: ObjectPoint;
  changeCarousel: (carousel: ObjectPoint) => void;
  gate?: ObjectPoint[];
  hideModal: () => void;
  modalChange: boolean;
}

interface State { initializedLocation: Region; }

export default class MapViewComponent extends React.Component<Props, State> {
  readonly state = { initializedLocation: this.props.initializedLocation };

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    // FIXME 個々の処理がカオスになってる
    // tslint:disable-next-line:max-line-length
    const hasNextCarouselAndChanged = this.props.currentCarousel !== nextProps.currentCarousel && nextProps.currentCarousel != undefined;
    // tslint:disable-next-line:max-line-length
    const indoorLevelCarouselChanged = nextProps.currentCarousel == undefined && this.props.currentCarousel !== nextProps.currentCarousel;
    const modalChanged = this.props.modalChange !== nextProps.modalChange;
    if (hasNextCarouselAndChanged || indoorLevelCarouselChanged || modalChanged) return true;

    return this.props.indoorLevel !== nextProps.indoorLevel ? true : false;
  }

  public componentWillReceiveProps (nextProps: Props, nextState: State) {
    if (this.props.modalChange !== nextProps.modalChange) {
      this.setState({initializedLocation: nextProps.initializedLocation});
    }
    if (this.props.currentCarousel !== nextProps.currentCarousel) {
      this.setState({initializedLocation: nextProps.initializedLocation});
    }
  }

  public render() {
    const movieMarkers = this.props.movieMarkers ?
      <MarkerComponent
        indoorLevel={this.props.indoorLevel}
        movieMarkers={this.props.movieMarkers}
        changeCarousel={this.props.changeCarousel}
      /> : null;
    const toiletMarkers = this.props.toiletMarkers ?
      <MarkerComponent
        indoorLevel={this.props.indoorLevel}
        toiletMarkers={this.props.toiletMarkers}
        changeCarousel={this.props.changeCarousel}
      /> : null;
    const elevatorMarkers = this.props.elevatorMarkers ?
      <MarkerComponent
        indoorLevel={this.props.indoorLevel}
        elevatorMarkers={this.props.elevatorMarkers}
        changeCarousel={this.props.changeCarousel}
      /> : null;
    const mainColorPolyline = this.props.guideLines ?
      <PolylineComponent indoorLevel={this.props.indoorLevel} guideLines={this.props.guideLines} /> : null;
    const subColorPolyline = this.props.guideLinesColor && this.props.guideLines ?
      <PolylineComponent
        indoorLevel={this.props.indoorLevel}
        guideLines={this.props.guideLines}
        guideLinesColor={this.props.guideLinesColor}
      /> : null;
    const carouselMarkers = this.props.currentCarousel ?
      <MarkerComponent
        indoorLevel={this.props.indoorLevel}
        carouselMarker={this.props.currentCarousel}
        changeCarousel={this.props.changeCarousel}
      /> : null;
    const gateMarkers = this.props.gate != undefined ?
      <MarkerComponent
        indoorLevel={this.props.indoorLevel}
        gate={this.props.gate}
        changeCarousel={this.props.changeCarousel}
      /> : null;

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
        onIndoorLevelActivated={ (e: any) => { this.props.changeIndoorLevel(e.nativeEvent.IndoorLevel.name); }}
        loadingEnabled={true}
        scrollEnabled={!this.props.guideLinesColor}
        rotateEnabled={!this.props.guideLinesColor}
        onPress={this.props.hideModal}
      >
        {movieMarkers}
        {toiletMarkers}
        {elevatorMarkers}
        {subColorPolyline}
        {mainColorPolyline}
        {carouselMarkers}
        {gateMarkers}
      </MapView>
    );
  }

  private locationChange(region: Region) {
    this.setState({ initializedLocation: region });
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    },
});
