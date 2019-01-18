import * as React from 'react';
import { Marker } from 'react-native-maps';

interface MarkerComponentProps {
  key: number;
  latLng: {
    latitude: number;
    longitude: number;
  };
  iconName: string;
  pinColor: string;
}

export default class MarkerComponent extends React.Component<MarkerComponentProps, {}> {
  constructor(props: MarkerComponentProps) {
    super(props);
  }

  public render() {
    return (
      <Marker
        coordinate={this.props.latLng}
        tracksInfoWindowChanges={false}
        pinColor={this.props.pinColor}
        image={this.iconChange()}
      />
    );
  }

  private iconChange() {
    if (this.props.iconName === 'toilet') return require('../../../assets/images/toilet.jpg');
  }
}
