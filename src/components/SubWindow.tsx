import * as React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import MapViewComponent from './mapComponents/MapViewComponent';
import { GuideLine, Region } from 'src/domains/map';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../constants/Colors';
import MovieNavigateComponent from './movieComponents/MovieNavigateComponent';


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
        />
    );
  }

  private videoScreen() {
    return (
        <MovieNavigateComponent />
    );
  }

  private screenChangeCheck () {
    return this.props.currentScreen === 'video' ? 'map' : 'video';
  }
}

EStyleSheet.build({});
const style = EStyleSheet.create({
  window_circle: {
    width: '8rem',
    height: '8rem',
    borderRadius: '4rem',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 6,
    top: 20,
    elevation: 8,
    backgroundColor: 'skyblue',
  },
  touchContainer: {
    width: 150,
    height: 150,
    zIndex: 50,
    position: 'absolute',
    backgroundColor: 'red',
  },
});
