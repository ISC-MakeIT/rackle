import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { MonoText } from '../components/StyledText';

export default class MyPageScreen extends React.Component {
  public static navigationOptions = { title: 'mypage' };

  public render() {
    return (
      <View style={styles.container}>
        <View>
          <MonoText>screens/myPageScreen</MonoText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
  },
});
