import * as React from 'react';
import { Text, View, StyleSheet, ColorPropType } from 'react-native';
import { MonoText } from '../components/StyledText';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class MyPageScreen extends React.Component {
  public static navigationOptions = {
    title: 'マイページ',
    headerStyle: {
      backgroundColor: '#63BF8E',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#ffffff',
    },
  };

  public render() {
    return (
      <View style={styles.container}>
        <View style={headerStyle.container}>
          <Text style={headerStyle.informationText}>あなたの情報を登録してください</Text>
          <Text style={headerStyle.informationText}>より最適なルート案内に役立てます</Text>
        </View>
      </View>
    );
  }
}

EStyleSheet.build();

const styles = EStyleSheet.create({
  container: {
    minHeight: '100%',
    flexDirection: 'column',
    backgroundColor: Color.subColorIvory,
  },
});

const headerStyle = EStyleSheet.create({
  container: {
    marginTop: '2rem',
    marginBottom: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  informationText: {
    fontSize: '1.1rem',
    lineHeight: '1.7rem',
    fontWeight: '700',
  },
});
