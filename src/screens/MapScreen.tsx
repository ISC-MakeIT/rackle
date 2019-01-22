import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapViewComponent from '../components/mapComponents/MapViewComponent';
import SubWindow from '../components/SubWindow';

interface State {
  indoorLevel: string;
  initializedLocation: InitializedLocation;
  movieMarkers?: MovieMarkers[];
  publicFacilityMarkers?: PublicFacilityMarkers[];
  guideLines: guideLines[];
}

interface MovieMarkers {
  floor: string;
  movieId: number;
  latitude: number;
  longitude: number;
}

interface PublicFacilityMarkers {
  floor: string;
  type: 'toilet' | 'elevator';
  latitude: number;
  longitude: number;
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


export default class MapScreen extends React.Component<{}, State> {
  public static navigationOptions = {
    headerStyle: {
      display: 'none',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      indoorLevel: '1',
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
      publicFacilityMarkers: [{
        floor: 'B1',
        type: 'toilet',
        latitude: 35.46598896577774,
        longitude: 139.62186254560947,
      }, {
        floor: 'B2',
        type: 'toilet',
        latitude: 35.46571562322217,
        longitude: 139.62188635021448,
      }, {
        floor: 'B2',
        type: 'toilet',
        latitude: 35.466379726599,
        longitude: 139.6222296729684,
      }, {
        floor: 'B3',
        type: 'toilet',
        latitude: 35.46599115032989,
        longitude: 139.62186221033335,
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
      }, {
        floor: 'B3',
        latitude: 35.46622462399851,
        longitude: 139.62239295244217,
      }],
    };
  }

  public render() {
    return (
      <View style={styles.map}>
        <MapViewComponent
          indoorLevel={this.state.indoorLevel}
          initializedLocation={this.state.initializedLocation}
          movieMarkers={this.state.movieMarkers}
          publicFacilityMarkers={this.state.publicFacilityMarkers}
          guideLines={this.state.guideLines}
        />
        <View>
          <SubWindow
            currentScreen={'video'}
            indoorLevel={this.state.indoorLevel}
            initializedLocation={this.state.initializedLocation}
            guideLines={this.state.guideLines}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
  },
});
