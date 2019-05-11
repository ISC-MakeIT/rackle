import * as React from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ImageBackground} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import headerLogo from '../../assets/images/header-logo-image.png';
import { getTrainLines } from '../services/train_lines';
import { StationType, LineType } from '../domains/station';
import { Gate } from 'src/domains/gate';
import { getGates } from '../services/gates';
import swapIcon from '../../assets/images/changeIcon.png';
import { GateSelector } from '../components/GateSelector';
import homeImage from '../../assets/images/home_image.jpg';
import { SetButton } from '../components/SetButton';
import wheelchairSelf from '../../assets/images/user_setting_icon_1_0.png';
import wheelchairHelper from '../../assets/images/user_setting_icon_2_0.png';
import wheelchairTilt from '../../assets/images/user_setting_icon_3_0.png';


import * as _ from 'lodash';

interface State {
  station: StationType;
  lines: LineType;
  fromGates: Gate[];
  toGates: Gate[];
  selectedFromLineId: number | undefined;
  selectedToLineId: number | undefined;
  selectedFromGateId: number | undefined;
  selectedToGateId: number | undefined;
  text: string;
}

export default class InitSetScreen extends React.Component<Props, State> {
  public static navigationOptions = {
    headerStyle: { display: 'none' },
  };

  readonly state = {
    text: {1: '現在地と目的地をご選択ください', 2: 'お使いの車椅子を教えてください', 3: '介助者の有無を教えてください'},
    station: {'id': 1, 'name': '横浜'},
    lines: undefined,
    fromGates: undefined,
    toGates: undefined,
    selectedFromLineId: undefined,
    selectedToLineId: undefined,
    selectedFromGateId: undefined,
    selectedToGateId: undefined,
    stage: 1,
    btnText: '次へ進む',
    caregiver: undefined,
    wheelchair: undefined,
  };

  async componentDidMount () {
    // MEMO yokohama = 1
    // const data = await getStation();
    // const station = data.station![0];
    const lines = await getTrainLines(1); // yokohama id
    this.setState({
      station: lines.station,
      lines: lines.train_lines,
    });
  }

