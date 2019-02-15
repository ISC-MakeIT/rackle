import * as React from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ImageBackground} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ExtButton } from '../components/ExtButton';
import { StationType, LineType } from '../domains/station';
import * as _ from 'lodash';
import { GateSelector } from '../components/GateSelector';
import headerLogo from '../../assets/images/header-logo-image.png';
import homeImage from '../../assets/images/home_image.jpg';
import swapIcon from '../../assets/images/changeIcon.png';
import { getTrainLines } from '../services/train_lines';
import { getGates } from '../services/gates';
import { Gate } from 'src/domains/gate';

interface Props { navigation: any; }

interface State {
  station: StationType;
  lines: LineType;
  fromGates: Gate[];
  toGates: Gate[];
  selectedFromLineId: number | undefined;
  selectedToLineId: number | undefined;
  selectedFromGateId: number | undefined;
  selectedToGateId: number | undefined;
}

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={headerLogo}
        style={{ width: 110, height: 20 }}
      />
    );
  }
}

export default class HomeScreen extends React.Component<Props, State> {
  public static navigationOptions = {
    headerStyle: {
      backgroundColor: Color.mainColor,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: Color.white,
    },
    headerTitle: <LogoTitle />,
  };

  readonly state = {
    station: undefined,
    lines: undefined,
    fromGates: undefined,
    toGates: undefined,
    selectedFromLineId: undefined,
    selectedToLineId: undefined,
    selectedFromGateId: undefined,
    selectedToGateId: undefined,
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
    return (
      <View style={styles.container}>
      <ScrollView style={styles.ScrollView}>
      <ImageBackground source={homeImage} style={{width: '100%', height: '130%', backgroundSize: 'cover'}}>
        <LinearGradient
          colors={['rgba(67, 195, 142, 1)', 'rgba(250, 250, 250, 0.7)', 'rgba(250, 250, 250, 1)']}
          style={gradationStyle.gradation}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />

        <View style={titleContainerStyle.appTitleContainer}>
          <Text style={titleContainerStyle.appName}>横浜駅 </Text>
          <Text style={titleContainerStyle.appNameKana}>Yokohama</Text>
        </View>

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
        </View>
          <ExtButton
            buttonText={'案内開始'}
            navigate={this.props.navigation.navigate}
            pageName={'Guide'}
          />
      </ImageBackground>
      </ScrollView>
      </View>
    );
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

  private switchDestination = () => {
    const currentState = this.state;

    this.setState({
      selectedFromLineId: currentState.selectedToLineId,
      selectedToLineId: currentState.selectedFromLineId,
      selectedFromGateId: currentState.selectedToGateId,
      selectedToGateId: currentState.selectedFromGateId,
    });
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
    height: '100%',
  },
  ScrollView: {
    height: '100%',
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
    minHeight: height,
  },
});

const titleContainerStyle = EStyleSheet.create( {
  appTitleContainer: {
    lineHeight: '1.5rem',
    marginTop: '3rem',
    marginBottom: '3rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: '100%',
  },
  appName: {
    color: 'white',
    fontSize: '2.2rem',
    textAlign: 'center',
    shadowColor: '#ffffff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  appNameKana: {
    color: 'white',
    fontSize: '1.3rem',
    marginTop: '0.4rem',
    textAlign: 'center',
    shadowColor: '#ffffff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    letterSpacing: 2,
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
