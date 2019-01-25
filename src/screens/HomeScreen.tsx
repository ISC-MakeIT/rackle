import * as React from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo';
import Color from '../constants/Colors';

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
        <LinearGradient
          colors={['rgba(99, 191, 142, 0.2)', '#F8F7F4', 'white']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: height,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />

        <View style={titleContainerStyle.appTitleContainer}>
          <Text style={titleContainerStyle.appName}>横浜駅 </Text>
          <Text style={titleContainerStyle.appNameKana}>Yokohama</Text>
        </View>

        <View style={containerStyles.searchFormContainer}>
          <View>
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

        <TouchableOpacity
          style={rootButtonStyle.execBtn}
          onPress={() => this.props.navigation.navigate('Guide')}
        >
          <Text style={rootButtonText.execText}>案内開始</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.mainColor,
    flex: 1,
    flexDirection: 'column',
  },
});

const titleContainerStyle = StyleSheet.create( {
  appTitleContainer: {
    lineHeight: 20,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: 200,
  },
  appName: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    shadowColor: '#ffffff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  appNameKana: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    shadowColor: '#ffffff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    letterSpacing: 2,
  },
});

const containerStyles = StyleSheet.create({
  inputContainer: {
    width:355,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectContainer: {
    marginBottom: 10,
  },
  searchedListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  searchFormContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const rootSelectStyle = StyleSheet.create({
  titleLabelHere: {
    backgroundColor: Color.subColorRed,
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 50,
    marginTop: 4,
    marginLeft: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabelDestination: {
    backgroundColor: Color.mainColor,
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 50,
    marginTop: 4,
    marginLeft: 4,
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

const rootButtonStyle = StyleSheet.create({
  searchedList: {
    width: 150,
    height: 44,
    borderWidth: 2,
    borderColor: Color.mainColor,
    borderRadius: 5,
    backgroundColor: Color.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 3,
    marginRight: 3,
  },
  active: {
    backgroundColor: Color.mainColor,
  },
  execBtn: {
    width: 300,
    height: 52,
    backgroundColor: Color.mainColor,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButton: {
    width: 20,
    height: 20,
    backgroundColor: Color.mainColor,
  },
});

const rootButtonText = StyleSheet.create({
  searchedText: {
    fontSize: 19,
    fontWeight: '700',
    color: Color.mainColor,
  },
  active: {
    color: Color.white,
  },
  execText: {
    fontSize: 25,
    fontWeight: '700',
    color: Color.white,
    letterSpacing: 2,
  },
});

const inputPickerStyle = StyleSheet.create({
  // https://snack.expo.io/HyOOnZymN
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: Color.subColorGray,
    borderRadius: 50,
    backgroundColor: 'white',
    color: 'black',
    minWidth: 330,
    position: 'relative',
    paddingLeft: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: Color.subColorGray,
    borderRadius: 50,
    backgroundColor: 'white',
    color: 'black',
    minWidth: 330,
    position: 'relative',
    paddingLeft: 50,
  },
});
