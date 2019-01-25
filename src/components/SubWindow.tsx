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

const SubWindow: React.SFC<Props> = props => {
  const mapScreen = () => (
      <MapViewComponent
        indoorLevel={props.indoorLevel}
        initializedLocation={props.initializedLocation}
        guideLines={props.guideLines}
        guideLinesColor={'#ddd'}
        changeIndoorLevel={props.changeIndoorLevel}
        screenChange={props.screenChange}
        currentScreen={props.currentScreen}
      />
  );

  const videoScreen = () => ( <MovieNavigateComponent /> );

  return (
    <View style={style.container}>
      {props.currentScreen === 'video' ? mapScreen() : videoScreen()}
    </View>
  );
};

EStyleSheet.build({});
const style = EStyleSheet.create({
  container: {
    width: '8rem',
    height: '8rem',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 6,
    top: 20,
    elevation: 8,
    backgroundColor: 'skyblue',
    borderRadius: 100,
  },
  touchContainer: {
    width: 150,
    height: 150,
    zIndex: 50,
    position: 'absolute',
    backgroundColor: 'red',
  },
});

export default SubWindow;