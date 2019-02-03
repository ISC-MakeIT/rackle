import * as React from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ExtButton } from '../components/ExtButton';
import { StationType, LineType } from '../domains/station';
import * as _ from 'lodash';
import { GateSelector } from '../components/GateSelector';
import swapIcon from '../../assets/images/changeIcon.png';
import { getTrainLines } from '../services/train_lines';
import { getGates } from '../services/gates';

interface Props { navigation: any; }

interface State {
  station: StationType;
  lines: LineType;
  gates: any[]; //todo
  selectedFromLineId: number | undefined;
  selectedToLineId: number | undefined;
  selectedFromGateId: number | undefined;
  selectedToGateId: number | undefined;
}

export default class HomeScreen extends React.Component<Props, State> {
  public static navigationOptions = {
    title: 'rackle',
    headerStyle: {
      backgroundColor: Color.mainColor,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: Color.white,
    },
  };

  readonly state = {
    station: undefined,
    lines: undefined,
    gates: undefined,
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
      <ScrollView>
        <LinearGradient
          colors={[Color.mainColor, Color.subColorOffWhite, Color.subColorOffWhite]}
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
              <View style={containerStyles.selectContainer} >
                <RNPickerSelect
                  placeholder={{ label: '駅を選択してください', value: null, color: '#9EA0A4', }}
                  items={this.castLineTypeToPickerItemType()}
                    onValueChange={(value: number) => {
                      this.setState({ selectedFromLineId: value });
                      this.updateGateIds(value);
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
                      this.updateGateIds(value);
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
        </ScrollView>
      </View>
    );
  }

  private fromGateSelectors = () => this.gateSelectors('from');
  private toGateSelectors = () => this.gateSelectors('to');

  private gateSelectors = (type: 'from' | 'to'  ) => {
    const isTypeFrom = type === 'from';
    const selectedLineId = isTypeFrom ? this.state.selectedFromLineId : this.state.selectedToLineId;

    if (selectedLineId == undefined) return null;
    if (this.state.gates == undefined) return null;
    if (_.isEmpty(this.state.gates)) return null;

    return this.state.gates.map((gate, index) => {
      const isActive = isTypeFrom ?
        (this.state.selectedFromGateId && (this.state.selectedFromGateId === gate.id)) :
        (this.state.selectedToGateId && (this.state.selectedToGateId === gate.id));

      return (
        <GateSelector
          key={`${type}_selector_${index}`}
          active={isActive}
          gateName={gate.name}
          value={gate.id}
          updateActiveSelector={isTypeFrom ? this.updateFromSelecter : this.updateToSelector}
        />
      );
    });
  }

  private updateGateIds = async(lineId: number) => {
    const stationId = this.state.station.id;
    if (stationId == undefined) return;

    const gates = await getGates(stationId, lineId);
    this.setState({ gates });
  }

  private switchDestination = () => {
    const currentState = this.state;

    this.setState({
      selectedFromLineId: currentState.selectedToLineId,
      selectedToLineId: currentState.selectedFromLineId,
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.mainColor,
    flex: 1,
    flexDirection: 'column',
  },
});

const { height } = Dimensions.get('window');

const gradationStyle = EStyleSheet.create({
  gradation: {
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
    marginBottom: '0.5rem',
  },
  searchedListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.8rem',
  },
  searchFormContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputSetContainer: {
    width: '85%',
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
    borderWidth: 1,
    borderColor: Color.subColorGray,
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
    borderWidth: 1,
    borderColor: Color.subColorGray,
    borderRadius: 50,
    backgroundColor: 'white',
    color: 'black',
    minWidth: '93%',
    position: 'relative',
    paddingLeft: 50,
  },
});

const ButtonStyle = StyleSheet.create({
  switchButton: {
    width: 30,
    height: 30,
    backgroundColor: Color.swapBtnColor,
  },
  image: {
    width: 30,
    height: 30,
  },
});
