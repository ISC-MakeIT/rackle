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


// ダミーデータ
const playlistId = 'PLL4UBL_GFXMlMjpCQdOKEUw_GT7AFB-SX';
const playlistYoutubeIds = [
  'uS00Bd9ZVz4', '9iieMHXubJU', '_Hdk2vXESB0', 'X8p0y5KXdIk',
  'yYbWPRuxK1U', '33Np_lJseBE', 'z3VW7TNklww', 'tNMatlAOOcs',
  'EyT0uC1D1I8', 'bxG4LTsLThE',
];

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

  /**
   * ListViewの内容を描画
   */
  private renderItem = ({item, index}) => (
    <View style={{ padding: 4 }}>
      <TouchableOpacity onPress={event => this.onPress(item, index)} >
        <Image style={{height: 90, width: 120,}} source={{ uri: `http://i.ytimg.com/vi/${item}/default.jpg` }} />
      </TouchableOpacity>
    </View>
  )

  /**
   * FlatViewを描画
   */
  private renderList = () => (
    <FlatList
      data={playlistYoutubeIds}
      renderItem={this.renderItem}
      horizontal={true}
      keyExtractor={(item, index) => index.toString()}
    />
  )

  public render() {
    const { width, height: screenHeight } = Dimensions.get('window');
    const height = width * 0.5625;
    return (
      <View style={styles.column}>
        <Text style={styles.header}>Welcome to Extended StyleSheet!</Text>
      </View>
    );
  }
}

EStyleSheet.build();

const styles = EStyleSheet.create({
  header: {
    fontSize: '1.5rem',
    color: '#ff0000',
    textAlign: 'center',
  },
  column: {
    width: '80%',
    height: '60%',
    marginHorizontal: '10%',
    marginTop: '20%',
    backgroundColor: 'yellow',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
  }
});
