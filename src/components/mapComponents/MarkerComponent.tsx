import * as React from 'react';
import { Marker } from 'react-native-maps';
import {ToiletMarker, ElevatorMarker }from '../../domains/map';
import { GuideLineObject, ObjectPoints }from '../../domains/movie';
import { Gate } from 'src/domains/gate';

type IconNameType = 'default'
  | 'toilet'
  | 'movie'
  | 'elevator6seater'
  | 'elevator12seater'
  | 'carousel'
  | 'gate'
  | '12人乗り'
  | '18人乗り';

  type Carousel = GuideLineObject | Gate;


interface Props {
  indoorLevel: string;
  movieMarkers?: GuideLineObject[];
  toiletMarkers?: ToiletMarker[];
  elevatorMarkers?: ElevatorMarker[];
  iconName?: IconNameType;
  pinColor?: string;
  carouselMarker?: Carousel;
  changeCarousel: (carousel: Carousel) => void;
  startGate?: Gate;
  endGate?: Gate;
}

interface State {
  indoorLevel: string;
  currentMovieMarkers?: GuideLineObject[];
  currentToiletMarkers?: ToiletMarker[];
  currentElevatorMarkers?: ElevatorMarker[];
  currentCarouselMarker?: GuideLineObject;
  currentStartGateMarker?: Gate;
  currentEndGateMarker?: Gate;
}