  public render() {
    let template;
    if (this.state.stage === 1) {
      template =
      <View style={containerStyles.searchFormContainer}>
        <View style={containerStyles.inputSetContainer}>
          <View style={containerStyles.inputContainer}>
            <View style={containerStyles.selectContainer}>
              <RNPickerSelect
                placeholder={{ label: '駅を選択してください', value: null, color: '#9EA0A4', }}
                items={this.castLineTypeToPickerItemType()}
                  onValueChange={(value: number) => {
                    this.setState({ selectedFromLineId: value });
                    this.updateFromGateIds(value);
                  }}
                style={{...inputPickerStyle}}
                value={this.state.selectedFromLineId}
                useNativeAndroidPickerStyle={false}
              />
              <View style={rootSelectStyle.titleLabelHere}>
                <Text style={rootTextStyle.colorHere}>現在</Text>
              </View>
            </View>

          <View style={containerStyles.searchedListContainer}>
            {this.fromGateSelectors()}
          </View>

        </View>
          <View style={containerStyles.inputContainer}>
            <View style={containerStyles.selectContainer}>
              <RNPickerSelect
                placeholder={{ label: '駅を選択してください', value: null, color: '#9EA0A4', }}
                items={this.castLineTypeToPickerItemType()}
                  onValueChange={(value: number) => {
                    this.setState({ selectedToLineId: value });
                    this.updateToGateIds(value);
                  }}
                style={{...inputPickerStyle}}
                value={this.state.selectedToLineId}
                useNativeAndroidPickerStyle={false}
              />
              <View style={rootSelectStyle.titleLabelDestination}>
                <Text style={rootTextStyle.colorDestination}>目的</Text>
              </View>
            </View>
            <View style={containerStyles.searchedListContainer}>
              {this.toGateSelectors()}
            </View>
          </View>
        </View>
        <TouchableOpacity style={ButtonStyle.switchButton} onPress={this.switchDestination}>
          <Image source={swapIcon} style={ButtonStyle.image}/>
        </TouchableOpacity>
      </View>;
    }

    if (this.state.stage === 2) {
      template =
      <View style={checkButtonStyle.checkButtonList}>
        <TouchableOpacity
          style={this.state.wheelchair === '自走式' ? checkButtonStyle.selectWheelchairButton : checkButtonStyle.wheelchairButton}
          onPress={() => this.changeWheelchair('自走式')}
        >
          <Image source={wheelchairSelf} style={checkButtonStyle.iconImage}/>
          <Text style={checkButtonStyle.wheelchairButtonText}>自走式</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.state.wheelchair === '介助用' ? checkButtonStyle.selectWheelchairButton : checkButtonStyle.wheelchairButton}
          onPress={() => this.changeWheelchair('介助用')}
        >
          <Image source={wheelchairHelper} style={checkButtonStyle.iconImage}/>
          <Text style={checkButtonStyle.wheelchairButtonText}>介助用</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.state.wheelchair === 'ティルト' ? checkButtonStyle.selectWheelchairButton : checkButtonStyle.wheelchairButton}
          onPress={() => this.changeWheelchair('ティルト')}
        >
          <Image source={wheelchairTilt} style={checkButtonStyle.iconImage}/>
          <Text style={checkButtonStyle.wheelchairButtonText}>ティルト</Text>
        </TouchableOpacity>
      </View>;
    }

    if (this.state.stage === 3) {
      template =
      <View style={checkButtonStyleJr.checkButtonList}>
        <TouchableOpacity
          style={this.state.caregiver === '介助者なし' ? checkButtonStyleJr.selectWheelchairButton : checkButtonStyleJr.wheelchairButton}
          onPress={() => this.changeCaregiver('介助者なし')}
        >
          <Image source={wheelchairSelf} style={checkButtonStyle.iconImages}/>
          <Text style={checkButtonStyleJr.wheelchairButtonText}>介助者なし</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.state.caregiver === '介助者あり' ? checkButtonStyleJr.selectWheelchairButton : checkButtonStyleJr.wheelchairButton}
          onPress={() => this.changeCaregiver('介助者あり')}
        >
          <Image source={wheelchairHelper} style={checkButtonStyle.iconImages}/>
          <Text style={checkButtonStyleJr.wheelchairButtonText}>介助用あり</Text>
        </TouchableOpacity>
      </View>;
    }
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={homeImage} style={{width: '100%', height: '130%', backgroundSize: 'cover'}}>
          <LinearGradient
            colors={['rgba(99, 191, 142, 0.85)', 'rgba(99, 191, 142, 0.85)', 'rgba(99, 191, 142, 0.85)']}
            style={gradationStyle.gradation}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <View style={{marginTop: 10}}>
            <View style={setStyle.logContainer}>
              <Image
                source={headerLogo}
                style={setStyle.logo}
              />
            </View>
            <View style={setStyle.textContainer}>
              <Text style={setStyle.text}>駅構内のバリアフリールートで</Text>
              <Text style={setStyle.text}>かんたん乗り換えアプリ</Text>
            </View>
            { template }
            <View>
              <Text style={setStyle.text}>{this.state.text[this.state.stage]}</Text>
            </View>
            <SetButton
              buttonText={this.state.btnText}
              navigate={this.props.navigation.navigate}
              pageName={'Guide'}
              info={{wheelchair: this.state.wheelchair, caregiver: this.state.caregiver}}
              changeStage={this.changeStage}
              stage={this.state.stage}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }

  public changeStage = () => {
    let nextStage = this.state.stage + 1;
    this.setState({
      stage: nextStage,
    });
  }

  public changeWheelchair = (wheelchair) => {
    this.setState({
      wheelchair: wheelchair,
    });
  }

  private switchDestination = () => {
    const currentState = this.state;

    this.setState({
      selectedFromLineId: currentState.selectedToLineId,
      selectedToLineId: currentState.selectedFromLineId,
      selectedFromGateId: currentState.selectedToGateId,
      selectedToGateId: currentState.selectedFromGateId,
    });
  }
  private updateFromGateIds = async(lineId: number) => {
    const stationId = this.state.station.id;
    if (stationId == undefined) return;

    const fromGates = await getGates(stationId, lineId);
    this.setState({ fromGates });
  }

  private updateToGateIds = async (lineId: number) => {
    const stationId = this.state.station.id;
    if (stationId == undefined) return;

    const toGates = await getGates(stationId, lineId);
    this.setState({toGates});
  }

  private fromGateSelectors = () => {
    const selectedLineId = this.state.selectedFromLineId;

    if (selectedLineId == undefined) return null;
    if (this.state.fromGates == undefined) return null;
    if (_.isEmpty(this.state.fromGates)) return null;

    return this.state.fromGates.map((gate, index) => {
      const isActive = this.state.selectedFromGateId === gate.id;

      return (
        <GateSelector
          key={`from_selector_${index}`}
          active={isActive}
          gateName={gate.name}
          value={gate.id}
          updateActiveSelector={this.updateFromSelecter}
        />
      );
    });
  }

  public changeCaregiver (caregiver) {
    this.setState({caregiver: caregiver});
  }

  private castLineTypeToPickerItemType = () => {
    if (this.state.lines == undefined) return [];
    if (_.isEmpty(this.state.lines)) return [];

    // 毎回やってるのなんか嫌い
    return this.state.lines.map((line: any) => {
      return _.mapKeys(line, (_, key) => {
        return key === 'id' ? 'value' : key === 'name' ? 'label' : key;
      });
    });
  }

  private toGateSelectors = () => {
    const selectedLineId = this.state.selectedToLineId;
    if (selectedLineId == undefined) return null;
    if (this.state.toGates == undefined) return null;
    if (_.isEmpty(this.state.toGates)) return null;
    return this.state.toGates.map((gate, index) => {
      const isActive = this.state.selectedToGateId === gate.id;
      return (
        <GateSelector
          key={`to_selector_${index}`}
          active={isActive}
          gateName={gate.name}
          value={gate.id}
          updateActiveSelector={this.updateToSelector}
        />
      );
    });
  }

  private updateFromSelecter = (e: number) => {
    this.setState({selectedFromGateId: e});
  }

  private updateToSelector = (e: number) => {
    this.setState({selectedToGateId: e});
  }
}

