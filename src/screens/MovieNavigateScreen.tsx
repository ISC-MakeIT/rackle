import { Constants } from 'expo';
import * as React from 'react';
import { Alert, FlatList, Image, Platform, TouchableOpacity, View, WebView, } from 'react-native';
import { MonoText } from '../components/StyledText';
import MovieNavigateStyle from './MovieNavigateScreen.scss';

// ダミーデータ
const playlistId = 'PLL4UBL_GFXMlMjpCQdOKEUw_GT7AFB-SX';
const playlistYoutubeIds = ['uS00Bd9ZVz4', '9iieMHXubJU', '_Hdk2vXESB0', 'X8p0y5KXdIk', 'yYbWPRuxK1U', '33Np_lJseBE', 'z3VW7TNklww', 'tNMatlAOOcs', 'EyT0uC1D1I8', 'bxG4LTsLThE'];
export default class MovieNavigateScreen extends React.Component {
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
  private renderItem = ({ item, index }) => (
    <View style={{ padding: 4 }}>
      <TouchableOpacity onPress={event => this.onPress(item, index)} >
        <Image style={MovieNavigateStyle.thumbnailImage} source={{ uri: `http://i.ytimg.com/vi/${item}/default.jpg` }} />
      </TouchableOpacity>
    </View>
  )

  /**
   * FlatViewを描画
   */
  private renderList = () => (
    <FlatList data={playlistYoutubeIds} renderItem={this.renderItem} horizontal={true} keyExtractor={(item, index) => index.toString()} />
  )

  public render() {
    return (
      <View style={MovieNavigateStyle.container}>
        <WebView source={{ uri: this.state.youtubeURL }} scrollEnabled={false} allowsInlineMediaPlayback={true} useWebKit={Platform.OS === 'ios'} onMessage={this.onMessage} />
        {this.renderList()}
      </View>
    );
  }
}
