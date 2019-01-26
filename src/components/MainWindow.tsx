import * as React from 'react';
import { View, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MapViewComponent from './mapComponents/MapViewComponent';
import MovieNavigateComponent from './movieComponents/MovieNavigateComponent';
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

const MainWindow: React.SFC<Props> = props => {
  return (
    <View style={style.container}>
      {
        props.currentScreen === 'map' ? (
          <MapViewComponent
            indoorLevel={props.indoorLevel}
            initializedLocation={props.initializedLocation}
            movieMarkers={props.movieMarkers}
            toiletMarkers={props.toiletMarkers}
            elevatorMarkers={props.elevatorMarkers}
            guideLines={props.guideLines}
            changeIndoorLevel={props.changeIndoorLevel}
          />
        ) : (<MovieNavigateComponent />)
      }
    </View>
  );
};

EStyleSheet.build({});
const {width, height} = Dimensions.get('screen');

const style = EStyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'green',
  },
});

export default MainWindow;