EStyleSheet.build();

const styles = EStyleSheet.create({
  container: {
    backgroundColor: Color.mainColor,
    flex: 1,
    flexDirection: 'column',
    height: '200%',
  },
  ScrollView: {
    height: '200%',
  },
  logo: {
    height: '8.6%',
    width: '56%',
  },
});

const inputPickerStyle = EStyleSheet.create({
  // https://snack.expo.io/HyOOnZymN
  inputIOS: {
    fontSize: '1.1rem',
    paddingTop: '0.7rem',
    paddingHorizontal: 10,
    paddingBottom: '0.7rem',
    // borderWidth: 1,
    // borderColor: Color.subColorGray,
    borderRadius: 50,
    backgroundColor: 'white',
    color: 'black',
    minWidth: '93%',
    position: 'relative',
    paddingLeft: 50,
  },
  inputAndroid: {
    fontSize: '1rem',
    paddingTop: '0.8rem',
    paddingHorizontal: 10,
    paddingBottom: '0.7rem',
    // borderWidth: 1,
    // borderColor: Color.subColorGray,
    borderRadius: 50,
    backgroundColor: 'white',
    color: 'black',
    minWidth: '93%',
    position: 'relative',
    paddingLeft: 50,
  },
});

const containerStyles = EStyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectContainer: {
    // marginBottom: '0rem',
  },
  searchedListContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchFormContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: '1.8rem',
    marginTop: 55,
  },
  inputSetContainer: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const rootSelectStyle = EStyleSheet.create({
  titleLabelHere: {
    backgroundColor: Color.subColorRed,
    position: 'absolute',
    width: '2.35rem',
    height: '2.35rem',
    borderRadius: 50,
    marginTop: '0.24rem',
    marginLeft: '0.26rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabelDestination: {
    backgroundColor: Color.mainColor,
    position: 'absolute',
    width: '2.35rem',
    height: '2.35rem',
    borderRadius: 50,
    marginTop: '0.24rem',
    marginLeft: '0.26rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const rootTextStyle = StyleSheet.create({
  colorHere: {
    color: Color.white,
    fontWeight: '700',
  },
  colorDestination: {
    color: Color.white,
    fontWeight: '700',
  },
});

const ButtonStyle = EStyleSheet.create({
  switchButton: {
    width: 30,
    height: 30,
    backgroundColor: Color.swapBtnColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.3rem',
    marginBottom: '1rem',
  },
  image: {
    width: 20,
    height: 20,
  },
});

const { height } = Dimensions.get('window');

const gradationStyle = EStyleSheet.create({
  gradation: {
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    minHeight: height *2,
  },
});

const setStyle = EStyleSheet.create({
  logo: {
    height: '100%',
    width: '100%',
  },
  logContainer: {
    // marginBottom: 40,
    marginTop: '15%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 100,
    width: '56%',
  },
  text: {
    color: Color.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 30,
  },
  textContainer: {
    // marginTop: -20,
  },
});

const checkButtonStyle = EStyleSheet.create({
  checkButtonList: {
    width: '80%',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  wheelchairButton: {
    width: '6rem',
    height: '6rem',
    marginLeft: '0.6rem',
    // marginRight: '0.3rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderColor: Color.mainColor,
    borderWidth: 2,
    borderRadius: '0.3rem',
    marginBottom: 30,
  },
  selectWheelchairButton: {
    width: '6rem',
    height: '6rem',
    marginLeft: '0.6rem',
    // marginRight: '0.3rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.mainColor,
    borderColor: Color.mainColor,
    borderWidth: 2,
    borderRadius: '0.3rem',
    marginBottom: 30,
  },
  wheelchairButtonText: {
    color: Color.black,
    fontWeight: '700',
    fontSize: '0.9rem',
    letterSpacing: '0.08rem',
  },
  iconImage: {
    width: '2.9rem',
    height: '2.9rem',
    marginBottom: '0.3rem',
  },
  iconImages: {
    width: '4.5rem',
    height: '4.5rem',
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

const checkButtonStyleJr = EStyleSheet.create({
  checkButtonList: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelchairButton: {
    width: '8rem',
    height: '8rem',
    marginLeft: '0.6rem',
    // marginRight: '0.3rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderColor: Color.mainColor,
    borderWidth: 2,
    borderRadius: '0.3rem',
    marginBottom: 30,
  },
  selectWheelchairButton: {
    width: '8rem',
    height: '8rem',
    marginLeft: '0.6rem',
    // marginRight: '0.3rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.mainColor,
    borderColor: Color.mainColor,
    borderWidth: 2,
    borderRadius: '0.3rem',
    marginBottom: 30,
  },
  wheelchairButtonText: {
    color: Color.black,
    fontWeight: '700',
    fontSize: '0.9rem',
    letterSpacing: '0.08rem',
  },
  iconImage: {
    width: 200,
    height: 200,
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
