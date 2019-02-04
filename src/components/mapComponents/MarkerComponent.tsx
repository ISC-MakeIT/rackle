import * as React from 'react';
import { Marker } from 'react-native-maps';
import {ToiletMarker, ElevatorMarker, Gate }from '../../domains/map';
import { Movie }from '../../domains/movie';

type IconNameType = 'default'
  | 'toilet'
  | 'movie'
  | 'elevator6seater'
  | 'elevator12seater'
  | 'carousel'
  | 'gate';
  type Carousel = Movie | Gate;


interface Props {
  indoorLevel: string;
  movieMarkers?: Movie[];
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
  currentMovieMarkers?: Movie[];
  currentToiletMarkers?: ToiletMarker[];
  currentElevatorMarkers?: ElevatorMarker[];
  currentCarouselMarker?: Movie;
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
    if (this.state.currentMovieMarkers !== undefined)  return this.createMovieMarkers(this.state.currentMovieMarkers.length);
    if (this.state.currentElevatorMarkers !== undefined) return this.createElevatorMarkers();
    if (this.state.currentToiletMarkers !== undefined) return this.createToiletMarkers();
    if (this.props.carouselMarker !== undefined) return this.createCarouselMarker(this.props.carouselMarker);
    if (this.state.currentStartGateMarker !== undefined) return this.createGate(this.state.currentStartGateMarker);
    if (this.state.currentEndGateMarker !== undefined) return this.createGate(this.state.currentEndGateMarker);
    return null;
  }

  private currentMovieMarkerGenerate(indoorLevel: string, movieMarkers: Movie[]) {
    return movieMarkers.filter(movieMarker => movieMarker.floor === indoorLevel);
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
        return require('../../../assets/images/toilet.png');
      case 'movie':
        return require('../../../assets/images/map-pointer.png');
      case 'elevator6seater':
        return require('../../../assets/images/elevator.png'); // TODO 画像名を 'IconNameType'に合わせたい
      case 'elevator12seater':
        return require('../../../assets/images/big_elevator.png');
      default:
        return null;
    }
  }

  private createMovieMarkers(maxLength: number) {
    if(this.state.currentMovieMarkers === undefined) return null;

    return this.state.currentMovieMarkers.map((movieMarker, index: number) =>  (
      <Marker
        key={`movieMarker_${index}`}
        coordinate={{latitude: movieMarker.latitude, longitude: movieMarker.longitude}}
        image={this.iconChange('movie')}
        onPress={() => this.props.changeCarousel(movieMarker)}
      />
    ));
  }

  private createElevatorMarkers() {
    if (this.state.currentElevatorMarkers === undefined) return null;

    return this.state.currentElevatorMarkers.map((elevatorMarker, index: number) => {
      const icon: IconNameType = elevatorMarker.capacity === 6 ? 'elevator6seater' : 'elevator12seater'; // TODO 流動性もたせたい

      return (
        <Marker
          key={`elevatorMarker_${index}`}
          coordinate={{latitude: elevatorMarker.latitude, longitude: elevatorMarker.longitude}}
          description={`最大${elevatorMarker.capacity}人まで乗れます`}
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
        key={gateMarker.id}
        coordinate={{latitude: gateMarker.latitude, longitude: gateMarker.longitude}}
        image={this.iconChange('gate')}
        onPress={() => this.props.changeCarousel(gateMarker)}
      />
    );
  }
}
