import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../constants/Colors';
import SubWindow from '../components/SubWindow';
import MainWindow from '../components/MainWindow';
import DummyData from '../components/mapComponents/DummyData';
import NavigationPlate from '../components/NavigationPlate';

interface Props { navigation: any; }

export default class GuideScreen extends React.Component<Props, {}> {
  public static navigationOptions = {
    headerStyle: {
      display: 'none',
    },
  };

  constructor(props: Props) {
    super(props);
    this.state= {
      indoorLevel: DummyData.indoorLevel,
      currentScreen: DummyData.currentScreen,
      initializedLocation: DummyData.initializedLocation,
      movieMarkers: DummyData.movieMarkers,
      toiletMarkers: DummyData.toiletMarkers,
      elevatorMarkers: DummyData.elevatorMarkers,
      guideLines: DummyData.guideLines,
    };
  }

  public render() {
    return(
      <View style={guideStyle.content_wrap}>
        <MainWindow
          initializedLocation={this.state.initializedLocation}
          indoorLevel={this.state.indoorLevel}
          movieMarkers={this.state.movieMarkers}
          toiletMarkers={this.state.toiletMarkers}
          elevatorMarkers={this.state.elevatorMarkers}
          guideLines={this.state.guideLines}
          currentScreen={this.state.currentScreen}
          changeIndoorLevel={this.changeIndoorLevel.bind(this)}
        />
        <TouchableOpacity style={guideStyle.subWindowCircle} >
          <SubWindow
            currentScreen={this.state.currentScreen}
            indoorLevel={this.state.indoorLevel}
            initializedLocation={this.state.initializedLocation}
            guideLines={this.state.guideLines}
            screenChange={this.screenChange.bind(this)}
            changeIndoorLevel={this.changeIndoorLevel.bind(this)}
          />
        </TouchableOpacity>
      </View>
    );
  }

  private screenChange(currentScreen: 'video' | 'map') {
    this.setState({
      currentScreen: currentScreen,
    });
  }

  private changeIndoorLevel(indoorLevel: string) {
    const validatedIndoorLevel = indoorLevel.replace(/階/, '');
    const currentFloor = validatedIndoorLevel.substr(-2);
    this.setState({
      indoorLevel: currentFloor,
    });
  }
}

EStyleSheet.build({});
const { width, height } = Dimensions.get('window');

const guideStyle = EStyleSheet.create({
  content_wrap: {
    flex: 1,
    top: 0,
    position: 'relative',
  },
  subWindowCircle: {
    width: '8rem',
    height: '8rem',
    borderRadius: '4rem',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 6,
    top: 20,
    elevation: 8,
    // backgroundColor: 'skyblue',
  },
});

const thumbnailStyle = EStyleSheet.create({
  Image: {
    width: 120,
    height: 120,
  },
  Container: {
    height: 200,
  },
});

const guideHeaderStyle = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    marginTop: getStatusBarHeight(),
    justifyContent: 'space-evenly',
    backgroundColor: '#312D2D',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
  },
  stationName: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: 16,
    lineHeight: 30,
  },
  gateNameContainer: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 20,
    marginTop: 5,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  gateName: {
    lineHeight: 10,
    fontSize: 10,
  },
  routeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  routeOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  routeOptionText: {
    fontSize: 10,
    color: 'red',
    lineHeight: 35,
    paddingRight: 5,
  },
  rightContainer: {
    backgroundColor: 'red',
    marginLeft: 'auto',
  },
  rightText: {
    fontSize: 22,
    lineHeight: 30,
    paddingHorizontal: 20,
  },
});
