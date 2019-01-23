import * as React from 'react';
import { 
  Animated,
  AppRegistry,
  Dimensions,
  FlatList,
  Image,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Video from 'react-native-video';


// ダミーデータ
const playlistId = 'PLL4UBL_GFXMlMjpCQdOKEUw_GT7AFB-SX';
const playlistYoutubeIds = ['uS00Bd9ZVz4', '9iieMHXubJU', '_Hdk2vXESB0', 'X8p0y5KXdIk', 'yYbWPRuxK1U', '33Np_lJseBE', 'z3VW7TNklww', 'tNMatlAOOcs', 'EyT0uC1D1I8', 'bxG4LTsLThE',];

export default class MovieNavigateScreen extends React.Component {

  public static navigationOptions = {
    headerStyle: {
      display: 'none',
    },
  };
  
  constructor (props) {
    super(props);
    this.state = {
      // cacheはキャッシュしたhtmlを読み込ませないため、playlistIdはyoutubeプレイヤーの初期値を送る
      youtubeURL: `https://haduki1208-app.firebaseapp.com/youtube.html?cache=${new Date().getTime()}&playlistId=${playlistId}`,
    };
  }

  public render() {
    return (
      <View style={styles.movie_navigate}>
        <View style={styles.movie_navigate__play}>
          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: 300, height: 300 }}
          />
        </View>
        <View style={styles.movie_navigate__controller_wrap}>
        
          <TouchableOpacity>
            <Text style={styles.movie_naviate__controller_play}>再生</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.movie_naviate__controller_stop}>停止</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.movie_naviate__controller_seekbar}>シークバー</Text>
          </TouchableOpacity>        
          <Text style={styles.movie_naviate__controller_seekbar}>再生時間</Text>
        </View>
      </View>
    );
  }
}

EStyleSheet.build();

const styles = EStyleSheet.create({
  movie_navigate: {
    marginTop: '20%',
    width: '100%',
    height: 'auto',
    flex: 1,
    justifyContent: "flex-start",
  },
});

