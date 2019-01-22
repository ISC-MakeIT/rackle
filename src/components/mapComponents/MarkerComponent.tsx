import * as React from 'react';
import { Marker } from 'react-native-maps';

interface Props {
  indoorLevel: string;
  movieMarkers?: MovieMarker[];
  publicFacilityMarkers?: PublicFacilityMarker[];
  iconName?: string;
  pinColor?: string;
}

interface State {
  indoorLevel: string;
  currentMovieMarkers?: MovieMarker[];
  currentPublicFacilityMarkers?: PublicFacilityMarker[];
}

interface MovieMarker {
  floor: string;
  movieId: number;
  latitude: number;
  longitude: number;
}

interface PublicFacilityMarker {
  floor: string;
  type: 'toilet' | 'elevator';
  latitude: number;
  longitude: number;
}

export default class MarkerComponent extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);
    const currentMovieMarkers = this.props.movieMarkers ?
      this.currentMovieMarkerGenerate(this.props.indoorLevel, this.props.movieMarkers) : undefined;
    const currentPublicFacilityMarkers = this.props.publicFacilityMarkers ?
      this.currentPublicFacilityMarkersGenerate(this.props.indoorLevel, this.props.publicFacilityMarkers) : undefined;
    this.state = {
      indoorLevel: this.props.indoorLevel,
      currentMovieMarkers,
      currentPublicFacilityMarkers,
    };
  }

  public componentWillReceiveProps(nextProps: Props, nextState: State) {
    const currentMovieMarkers = nextProps.movieMarkers ?
      this.currentMovieMarkerGenerate(nextProps.indoorLevel, nextProps.movieMarkers) : undefined;
    const currentPublicFacilityMarkers = nextProps.publicFacilityMarkers ?
      this.currentPublicFacilityMarkersGenerate(nextProps.indoorLevel, nextProps.publicFacilityMarkers) : undefined;
    this.setState({
      indoorLevel: nextProps.indoorLevel,
      currentMovieMarkers,
      currentPublicFacilityMarkers,
    });
  }

  public render() {
    const movieMarker = this.createMovieMarkers();
    const publicFacilityMarker = this.createPublicFacilityMarkers();
    if (movieMarker != undefined) return [...movieMarker];
    if (publicFacilityMarker != undefined) return [...publicFacilityMarker];
    return null;
  }

  private currentMovieMarkerGenerate(indoorLevel: string, movieMarkers: MovieMarker[]) {
    const currentMovieMarkers = movieMarkers.filter(movieMarker => movieMarker.floor === indoorLevel);
    return currentMovieMarkers;
  }

  private currentPublicFacilityMarkersGenerate(indoorLevel: string, publicFacilityMarkers: PublicFacilityMarker[]) {
    const currentPublicFacilityMarkers = publicFacilityMarkers.filter(publicFacilityMarker => publicFacilityMarker.floor === indoorLevel);
    return currentPublicFacilityMarkers;
  }

  private iconChange(iconName: string) {
    if (iconName === 'toilet') return require('../../../assets/images/toilet.jpg');
  }

  private createMovieMarkers() {
    const movieMarkerComponent = this.state.currentMovieMarkers != undefined ?
      this.state.currentMovieMarkers.map((movieMarker, index: number) => {
        return (
          <Marker
              key={`movieMarker_${index}`}
              coordinate={{latitude: movieMarker.latitude, longitude: movieMarker.longitude}}
              pinColor={this.props.pinColor}
          />
        );
      }) : undefined;
    return movieMarkerComponent;
  }

  private createPublicFacilityMarkers() {
    const publicFacilityMarkerComponent = this.state.currentPublicFacilityMarkers != undefined ?
      this.state.currentPublicFacilityMarkers.map((publicFacilityMarker, index: number) => {
        return (
          <Marker
              key={`publicFacilityMarker_${index}`}
              coordinate={{latitude: publicFacilityMarker.latitude, longitude: publicFacilityMarker.longitude}}
              image={this.iconChange(publicFacilityMarker.type)}
          />
        );
      }) : undefined;
    return publicFacilityMarkerComponent;
  }
}
