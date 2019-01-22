import * as React from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import ExtButton from '../components/screenComponents/ExtButton';

interface Props { navigation: any; }
interface State {
  selectedFromValue: number;
  selectedToValue: number;
}

export default class HomeScreen extends React.Component<Props, State> {
  public static navigationOptions = {
    title: 'rackle',
    headerStyle: {
      backgroundColor: '#63BF8E',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#ffffff',
    },
  };

  inputRefs: any;

  constructor(props: Props) {
    super(props);
    this.state = { selectedFromValue: 0, selectedToValue: 0, };
  }

  public render() {
    const options = [
      { value: 1, label: 'JR' },
      { value: 2, label: '東横' },
      { value: 3, label: '相鉄' },
      { value: 4, label: 'blueline' },
    ];

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
                  items={options}
                  onValueChange={(value: number) => { this.setState({ selectedFromValue: value }); }}
                  style={{...inputPickerStyle}}
                  value={this.state.selectedFromValue}
                  useNativeAndroidPickerStyle={false}
                />
                <View style={rootSelectStyle.titleLabelHere}>
                  <Text style={rootTextStyle.colorHere}>現在</Text>
                </View>

              </View>

            <View style={containerStyles.searchedListContainer}>
              <TouchableOpacity style={[rootButtonStyle.searchedList, rootButtonStyle.active]} onPress={() => alert('hoge')}>
              <Text style={[rootButtonText.searchedText, rootButtonText.active]}>中央北</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[rootButtonStyle.searchedList]} onPress={() => alert('fuga')}>
                <Text style={rootButtonText.searchedText}>中央南</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[rootButtonStyle.searchedList]} onPress={() => alert('foo')}>
                <Text style={rootButtonText.searchedText}>中央東</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[rootButtonStyle.searchedList]} onPress={() => alert('var')}>
                <Text style={rootButtonText.searchedText}>中央西</Text>
              </TouchableOpacity>
            </View>

          </View>
            <View style={containerStyles.inputContainer}>
              <View style={containerStyles.selectContainer}>
                <RNPickerSelect
                  placeholder={{ label: '駅を選択してください', value: null, color: '#9EA0A4', }}
                  items={options}
                  onValueChange={(value: number) => { this.setState({ selectedToValue: value }); }}
                  style={{...inputPickerStyle}}
                  value={this.state.selectedToValue}
                  useNativeAndroidPickerStyle={false}
                />
                <View style={rootSelectStyle.titleLabelDestination}>
                  <Text style={rootTextStyle.colorDestination}>目的</Text>
                </View>
              </View>
              <View style={containerStyles.searchedListContainer}>
                <TouchableOpacity style={[rootButtonStyle.searchedList, rootButtonStyle.active]} onPress={() => alert('hoge')}>
                  <Text style={[rootButtonText.searchedText, rootButtonText.active]}>中央北</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[rootButtonStyle.searchedList]} onPress={() => alert('fuga')}>
                  <Text style={rootButtonText.searchedText}>中央南</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[rootButtonStyle.searchedList]} onPress={() => alert('foo')}>
                  <Text style={rootButtonText.searchedText}>中央東</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[rootButtonStyle.searchedList]} onPress={() => alert('var')}>
                  <Text style={rootButtonText.searchedText}>中央西</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={rootButtonStyle.switchButton}>
            <Text>■</Text>
          </View>
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

  public _maybeRenderDevelopmentModeWarning () {
    if (__DEV__) {
      const learnMoreButton = (<Text> Learn more </Text>);

      return (
        <Text>
          Development mode is enabled, your app will be slower but you can use useful
          development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
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

const rootButtonStyle = EStyleSheet.create({
  searchedList: {
    width: '43%',
    height: '3rem',
    borderWidth: 2,
    borderColor: Color.mainColor,
    borderRadius: '0.3rem',
    backgroundColor: Color.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0.2rem',
    marginBottom: '0.2rem',
    marginLeft: '0.2rem',
    marginRight: '0.2rem',
  },
  active: {
    backgroundColor: Color.mainColor,
  },
  execBtn: {
    width: '80%',
    height: '9%',
    backgroundColor: Color.mainColor,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '4.5rem',
  },
  switchButton: {
    width: '7%',
    height: '7%',
    backgroundColor: Color.mainColor,
  },
});

const rootButtonText = EStyleSheet.create({
  searchedText: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: Color.mainColor,
  },
  active: {
    color: Color.white,
  },
  execText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: Color.white,
    letterSpacing: '0.2rem',
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
