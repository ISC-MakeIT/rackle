import {AppLoading, Asset, Font, Icon} from 'expo';
import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import AppNavigator from './navigation/AppNavigator';

interface Props {
  skipLoadingScreen: boolean;
}
interface State {
  isLoadingComplete: boolean;
}

export default class App extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  public render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading startAsync={this.loadResourcesAsync} onError={this.handleLoadingError} onFinish={this.handleFinishLoading} />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default'/>}
          <AppNavigator/>
        </View>
      );
    }
  }

  private loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/header-logo-image.png'),
        require('../assets/images/home_image.jpg'),
        require('../assets/images/changeIcon.png'),
        require('../assets/images/movie-load-icon.png'),
        require('../assets/images/user_setting_icon_1_0.png'),
        require('../assets/images/user_setting_icon_2_0.png'),
        require('../assets/images/user_setting_icon_3_0.png'),
        require('../assets/images/marker.png'),
        // ↓で読み込むと早いけど、なんかサイズが狂う
        // require('../assets/images/map-toilet-marker.png'),
        // require('../assets/images/map_movie_pointer.png'),
        // require('../assets/images/map-elevator-small-marker.png'),
        // require('../assets/images/map-elevator-big-marker.png'),
        // require('../assets/images/map-ticket-gate.png'),
        // require('../assets/images/map-movie-marker-check.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to remove
        // this if you are not using it in your app
        'MPLUS1p': require('../assets/fonts/MPLUS1p-Regular.ttf'),
        'MPLUS1p-Medium': require('../assets/fonts/MPLUS1p-Medium.ttf'),
        'MPLUS1p-Bold': require('../assets/fonts/MPLUS1p-Bold.ttf'),
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  }

  private handleLoadingError = (error: any) => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  }

  private handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
