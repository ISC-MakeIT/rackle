import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SubWindow from '../components/SubWindow';
import MainWindow from '../components/MainWindow';
import DummyData from '../components/mapComponents/DummyData';

interface Props { navigation: any; }

export default class GuideScreen extends React.Component<Props, {}> {
  public static navigationOptions = {
    headerStyle: { display: 'none' },
  };

  readonly state= {
    indoorLevel: DummyData.indoorLevel,
    currentScreen: DummyData.currentScreen,
    initializedLocation: DummyData.initializedLocation,
    movieMarkers: DummyData.movieMarkers,
    toiletMarkers: DummyData.toiletMarkers,
    elevatorMarkers: DummyData.elevatorMarkers,
    guideLines: DummyData.guideLines,
  };

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
  },
});