export default class MarkerComponent extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);
    const currentMovieMarkers = this.props.movieMarkers ?
      this.currentMovieMarkerGenerate(this.props.indoorLevel, this.props.movieMarkers) : undefined;
    const currentElevatorMarkers = this.props.elevatorMarkers ?
      this.currentElevatorMarkerGenerate(this.props.indoorLevel, this.props.elevatorMarkers) : undefined;
    const currentToiletMarkers = this.props.toiletMarkers ?
      this.currentToiletMarkerGenerate(this.props.indoorLevel, this.props.toiletMarkers) : undefined;
    const currentStartGateMarker =  this.props.startGate != undefined ?
      this.currentGateMarkerGenerate(this.props.indoorLevel, this.props.startGate): undefined;
    const currentEndGateMarker = this.props.endGate != undefined ?
      this.currentGateMarkerGenerate(this.props.indoorLevel, this.props.endGate) : undefined;
    this.state = {
      indoorLevel: this.props.indoorLevel,
      currentMovieMarkers,
      currentElevatorMarkers,
      currentToiletMarkers,
      currentStartGateMarker,
      currentEndGateMarker,
    };
  }

  public componentWillReceiveProps(nextProps: Props, _: State) {
    const currentMovieMarkers = nextProps.movieMarkers ?
      this.currentMovieMarkerGenerate(nextProps.indoorLevel, nextProps.movieMarkers) : undefined;
    const currentElevatorMarkers = nextProps.elevatorMarkers ?
      this.currentElevatorMarkerGenerate(nextProps.indoorLevel, nextProps.elevatorMarkers) : undefined;
    const currentToiletMarkers = nextProps.toiletMarkers ?
      this.currentToiletMarkerGenerate(nextProps.indoorLevel, nextProps.toiletMarkers) : undefined;
    const currentStartGateMarker =  nextProps.startGate != undefined ?
      this.currentGateMarkerGenerate(nextProps.indoorLevel, nextProps.startGate): undefined;
    const currentEndGateMarker = nextProps.endGate != undefined ?
      this.currentGateMarkerGenerate(nextProps.indoorLevel, nextProps.endGate) : undefined;
    this.setState({
      indoorLevel: nextProps.indoorLevel,
      currentMovieMarkers,
      currentElevatorMarkers,
      currentToiletMarkers,
      currentStartGateMarker,
      currentEndGateMarker,
    });
  }

  public render() {
    if (this.state.currentMovieMarkers !== undefined)  return this.createGuideLineObjects(this.state.currentMovieMarkers.length);
    if (this.state.currentElevatorMarkers !== undefined) return this.createElevatorMarkers();
    if (this.state.currentToiletMarkers !== undefined) return this.createToiletMarkers();
    if (this.props.carouselMarker !== undefined) return this.createCarouselMarker(this.props.carouselMarker);
    if (this.state.currentStartGateMarker !== undefined) return this.createGate(this.state.currentStartGateMarker);
    if (this.state.currentEndGateMarker !== undefined) return this.createGate(this.state.currentEndGateMarker);
    return null;
  }

  private currentMovieMarkerGenerate(indoorLevel: string, guideLineObjects: GuideLineObject[]) {
    return guideLineObjects.filter(guideLineObject => guideLineObject.floor === indoorLevel);
  }

  private currentElevatorMarkerGenerate(indoorLevel: string, elevatorMarkers: ElevatorMarker[]) {
    return elevatorMarkers.filter(elevatorMarker => elevatorMarker.floor === indoorLevel);
  }

  private currentToiletMarkerGenerate(indoorLevel: string, toiletMarkers: ToiletMarker[]) {
    return toiletMarkers.filter(toiletMarker => toiletMarker.floor === indoorLevel);
  }

  private currentGateMarkerGenerate(indoorLevel: string, GateMarker: Gate) {
    if (GateMarker.floor === indoorLevel) return GateMarker;
    return undefined;
  }

  private iconChange(iconName: IconNameType) {
    switch (iconName) {
      case 'toilet':
        return require('../../../assets/images/map-toilet-marker.png');
      case 'movie':
        return require('../../../assets/images/map_movie_pointer.png');
      case '12人乗り':
        return require('../../../assets/images/map-elevator-small-marker.png');
      case '18人乗り':
        return require('../../../assets/images/map-elevator-big-marker.png');
      case 'gate':
        return require('../../../assets/images/map-ticket-gate.png');
      case 'carousel':
        return require('../../../assets/images/map-movie-marker-check.png');
      default:
        return null;
    }
  }

  private createGuideLineObjects(maxLength: number) {
    if(this.state.currentMovieMarkers === undefined) return null;

    return this.state.currentMovieMarkers.map((GuideLineObject, index: number) =>  (
      <Marker
        key={`movieMarker_${index}`}
        coordinate={{latitude: GuideLineObject.latitude, longitude: GuideLineObject.longitude}}
        image={ GuideLineObject.type === 'movie' ? this.iconChange(GuideLineObject.type) : this.iconChange(GuideLineObject.caption)}
        onPress={() => this.props.changeCarousel(GuideLineObject)}
        anchor={{x: 0.5, y: 0.5}}
      />
    ));
  }

  private createElevatorMarkers() {
    if (this.state.currentElevatorMarkers === undefined) return null;

    return this.state.currentElevatorMarkers.map((elevatorMarker, index: number) => {
      const icon: IconNameType = elevatorMarker.size === 6 ? 'elevator6seater' : 'elevator12seater'; // TODO 流動性もたせたい

      return (
        <Marker
          key={`elevatorMarker_${index}`}
          coordinate={{latitude: elevatorMarker.latitude, longitude: elevatorMarker.longitude}}
          description={`最大${elevatorMarker.size}人まで乗れます`}
          image={this.iconChange(icon)}
        />
      );
    });
  }

  private createToiletMarkers() {
    if (this.state.currentToiletMarkers === undefined) return null;
    return this.state.currentToiletMarkers.map((toiletMarker, index: number) => {

      return (
        <Marker
          key={`toiletMarker_${index}`}
          coordinate={{latitude: toiletMarker.latitude, longitude: toiletMarker.longitude}}
          image={this.iconChange('toilet')}
        />
      );
    });
  }

  private createCarouselMarker(carousel: Carousel) {
    if (carousel === undefined) return null;
    if (carousel.floor !== this.props.indoorLevel) return null;

    return(
      <Marker
        key={'carouselMarker'}
        coordinate={{latitude: carousel.latitude, longitude: carousel.longitude}}
        image={this.iconChange('carousel')}
      />
    );
  }

  private createGate = (gateMarker: Gate) => {
    return (
      <Marker
        key={`gateMarker${gateMarker.id}`}
        coordinate={{latitude: gateMarker.latitude, longitude: gateMarker.longitude}}
        image={this.iconChange('gate')}
        onPress={() => this.props.changeCarousel(gateMarker)}
      />
    );
  }
}
