

import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient, Video } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../constants/Colors';
export default class MyComponent extends Component {
  public static navigationOptions = {
    headerStyle: {
      display: 'none',
    },
  };

  private movieItem = () => {
    return(
        <Video
          source={{ uri: 'https://haduki1208-app.firebaseapp.com/tatenaga_4_3.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.content__movie}
        />
    );
  }

  public static navigationOptions = (navigation: any) => {
    return {
      title: 'GuideScreen',
      header: () => (
          <View style={guideHeaderStyle.container}>
            <View style={guideHeaderStyle.leftContainer}>
              <Text style={guideHeaderStyle.stationName}>横浜駅</Text>
              <View style={guideHeaderStyle.routeContainer}>
                <TouchableOpacity style={guideHeaderStyle.gateNameContainer}>
                  <Text style={guideHeaderStyle.gateName}>JR/中央改札</Text>
                </TouchableOpacity>
                <View style={guideHeaderStyle.routeOptions}>
                  <Text style={guideHeaderStyle.routeOptionText}>▶︎▶︎▶︎</Text>
                </View>
                <TouchableOpacity style={guideHeaderStyle.gateNameContainer}>
                  <Text style={guideHeaderStyle.gateName}>相鉄線/2F改札</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),
    };

  public render() {
    return(
      <View style={styles.content_wrap}>
        <TouchableOpacity style={styles.header__controller_back_wrap} onPress={()=>alert('hoge')}>
          <Text style={styles.header__controller_back_text}>＜案内終了</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.header__sub_window_circle} />
                
        <View style={styles.content__movie_wrap}>
            {this.movieItem()}
        </View>
        <View style={styles.content__navi}></View>
      </View>
    );
  }
}


EStyleSheet.build({});

const styles = EStyleSheet.create({
  content_wrap: {flex: 1, top: 0, position: 'relative',},
  content__header: {flex: 1, padding: 20, top: '5%', backgroundColor: 'yellow',},
  content__movie_wrap: {position: 'relative', top: 0, height: '100%', width: '100%', zIndex: -1, backgroundColor: 'blue',},
  content__movie: {flex: 1, justifyContent: 'flex-start', margin: '-8rem',},
  content__navi: {flex: 0.1, padding: 20, position: 'absolute', bottom: 0, width: '100%', opacity: 0.5, backgroundColor: 'yellow',},
  header__controller_back_wrap: {width:'40%', height: '10%', top: '5%', justifyContent: 'center', backgroundColor: 'blue',},
  header__controller_back: {alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10},
  header__controller_back_text: {fontSize: '1.2rem', fontWeight: '600', top: 0, color: 'white',},
  header__sub_window_circle: {width: '8rem', height: '8rem', borderRadius: '4rem', position: 'absolute', alignItems: 'center', justifyContent: 'center', right: 10, top: 10, elevation: 8, backgroundColor: 'skyblue',},
});

const guideHeaderStyle = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    marginTop: getStatusBarHeight(),
    justifyContent: 'flex-start',
    backgroundColor: Color.black,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
  },
  stationName: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: '1rem',
    lineHeight: 30,
  },
  gateNameContainer: {
    backgroundColor: 'white',
    height: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  gateName: {
    lineHeight: 20,
    fontSize: '0.7rem',
  },
  routeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  routeOptionText: {
    fontSize: '0.7rem',
    color: Color.subColorRed,
    lineHeight: 30,
    paddingRight: 0.5,
  },
});