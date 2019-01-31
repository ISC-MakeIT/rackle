import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Video,
  PlaybackStatus,
  Asset,
} from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import NavigationPlate from '../../components/NavigationPlate';
import VideoPlayer from '@expo/videoplayer';
import { Ionicons } from '@expo/vector-icons';

interface Props {}

interface State {
  thumbnails: string[];
}

export default class MovieNavigateComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      thumbnails: ['OwSekWSe7NM', 'OwSekWSe7NM', 'OwSekWSe7NM', 'OwSekWSe7NM'],
    };
  }

  private playbackCallback = (playbackStatus: PlaybackStatus) => {
    if (playbackStatus.didJustFinish) {
      return;
    }
  }

  private playIcon = () => ( <Ionicons name={'ios-play'} size={36} color={"#FFFFFF"} style={{ textAlign: 'center' }} /> );
  private pauseIcon = () => ( <Ionicons name={'ios-pause'} size={36} color={"#FFFFFF"} style={{ textAlign: 'center' }} /> );

  public render() {
    return(
      <View style={styles.content_wrap}>
        <TouchableOpacity style={styles.header__controller_back_wrap} onPress={()=>alert('hoge')}>
          <Text style={styles.header__controller_back_text}>＜案内終了</Text>
        </TouchableOpacity>
        <View style={styles.content__movie_wrap}>
          <VideoPlayer
            videoProps={{
              // source: { uri: 'https://haduki1208-app.firebaseapp.com/tatenaga_4_3.mp4', },
              source: { uri: Asset.fromModule(require('../../../assets/movie/kt01.mp4')).uri, },
              resizeMode: Video.RESIZE_MODE_COVER,
            }}
            playIcon={this.playIcon}
            pauseIcon={this.pauseIcon}
            thumbImage={require('../../../assets/images/thumb.png')}
            trackImage={require('../../../assets/images/track.png')}
            textStyle={{
              color: "#FFFFFF",
              fontSize: 12,
            }}
            showFullscreenButton={false}
            playFromPositionMillis={0}
            playbackCallback={this.playbackCallback}
          />
        </View>
        <View style={styles.content__navi}>
          <NavigationPlate
            stationName={'横浜駅'}
            startGateName={'JR/中央改札'}
            endGateName={'相鉄線/2F改札'}
          />
        </View>
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
    height: '100%',
    width: '100%',
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
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  content__movie: {
    height: '100%',
    width: '100%',
  },
  content__navi: {
    flex: 1,
    padding: 2,
    position: 'absolute',
    top: 0,
    width: '100%',
    opacity: 0.8,
    backgroundColor: 'black',
  },
  content__video_footer: {
    flex: 1,
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
