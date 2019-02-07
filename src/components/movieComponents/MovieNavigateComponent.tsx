import * as React from 'react';
import {
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
import Color from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  setMovieModalVisible: () => void;
}

interface State {
  thumbnails: string[];
  isVisibleNavigationPlate: boolean;
}

export default class MovieNavigateComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      thumbnails: ['OwSekWSe7NM', 'OwSekWSe7NM', 'OwSekWSe7NM', 'OwSekWSe7NM'],
      isVisibleNavigationPlate: false,
    };
  }

  private playbackCallback = (playbackStatus: PlaybackStatus) => {
    if (playbackStatus.didJustFinish) {
      return;
    }
  }

  private playIcon = () => ( <Ionicons name={'ios-play'} size={36} color={Color.white} style={{ textAlign: 'center' }} /> );
  private pauseIcon = () => ( <Ionicons name={'ios-pause'} size={36} color={Color.white} style={{ textAlign: 'center' }} /> );

  private renderNavigationPlate = () => (this.state.isVisibleNavigationPlate) ? (
    <View style={styles.content__navi}>
      <NavigationPlate
        stationName={'横浜駅'}
        startGateName={'JR／中央改札'}
        endGateName={'相鉄線／2F改札'}
        caption={'JR中央南改札前'}
      />
    </View>
  ) : null;

  private showNavigationPlate = () => this.setState({isVisibleNavigationPlate: true});
  private hideNavigationPlate = () => this.setState({isVisibleNavigationPlate: false});

  public render() {
    return(
      <View style={styles.content_wrap}>
        <TouchableOpacity style={styles.header__controller_back_wrap} onPress={this.props.setMovieModalVisible}>
          <Ionicons name={'ios-close-circle'} size={40} color={Color.subColorGray} style={{ textAlign: 'center', opacity: 0.8 }} />
        </TouchableOpacity>
        <View style={styles.content__movie_wrap}>
          <VideoPlayer
            videoProps={{
              source: { uri: Asset.fromModule(require('../../../assets/movie/kt01.mp4')).uri, },
              resizeMode: Video.RESIZE_MODE_COVER,
            }}
            showControlsOnLoad={true}
            playIcon={this.playIcon}
            pauseIcon={this.pauseIcon}
            thumbImage={require('../../../assets/images/thumb.png')}
            trackImage={require('../../../assets/images/track.png')}
            textStyle={{
              color: Color.white,
              fontSize: 14,
            }}
            showFullscreenButton={false}
            playFromPositionMillis={0}
            playbackCallback={this.playbackCallback}
            showControlsCallback={this.showNavigationPlate}
            hideControlsCallback={this.hideNavigationPlate}
            hideControlsTimerDuration={5000}
          />
        </View>
        {this.renderNavigationPlate()}
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
    width: 40,
    height: 40,
    position: 'absolute',
    top: '5%',
    right: '5%',
    justifyContent: 'center',
  },
  content__movie_wrap: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
    backgroundColor: Color.black,
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
    bottom: 48,
    width: '100%',
  },
});
