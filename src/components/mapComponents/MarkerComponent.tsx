import * as React from 'react';
import { Marker } from 'react-native-maps';
import {ToiletMarker }from '../../domains/map';
import { GuideLineObject }from '../../domains/movie';

type Carousel = GuideLineObject;

interface Props {
  indoorLevel: string;
  movieMarkers?: GuideLineObject[];
  toiletMarkers?: ToiletMarker[];
  elevatorMarkers?: GuideLineObject[];
  pinColor?: string;
  carouselMarker?: Carousel;
  changeCarousel: (carousel: Carousel) => void;
  gate?: GuideLineObject[];
}

export default class MarkerComponent extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);
  }

  public render() {
    if (this.props.movieMarkers !== undefined)  return this.createMarker(this.props.movieMarkers);
    if (this.props.elevatorMarkers !== undefined) return this.createMarker(this.props.elevatorMarkers);
    if (this.props.toiletMarkers !== undefined) return this.createToiletMarkers(this.props.toiletMarkers);
    if (this.props.carouselMarker !== undefined) return this.createCarouselMarker(this.props.carouselMarker);
    if (this.props.gate !== undefined) return this.createMarker(this.props.gate);
    return null;
  }

  private iconChange(iconName: string) {
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

  private createMarker = (items: GuideLineObject[]) => {
    return items.map((item, index: number) =>  (
      <Marker
        key={`movieMarker_${index}`}
        coordinate={{latitude: item.latitude, longitude: item.longitude}}
        image={item.type === 'elevator' ? this.iconChange(item.caption) : this.iconChange(item.type)}
        onPress={() => this.props.changeCarousel(item)}
        anchor={item.type === 'movie' ? {x: 0.5, y: 0.5} : undefined}
      />
    ));
  }

  private createToiletMarkers(toiletMarkers: ToiletMarker[]) {
    return toiletMarkers.map((toiletMarker, index: number) => {

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
    if (carousel.floor !== this.props.indoorLevel) return null;

    return(
      <Marker
        key={'carouselMarker'}
        coordinate={{latitude: carousel.latitude, longitude: carousel.longitude}}
        image={this.iconChange('carousel')}
      />
    );
  }
}
