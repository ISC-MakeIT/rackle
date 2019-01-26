import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import SubWindow from '../components/SubWindow';
import { MainWindow } from '../components/MainWindow';
import { Region, MovieMarker, ToiletMarker, ElevatorMarker, GuideLine } from 'src/domains/map';

interface State {
  indoorLevel: string;
  currentScreen: 'video' | 'map';
  initializedLocation: Region;
  movieMarkers?: MovieMarker[];
  toiletMarkers?: ToiletMarker[];
  elevatorMarkers?: ElevatorMarker[];
  guideLines: GuideLine[];
}

export default class MapScreen extends React.Component<{}, State> {
  public static navigationOptions = {
    headerStyle: { display: 'none' },
  };

  constructor(props: {}) {
    super(props);
    this.state = {
      indoorLevel: '1',
      currentScreen:'map',
      initializedLocation: {
        latitude: 35.46588771428577,
        longitude: 139.62227088041905,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      movieMarkers: [{
        floor: 'B1',
        movieId: 1,
        latitude: 35.465821301223436,
        longitude: 139.62295688688755,
      }, {
        floor: 'B1',
        movieId: 2,
        latitude: 35.46571343866254,
        longitude: 139.62286870926619,
      }, {
        floor: 'B1',
        movieId: 3,
        latitude: 35.465792082771856,
        longitude: 139.62272554636002,
      }, {
        floor: 'B1',
        movieId: 4,
        latitude: 35.465903768197734,
        longitude: 139.62255354970694,
      }, {
        floor: 'B1',
        movieId: 5,
        latitude: 35.466043852632446,
        longitude: 139.6223419904709,
      }, {
        floor: 'B1',
        movieId: 6,
        latitude: 35.46616127214609,
        longitude: 139.6221974864602,
      }, {
        floor: 'B1',
        movieId: 7,
        latitude: 35.46594281709978,
        longitude: 139.62197788059711,
      }, {
        floor: 'B3',
        movieId: 8,
        latitude: 35.46597258163476,
        longitude: 139.62195876985788,
      }],
      toiletMarkers: [{
        floor: 'B1',
        latitude: 35.46549853231885,
        longitude: 139.62226923555136,
      }],
      elevatorMarkers: [{
        floor: 'B1',
        capacity: 6,
        latitude: 35.46598896577774,
        longitude: 139.62186254560947,
      }, {
        floor: 'B2',
        capacity: 6,
        latitude: 35.466408671769514,
        longitude: 139.62231114506721,
      }, {
        floor: 'B3',
        capacity: 12,
        latitude: 35.46599115032989,
        longitude: 139.62186221033335,
      }, {
        floor: 'B2',
        capacity: 6,
        latitude: 35.46600043467584,
        longitude: 139.6218601986766,
      }, {
        floor: 'B2',
        capacity: 6,
        latitude: 35.467070038770146,
        longitude: 139.62299410253763,
      }, {
        floor: 'B3',
        capacity: 6,
        latitude: 35.46662521408242,
        longitude: 139.62260585278273,
      }, {
        floor: 'B3',
        capacity: 6,
        latitude: 35.46662521408242,
        longitude: 139.62260585278273,
      }, {
        floor: 'B1',
        capacity: 6,
        latitude: 35.4662273546807,
        longitude: 139.62275706231594,
      }, {
        floor: 'B1',
        capacity: 12,
        latitude: 35.46601927643347,
        longitude: 139.62302025407553,
      }, {
        floor: 'B1',
        capacity: 12,
        latitude: 35.4659865081565,
        longitude: 139.62323047220707,
      }, {
        floor: 'B1',
        capacity: 12,
        latitude: 35.46614024587368,
        longitude: 139.62289653718472,
      }, {
        floor: 'B1',
        capacity: 12,
        latitude: 35.4663073636272,
        longitude: 139.6226128935814,
      }],
      guideLines:[{
        floor: 'B1',
        latitude: 35.465821301223436,
        longitude: 139.62295688688755,
      }, {
        floor: 'B1',
        latitude: 35.46571343866254,
        longitude: 139.62286870926619,
      }, {
        floor: 'B1',
        latitude: 35.465792082771856,
        longitude: 139.62272554636002,
      }, {
        floor: 'B1',
        latitude: 35.465903768197734,
        longitude: 139.62255354970694,
      }, {
        floor: 'B1',
        latitude: 35.466043852632446,
        longitude: 139.6223419904709,
      }, {
        floor: 'B1',
        latitude: 35.46616127214609,
        longitude: 139.6221974864602,
      }, {
        floor: 'B1',
        latitude: 35.46594281709978,
        longitude: 139.62197788059711,
      }, {
        floor: 'B1',
        latitude: 35.46598896577774,
        longitude: 139.62186254560947,
      }, {
        floor: 'B3',
        latitude: 35.46599115032989,
        longitude: 139.62186221033335,
      }, {
        floor: 'B3',
        latitude: 35.46597258163476,
        longitude: 139.62195876985788,
      }],
    };
  }

  public render() {
    return (
      <View>
        <View style={styles.container}>
          <MainWindow
            initializedLocation={this.state.initializedLocation}
            indoorLevel={this.state.indoorLevel}
            movieMarkers={this.state.movieMarkers}
            toiletMarkers={this.state.toiletMarkers}
            elevatorMarkers={this.state.elevatorMarkers}
            guideLines={this.state.guideLines}
            screenChange={this.screenChange.bind(this)}
            currentScreen={this.state.currentScreen}
            changeIndoorLevel={this.changeIndoorLevel.bind(this)}
          />
        </View>
        {/* <View>
            <SubWindow
              currentScreen={this.state.currentScreen}
              indoorLevel={this.state.indoorLevel}
              initializedLocation={this.state.initializedLocation}
              guideLines={this.state.guideLines}
              screenChange={this.screenChange.bind(this)}
              changeIndoorLevel={this.changeIndoorLevel.bind(this)}
            />
        </View> */}
      </View>
    );
  }

  private screenChange(currentScreen: 'video' | 'map') {
    this.setState({ currentScreen: currentScreen });
  }

  private changeIndoorLevel(indoorLevel: string) {
    const validatedIndoorLevel = indoorLevel.replace(/階/, '');
    const currentFloor = validatedIndoorLevel.substr(-2);
    this.setState({ indoorLevel: currentFloor });
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
  },
  container: {
    marginTop: -44,
  },
});
