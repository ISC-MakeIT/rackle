import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapViewComponent from './mapComponents/MapViewComponent';
import { GuideLine, Region } from 'src/domains/map';

interface Props {
  indoorLevel: string;
  initializedLocation: Region;
  guideLines: GuideLine[];
  currentScreen: 'video' | 'map';
  screenChange: any;
  changeIndoorLevel: any;
}

export default class SubWindow extends React.Component<Props, {}> {
  public render() {
    return (
      <View style={style.container}>
        {this.props.currentScreen === 'video' ? this.mapScreen() : this.videoScreen()}
      </View>
    );
  }

  private mapScreen() {
    return (
      <MapViewComponent
        indoorLevel={this.props.indoorLevel}
        initializedLocation={this.props.initializedLocation}
        guideLines={this.props.guideLines}
        guideLinesColor={'#ddd'}
        changeIndoorLevel={this.props.changeIndoorLevel}
      />
    );
  }

  private videoScreen() {
    return (
      <View>
        onPress={() =>this.props.screenChange(this.screenChangeCheck())}
        style={style.container}
      >
      </View>
    );
  }

  private screenChangeCheck () {
    return this.props.currentScreen === 'video' ? 'map' : 'video';
  }
}

const style = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    zIndex: 50,
    position: 'absolute',
    backgroundColor: '#000000',
  },
});
