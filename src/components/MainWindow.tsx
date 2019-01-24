import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapViewComponent from './mapComponents/MapViewComponent';
import { MovieMarker, ToiletMarker, ElevatorMarker, GuideLine, Region } from '../domains/map';

interface Props {
  indoorLevel: string;
  initializedLocation: Region;
  movieMarkers?: MovieMarker[];
  toiletMarkers?: ToiletMarker[];
  elevatorMarkers?: ElevatorMarker[];
  guideLines: GuideLine[];
  currentScreen: string;
  screenChange: any;
  changeIndoorLevel: any;
}

export const MainWindow: React.SFC<Props> = props => {
  const mapScreen = () => (
    <MapViewComponent
      indoorLevel={props.indoorLevel}
      initializedLocation={props.initializedLocation}
      movieMarkers={props.movieMarkers}
      toiletMarkers={props.toiletMarkers}
      elevatorMarkers={props.elevatorMarkers}
      guideLines={props.guideLines}
      changeIndoorLevel={props.changeIndoorLevel}
    />
  );

  const videoScreen = () => (<View style={style.container} />);

  return (
    <View style={style.container}>
      {props.currentScreen === 'map' ? mapScreen() : videoScreen()}
    </View>
  );
};

const {width, height} = Dimensions.get('screen');

const style = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: '#000000',
  },
});
