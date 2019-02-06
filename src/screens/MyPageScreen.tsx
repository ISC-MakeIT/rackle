import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ExtButton } from '../components/ExtButton';
import wheelchairSelf from '../../assets/images/user_setting_icon_1_0.png';
import wheelchairHelper from '../../assets/images/user_setting_icon_2_0.png';
import wheelchairTilt from '../../assets/images/user_setting_icon_3_0.png';

interface Props {
  navigation: any;
  active: boolean;
 }

export default class MyPageScreen extends React.Component<Props, {}> {
  updateActiveSelector = () => this.setState({ active: true});
  
  public static navigationOptions = {
    title: 'マイページ',
    headerStyle: {
      backgroundColor: Color.mainColor,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#ffffff',
    },
  };

  public render() {
  const btnColor = this.props.active ? { backgroundColor: Color.mainColor } : { backgroundColor: Color.white };
    return (
      <View style={styles.container}>
        <View style={headerStyle.container}>
          <Text style={headerStyle.informationText}>あなたの情報を登録してください</Text>
          <Text style={headerStyle.informationText}>より最適なルート案内に役立てます</Text>
        </View>
        <View style={mainStyle.checkListContainer}>
          <View style={mainStyle.checkListItem}>
            <View style={mainStyle.checkListLabel}>
              <Text style={mainStyle.checkListText}>車椅子</Text>
            </View>
            <View style={checkButtonStyle.checkButtonList}>
              <TouchableOpacity style={checkButtonStyle.wheelchairButton}>
                <Image source={wheelchairSelf} style={checkButtonStyle.iconImage}/>
                <Text style={checkButtonStyle.wheelchairButtonText}>自走式</Text>
              </TouchableOpacity>
              <TouchableOpacity style={checkButtonStyle.wheelchairButton}>
                <Image source={wheelchairHelper} style={checkButtonStyle.iconImage}/>
                <Text style={checkButtonStyle.wheelchairButtonText}>介助用</Text>
              </TouchableOpacity>
              <TouchableOpacity style={checkButtonStyle.wheelchairButton}>
                <Image source={wheelchairTilt} style={checkButtonStyle.iconImage}/>
                <Text style={checkButtonStyle.wheelchairButtonText}>ティルト</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={mainStyle.checkListLastItem}>
            <View style={mainStyle.checkListLabel}>
              <Text style={mainStyle.checkListText}>介助者</Text>            
            </View>
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
    width: '92%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2.5rem',
    borderRadius: '0.3rem',
    backgroundColor: Color.white,
  },
  checkListItem: {
    width: '100%',
    height: '6.3rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
  },
  checkListLastItem: {
    width: '100%',
    height: '6.3rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderColor: Color.subColorGray,
    borderTopWidth: 1,
  },
  checkListLabel: {
    width: '20%',
    textAlign: 'center',
    paddingLeft: '0.3rem',
    // backgroundColor: Color.mainColor,
  },
  checkListText: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: Color.black,
  },
});

const checkButtonStyle = EStyleSheet.create({
  checkButtonList: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelchairButton: {
    width: '4.5rem',
    height: '4.5rem',
    marginLeft: '0.6rem',
    // marginRight: '0.3rem',
    flexDirection: 'column',
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
    letterSpacing: '0.08rem',
  },
  iconImage: {
    width: '2.6rem',
    height: '2.6rem',
    marginBottom: '0.3rem',
  },
  helperButton: {
    width: '7rem',
    height: '2.3rem',
    marginLeft: '0.6rem',
    // marginRight: '0.4rem',
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
