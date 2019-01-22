import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapViewComponent from './mapComponents/MapViewComponent';

interface Props {
  indoorLevel: string;
  initializedLocation: InitializedLocation;
  guideLines: guideLines[];
  currentScreen: string;
  mapChange: any;
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

export default class SubWindow extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const currentScreen = this.props.currentScreen === 'video' ? this.mapScreen() : this.videoScreen();
    return (
      <TouchableOpacity style={style.container} onPress={this.props.mapChange}>
        {currentScreen}
      </TouchableOpacity>
    );
  }

  private mapScreen() {
    return (
      <MapViewComponent
        indoorLevel={this.props.indoorLevel}
        initializedLocation={this.props.initializedLocation}
        guideLines={this.props.guideLines}
        guideLinesColor={'#ff0000'}
      />
    );
  }

  private videoScreen() {
    return (
      <View style={style.container}></View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    position: 'absolute',
    backgroundColor: '#000000',
  },
});
