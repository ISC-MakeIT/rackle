import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';
import {
  Video,
  PlaybackStatus
} from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../constants/Colors';
import NavigationPlate from '../components/NavigationPlate';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from 'react-native-progress/Bar';

const dummyThumbnails = ['OwSekWSe7NM', 'OwSekWSe7NM', 'OwSekWSe7NM', 'OwSekWSe7NM', 'OwSekWSe7NM'];

interface State {
  visibleGuideHeader: boolean;
  paused : boolean;
  durationMillis : number;
  progress: number;
}

export default class MovieNavigate extends  React.Component<Props, State> {
  private player : Video;

  public static navigationOptions = {
    headerStyle: {
      display: 'none',
    },
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      visibleGuideHeader: true,
      paused: true,
      durationMillis: 0,
      progress: 0,
    };
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
          {this.controlBar()}
        </View>
        <View style={styles.content__thumbnails}>
          {this.thumbnailList()}
        </View>
      </View>          
    );
  }

  private controlBar = () => {
    return (
      <View style={controlBarStyle.controls}>
        <TouchableOpacity
          onPress={() => {
            this.setState({ paused: !this.state.paused });
            if (this.state.paused) {
              this.player.playAsync();
            }else{
              this.player.pauseAsync();
            }
          }}
        >
          <Ionicons name={this.state.paused ? 'ios-play' : 'ios-pause' } size={40} color='#FFF' />             
        </TouchableOpacity>
        <TouchableWithoutFeedback>
          <ProgressBar
            progress={this.state.progress}
            color={'#FFF'}
            unfilledColor={'rgba(255, 255, 255, 0.5)'}
            borderColor={'#FFF'}
            height={16}
          />
        </TouchableWithoutFeedback>
        <Text style={controlBarStyle.seekTime}>
          00:00
        </Text>
      </View>
    );
  }

  private thumbnailList = () => {
    return (
      <FlatList
        data={dummyThumbnails}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={index !== dummyThumbnails.length - 1 ? {paddingRight: 4}: {}}>
            <TouchableOpacity>
              <Image style={thumbnailsStyle.image} source={{ uri: `http://i.ytimg.com/vi/${item}/default.jpg` }} />
            </TouchableOpacity>
          </View>
        )}
        style={thumbnailsStyle.thumbnails}
      />
    );
  }

  private movieItem = () => {
    return(
      <Video
        source={{ uri: 'https://haduki1208-app.firebaseapp.com/tatenaga_4_3.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_COVER}
        style={styles.content__movie}
        paused={this.state.paused}
        progressUpdateIntervalMillis={1000 / 30} // 30fps 
        onLoad={(playbackStatus: PlaybackStatus) => {
          this.setState({ durationMillis: playbackStatus.durationMillis });
        }}
        onPlaybackStatusUpdate={(playbackStatus: PlaybackStatus) => {
          if (playbackStatus.didJustFinish) {
            // 動画とシークバーの再初期化
            this.setState({ paused: true });
            this.player.setPositionAsync(0);
            return;
          }
          const progress : number = playbackStatus.positionMillis / this.state.durationMillis;
          if(progress){
            this.setState({ progress });
          }else if(progress === 0){
            this.setState({ progress : 0 });
          }
        }}
        ref={(ref: any) => { this.player = ref; }}
      />
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
          <TouchableWithoutFeedback onPress={() => { this.setState({ visibleGuideHeader : !this.state.visibleGuideHeader }); }} style={styles.content__movie_wrap} >
            {this.movieItem()}
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
  header__sub_window_circle: {
    width: '8rem', 
    height: '8rem', 
    borderRadius: '4rem', 
    position: 'absolute', 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 6, 
    top: 20, 
    elevation: 8, 
    backgroundColor: 'skyblue',
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
    backgroundColor: 'blue',
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

const controlBarStyle = EStyleSheet.create({
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 40,
    left: 0,
    right: 0,
    bottom: 90,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  seekTime: {
    color: Color.white,
  },
});

const thumbnailsStyle = EStyleSheet.create({
  thumbnails: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 90,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  image: {
    width: 120,
    height: 90,
  },
});