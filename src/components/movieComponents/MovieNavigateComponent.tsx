import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Video,
  PlaybackStatus,
  Asset,
  PlaybackObject,
} from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import NavigationPlate from '../../components/NavigationPlate';
import ThumbnailList from './ThumbnailListComponent';
import ControlBar from './ControlBarComponent';

interface Props {}

interface State {
  visibleGuideHeader: boolean;
  paused : boolean;
  positionMillis: number;
  durationMillis : number;
  thumbnails: string[];
}

export default class MovieNavigateComponent extends  React.Component<Props, State> {
  private videoRef : Video;

  constructor(props: Props) {
    super(props);
    this.state = {
      visibleGuideHeader: true,
      paused: true,
      positionMillis: 0,
      durationMillis: 0,
      // dummy data
      thumbnails: ['OwSekWSe7NM', 'OwSekWSe7NM', 'OwSekWSe7NM', 'OwSekWSe7NM'],
    };
  }

  private touchScreen = () => this.setState({ visibleGuideHeader : !this.state.visibleGuideHeader });

  private onLoadVideo = (playbackStatus: PlaybackStatus) => this.setState({ durationMillis: playbackStatus.durationMillis });

  private onPlaybackStatusUpdate = (playbackStatus: PlaybackStatus) => {
    this.setState({ positionMillis: playbackStatus.positionMillis });
    if (playbackStatus.didJustFinish) {
      // 動画とシークバーの再初期化
      this.videoRef.stopAsync();
      this.setState({ paused: true });
      return;
    }
  }

  private pressPlayPause = () => {
    if (this.state.paused) {
      this.videoRef.playAsync();
    }else{
      this.videoRef.pauseAsync();
    }
    this.setState({ paused: !this.state.paused });
  }

  private greeting = (visibleGuideHeader: boolean) => {
    if(visibleGuideHeader){
      return (
        <View style={styles.content__navi}>
          <NavigationPlate
            stationName={'横浜駅'}
            startGateName={'JR/中央改札'}
            endGateName={'相鉄線/2F改札'}
          />
        </View>
      );
    }
    return (
      <View style={styles.content__video_footer}>
        <View style={styles.content__control_bar}>
          <ControlBar
            paused={this.state.paused}
            positionMillis={this.state.positionMillis}
            progress={this.state.positionMillis / this.state.durationMillis ? this.state.positionMillis / this.state.durationMillis : 0}
            pressPlayPause={this.pressPlayPause.bind(this)}
          />
        </View>
        <View style={styles.content__thumbnails}>
          <ThumbnailList thumbnails={this.state.thumbnails} />
        </View>
      </View>
    );
  }

  public render() {
    return(
      <View style={styles.content_wrap}>
        <TouchableOpacity style={styles.header__controller_back_wrap} onPress={()=>alert('hoge')}>
          <Text style={styles.header__controller_back_text}>＜案内終了</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.header__sub_window_circle} />
        <View style={styles.content__movie_wrap}>
          <TouchableWithoutFeedback onPress={this.touchScreen.bind(this)} style={styles.content__movie_wrap} >
            <Video
              // source={{ uri: 'https://haduki1208-app.firebaseapp.com/tatenaga_4_3.mp4' }}
              source={{ uri: Asset.fromModule(require('../../../assets/movie/kt01.mp4')).uri }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={Video.RESIZE_MODE_COVER}
              style={styles.content__movie}
              progressUpdateIntervalMillis={1000 / 20} // 20fps 
              onLoad={this.onLoadVideo.bind(this)}
              onPlaybackStatusUpdate={this.onPlaybackStatusUpdate.bind(this)}
              ref={(ref: any) => { this.videoRef = ref; }}
            />
          </TouchableWithoutFeedback>
        </View>
        {this.greeting(this.state.visibleGuideHeader)}
      </View>
    );
  }
}

EStyleSheet.build({});
const styles = EStyleSheet.create({
  content_wrap: {
    flex: 1,
    top: 0,
    position: 'relative',
  },
  header__controller_back_wrap: {
    width:'40%',
    height: '10%',
    top: '5%',
    justifyContent: 'center',
  },
  header__controller_back_text: {
    fontSize: '1.2rem',
    fontWeight: '600',
    top: 0,
    color: 'white',
  },
  content__movie_wrap: {
    flex: 1,
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
    backgroundColor: 'black',
  },
  content__movie: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: '-8rem',
  },
  content__navi: {
    flex: 0.1,
    padding: 2,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    opacity: 0.5,
    backgroundColor: 'black',
  },
  content__video_footer: {
    flex: 0.1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
  },
  content__control_bar: {
    flex: 1,
  },
  content__thumbnails: {
    flex: 1,
  },
});
