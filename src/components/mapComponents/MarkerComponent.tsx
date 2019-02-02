import * as React from 'react';
import { Marker } from 'react-native-maps';
import {ToiletMarker, ElevatorMarker }from '../../domains/map';
import { Movie }from '../../domains/movie';

type IconNameType = 'default'
  | 'toilet'
  | 'movie'
  | 'elevator6seater'
  | 'elevator12seater'
  | 'carousel';

interface Props {
  indoorLevel: string;
  movieMarkers?: Movie[];
  toiletMarkers?: ToiletMarker[];
  elevatorMarkers?: ElevatorMarker[];
  iconName?: IconNameType;
  pinColor?: string;
  carouselMarker?: Movie;
  changeCarousel?: any;
}

interface State {
  indoorLevel: string;
  currentMovieMarkers?: Movie[];
  currentToiletMarkers?: ToiletMarker[];
  currentElevatorMarkers?: ElevatorMarker[];
  currentCarouselMarker?: Movie;
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
    this.state = {
      indoorLevel: this.props.indoorLevel,
      currentMovieMarkers,
      currentElevatorMarkers,
      currentToiletMarkers,
    };
  }

  public componentWillReceiveProps(nextProps: Props, _: State) {
    const currentMovieMarkers = nextProps.movieMarkers ?
      this.currentMovieMarkerGenerate(nextProps.indoorLevel, nextProps.movieMarkers) : undefined;
    const currentElevatorMarkers = nextProps.elevatorMarkers ?
      this.currentElevatorMarkerGenerate(nextProps.indoorLevel, nextProps.elevatorMarkers) : undefined;
    const currentToiletMarkers = nextProps.toiletMarkers ?
      this.currentToiletMarkerGenerate(nextProps.indoorLevel, nextProps.toiletMarkers) : undefined;
    this.setState({
      indoorLevel: nextProps.indoorLevel,
      currentMovieMarkers,
      currentElevatorMarkers,
      currentToiletMarkers,
    });
  }

  public render() {
    if (this.state.currentMovieMarkers !== undefined)  return this.createMovieMarkers(this.state.currentMovieMarkers.length);
    if (this.state.currentElevatorMarkers !== undefined) return this.createElevatorMarkers();
    if (this.state.currentToiletMarkers !== undefined) return this.createToiletMarkers();
    if (this.props.carouselMarker !== undefined) return this.createCarouselMarker(this.props.carouselMarker);
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
        image={maxLength === index || index === 0 ? this.iconChange('default') : this.iconChange('movie')}
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
  private createCarouselMarker(carousel: Movie) {
    if (carousel === undefined) return null;

    return(
      <Marker
        key={'carouselMarker'}
        coordinate={{latitude: carousel.latitude, longitude: carousel.longitude}}
        image={this.iconChange('carousel')}
      />
    );
  }
}
