import * as React from 'react';
import { View } from 'react-native';
import { MonoText } from '../components/StyledText';
import myPageStyle from '../stylesheets/MypageScreen.scss';

export default class MyPageScreen extends React.Component {
  public static navigationOptions = { title: 'mypage' };

  public render() {
    return (
      <View style={myPageStyle.container}>
        <View>
          <MonoText>screens/mypageScreen</MonoText>
        </View>
      </View>
    );
  }
  
}