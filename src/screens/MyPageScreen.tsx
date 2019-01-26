import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import ExtButton from '../components/screenComponents/ExtButton';
import MonoText from '../components/StyledText';

interface Props { navigation: any; }

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
        <View style={mainStyle.checkListContainer}>
          <View style={mainStyle.checkListItem}>
            <Text style={mainStyle.checkListText}>車椅子</Text>
            <View style={checkButtonStyle.checkButtonList}>
              <TouchableOpacity style={checkButtonStyle.wheelchairButton}>
                <Text style={checkButtonStyle.wheelchairButtonText}>自走式</Text>
              </TouchableOpacity>
              <TouchableOpacity style={checkButtonStyle.wheelchairButton}>
                <Text style={checkButtonStyle.wheelchairButtonText}>自走式</Text>
              </TouchableOpacity>
              <TouchableOpacity style={checkButtonStyle.wheelchairButton}>
                <Text style={checkButtonStyle.wheelchairButtonText}>自走式</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={mainStyle.checkListLastItem}>
            <Text style={mainStyle.checkListText}>介助者</Text>
            <View style={checkButtonStyle.checkButtonList}>
              <TouchableOpacity style={checkButtonStyle.helperButton}>
                <Text style={checkButtonStyle.helperButtonText}>あり</Text>
              </TouchableOpacity>
              <TouchableOpacity style={checkButtonStyle.helperButton}>
                <Text style={checkButtonStyle.helperButtonText}>なし</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ExtButton
          buttonText={'情報登録'}
          navigate={this.props.navigation.navigate}
          pageName={'MyPage'}
        />
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
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  informationText: {
    fontSize: '1.1rem',
    lineHeight: '1.7rem',
    fontWeight: '700',
    color: Color.black,
  },
});

const mainStyle = EStyleSheet.create({
  checkListContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: '2.5rem',
    borderRadius: '0.3rem',
    backgroundColor: Color.white,
  },
  checkListItem: {
    width: '90%',
    height: '5.8rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
  },
  checkListLastItem: {
    width: '90%',
    height: '5.8rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderColor: Color.subColorGray,
    borderTopWidth: 1,
  },
  checkListText: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: Color.black,
    marginLeft: '0.5rem',
    marginRight: '1.5rem',
  },
});

const checkButtonStyle = EStyleSheet.create({
  checkButtonList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelchairButton: {
    width: '4.3rem',
    height: '4.3rem',
    marginLeft: '0.2rem',
    marginRight: '0.2rem',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderColor: Color.mainColor,
    borderWidth: 2,
    borderRadius: '0.3rem',
  },
  wheelchairButtonText: {
    color: Color.black,
    fontWeight: '700',
    fontSize: '0.9rem',
    letterSpacing: '0.07rem',
  },
  helperButton: {
    width: '6rem',
    height: '2.3rem',
    marginLeft: '0.3rem',
    marginRight: '0.3rem',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderColor: Color.mainColor,
    borderWidth: 2,
    borderRadius: 50,
  },
  helperButtonText: {
    color: Color.mainColor,
    fontWeight: '700',
    fontSize: '1.1rem',
  },
});
