import * as React from 'react';
import { Marker } from 'react-native-maps';

interface Props {
  indoorLevel: string;
  movieMarkers?: MovieMarker[];
  toiletMarkers?: ToiletMarker[];
  elevatorMarkers?: ElevatorMarker[];
  iconName?: string;
  pinColor?: string;
}

interface State {
  indoorLevel: string;
  currentMovieMarkers?: MovieMarker[];
  currentToiletMarkers?: ToiletMarker[];
  currentElevatorMarkers?: ElevatorMarker[];
}

interface MovieMarker {
  floor: string;
  movieId: number;
  latitude: number;
  longitude: number;
}

interface ToiletMarker {
  floor: string;
  latitude: number;
  longitude: number;
}

interface ElevatorMarker {
  floor: string;
  capacity: 6 | 12;
  latitude: number;
  longitude: number;
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

  public componentWillReceiveProps(nextProps: Props, nextState: State) {
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
    const movieMarker = this.state.currentMovieMarkers ? this.createMovieMarkers(this.state.currentMovieMarkers.length) : undefined;
    const elevatorMarker = this.createElevatorMarkers();
    const toiletMarker = this.createToiletMarkers();
    if (movieMarker != undefined) return movieMarker;
    if (toiletMarker != undefined) return toiletMarker;
    if (elevatorMarker != undefined) return elevatorMarker;
    return null;
  }

  private currentMovieMarkerGenerate(indoorLevel: string, movieMarkers: MovieMarker[]) {
    const currentMovieMarkers = movieMarkers.filter(movieMarker => movieMarker.floor === indoorLevel);
    return currentMovieMarkers;
  }

  private currentElevatorMarkerGenerate(indoorLevel: string, elevatorMarkers: ElevatorMarker[]) {
    const currentElevatorMarkers = elevatorMarkers.filter(elevatorMarker => elevatorMarker.floor === indoorLevel);
    return currentElevatorMarkers;
  }

  private currentToiletMarkerGenerate(indoorLevel: string, toiletMarkers: ToiletMarker[]) {
    const currentToiletMarkers = toiletMarkers.filter(toiletMarker => toiletMarker.floor === indoorLevel);
    return currentToiletMarkers;
  }

  private iconChange(iconName: string) {
    if (iconName === 'toilet') return require('../../../assets/images/toilet.png');
    if (iconName === 'movie') return require('../../../assets/images/map-pointer.png');
    if (iconName === 'elevator6seater') return require('../../../assets/images/elevator.png');
    if (iconName === 'elevator12seater') return require('../../../assets/images/big_elevator.png');
  }

  private createMovieMarkers(maxLength: number | undefined) {
    return this.state.currentMovieMarkers != undefined ?
      this.state.currentMovieMarkers.map((movieMarker, index: number) => {
        return (
          <Marker
              key={`movieMarker_${index}`}
              coordinate={{latitude: movieMarker.latitude, longitude: movieMarker.longitude}}
              image={maxLength === index || index === 0 ? this.iconChange('') : this.iconChange('movie')}
          />
        );
      }) : undefined;
  }

  private createElevatorMarkers() {
    return this.state.currentElevatorMarkers != undefined ?
      this.state.currentElevatorMarkers.map((elevatorMarker, index: number) => {
        return (
          <Marker
              key={`elevatorMarker_${index}`}
              coordinate={{latitude: elevatorMarker.latitude, longitude: elevatorMarker.longitude}}
              description={`最大${elevatorMarker.capacity}人まで乗れます`}
              image={this.iconChange(`elevator${elevatorMarker.capacity}seater`)}
          />
        );
      }) : undefined;
  }

  private createToiletMarkers() {
    return this.state.currentToiletMarkers != undefined ?
      this.state.currentToiletMarkers.map((toiletMarker, index: number) => {
        return (
          <Marker
              key={`toiletMarker_${index}`}
              coordinate={{latitude: toiletMarker.latitude, longitude: toiletMarker.longitude}}
              image={this.iconChange('toilet')}
          />
        );
      }) : undefined;
  }
}
