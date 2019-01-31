import * as React from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ExtButton } from '../components/ExtButton';
import { StationData } from '../dummydata/stations';
import { StationType, LineType } from '../domains/station';
import * as _ from 'lodash';
import { GateSelector } from '../components/GateSelector';

interface Props { navigation: any; }

interface State {
  station: StationType;
  lines: LineType;
  selectedFromLineId: number;
  selectedToLineId: number;
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
    station: StationData.station,
    lines: StationData.train_lines,
    selectedFromLineId: 0,
    selectedToLineId: 0,
    selectedFromGateId: undefined,
    selectedToGateId: undefined,
  };

  public render() {
    const { height } = Dimensions.get('window');

    return (
      <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={[Color.mainColor, Color.subColorOffWhite, Color.subColorOffWhite]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            minHeight: height,
          }}
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
                  onValueChange={(value: number) => { this.setState({ selectedFromLineId: value }); }}
                  style={{...inputPickerStyle}}
                  value={this.state.selectedFromLineId}
                  useNativeAndroidPickerStyle={false}
                />
                <View style={rootSelectStyle.titleLabelHere}>
                  <Text style={rootTextStyle.colorHere}>現在</Text>
                </View>

              </View>

            <View style={containerStyles.searchedListContainer}>
              {this.state.lines.map((line, index) => {
                const isActive = this.state.selectedFromGateId && ( this.state.selectedFromGateId === line.id);

                return (
                  <GateSelector
                    key={`fromSelector_${index}`}
                    active={isActive}
                    gateName={line.name}
                    value={line.id}
                    updateActiveSelector={this.updateFromSelecter}
                  />
                );
              })}
            </View>

          </View>
            <View style={containerStyles.inputContainer}>
              <View style={containerStyles.selectContainer}>
                <RNPickerSelect
                  placeholder={{ label: '駅を選択してください', value: null, color: '#9EA0A4', }}
                  items={this.castLineTypeToPickerItemType()}
                  onValueChange={(value: number) => { this.setState({ selectedToLineId: value }); }}
                  style={{...inputPickerStyle}}
                  value={this.state.selectedToLineId}
                  useNativeAndroidPickerStyle={false}
                />
                <View style={rootSelectStyle.titleLabelDestination}>
                  <Text style={rootTextStyle.colorDestination}>目的</Text>
                </View>
              </View>
              <View style={containerStyles.searchedListContainer}>
              {this.state.lines.map((line, index) => {
                const isActive = this.state.selectedToGateId && (this.state.selectedToGateId === line.id);

                return (
                  <GateSelector
                    key={`fromSelector_${index}`}
                    active={isActive}
                    gateName={line.name}
                    value={line.id}
                    updateActiveSelector={this.updateToSelector}
                  />
                );
              })}
              </View>
            </View>
          </View>
          <TouchableOpacity style={ButtonStyle.switchButton} onPress={this.switchDestination}>
            <Text>■</Text>
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

  private switchDestination = () => {
    const currentState = this.state;

    this.setState({
      selectedFromLineId: currentState.selectedToLineId,
      selectedToLineId: currentState.selectedFromLineId,
    });
  }
  private castLineTypeToPickerItemType = () => {
    if (_.isEmpty(this.state.lines)) return [];

    // 毎回やってるのなんか嫌い
    return this.state.lines.map(line => {
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

const ButtonStyle = EStyleSheet.create({
  switchButton: {
    width: '7%',
    height: '7%',
    backgroundColor: Color.mainColor,
  },
});
