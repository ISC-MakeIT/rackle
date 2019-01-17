import { Constants } from 'expo';
import * as React from 'react';
import {
  View,
  WebView,
  Platform,
  Alert,
  FlatList,
  Image,
  TouchableOpacity 
} from 'react-native';
import { MonoText } from "../components/StyledText";
import MovieNavigateStyle from "./MovieNavigateScreen.scss";

// ダミーデータ
const playlistId = "PLL4UBL_GFXMlMjpCQdOKEUw_GT7AFB-SX";
const playlistYoutubeIds = ["uS00Bd9ZVz4", "9iieMHXubJU", "_Hdk2vXESB0", "X8p0y5KXdIk", "yYbWPRuxK1U", "33Np_lJseBE", "z3VW7TNklww", "tNMatlAOOcs", "EyT0uC1D1I8", "bxG4LTsLThE"];
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // cacheはキャッシュしたhtmlを読み込ませないため、playlistIdはyoutubeプレイヤーの初期値を送る
      youtubeURL: `https://haduki1208-app.firebaseapp.com/youtube.html?cache=${new Date().getTime()}&playlistId=${playlistId}`,
    }
  }

  /**
   * for initialization 
   */
  public static navigationOptions = {
    header: null,
  };

  /**
   * youtubeプレイヤーの状態を表示
   */
  private onMessage = event => Alert.alert("youtube info", event.nativeEvent.data);

  /**
   * youtubeIDと画像のindexを表示
   */
  private onPress = (item, index) => Alert.alert("render item", [`youtube id: ${item}`, `index: ${index}`].join("\n"));

  /**
   * ListViewの内容を描画
   */
  private renderItem = ({item, index}) => (
    <View style={{padding: 4}}>
      <TouchableOpacity onPress={event => this.onPress(item, index)} >
        <Image style={MovieNavigateStyle.thumbnailImage} source={{uri: `http://i.ytimg.com/vi/${item}/default.jpg`}} />
      </TouchableOpacity>
    </View>
  );


  /**
   * flatviewを描画
   */
  private renderList = () => (
    <FlatList
      data={playlistYoutubeIds}
      renderItem={this.renderItem}
      horizontal={true}
      keyExtractor={(item,index) => index.toString()}
    />
  );

  public render() {
    return (
      <View style={MovieNavigateStyle.container}>
        <WebView
          source={{uri: this.state.youtubeURL}}
          scrollEnabled={false}
          allowsInlineMediaPlayback={true} // 動画のインライン再生を有効にする
          useWebKit={Platform.OS === 'ios'}
          onMessage={this.onMessage}
        />
        {this.renderList()}
      </View>
    );
  }
}