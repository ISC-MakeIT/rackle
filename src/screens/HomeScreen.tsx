import * as React from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import styles from '../stylesheets/HomeScreen.scss';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo';

interface Props { navigation: any; }
interface State {
  selectedFromValue: number;
  selectedToValue: number;
}

export default class HomeScreen extends React.Component<Props, State> {
  public static navigationOptions = {
    title: 'rackle',
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
          colors={['rgba(99, 191, 142, 0.2)', 'rgba(248, 247, 244, 0.2)', 'white']}
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

        <View style={styles.appTitleContainer}>
          <Text style={styles.appName}>横浜駅 </Text>
          <Text style={styles.appNameKana}>Yokohama</Text>
        </View>

        <View style={styles.searchFormContainer}>
          <View style={containerStyles.inputContainer}>
            <View style={containerStyles.selectContainer} >
              {/* TODO <View style={styles.fromSelectIcon} /> */}

              <RNPickerSelect
                placeholder={{ label: '駅を選択してください', value: null, color: '#9EA0A4', }}
                items={options}
                onValueChange={(value: number) => { this.setState({ selectedFromValue: value }); }}
                style={{...inputPickerStyle}}
                value={this.state.selectedFromValue}
                useNativeAndroidPickerStyle={false}
              />

            </View>

            <View style={containerStyles.searchedListContainer}>
              <Text style={[styles.searchedList, styles.active]} onPress={() => alert('hoge')}>中央北</Text>
              <Text style={[styles.searchedList]} onPress={() => alert('fuga')}>中央南</Text>
              <Text style={[styles.searchedList]} onPress={() => alert('foo')}>中央東</Text>
              <Text style={[styles.searchedList]} onPress={() => alert('var')}>中央西</Text>
            </View>

          </View>
          <View style={[styles.toInputContainer, containerStyles.inputContainer]}>
            <View style={containerStyles.selectContainer}>
              {/* TODO <View style={styles.fromSelectIcon} /> */}
              <RNPickerSelect
                placeholder={{ label: '駅を選択してください', value: null, color: '#9EA0A4', }}
                items={options}
                onValueChange={(value: number) => { this.setState({ selectedToValue: value }); }}
                style={{...inputPickerStyle}}
                value={this.state.selectedToValue}
                useNativeAndroidPickerStyle={false}
              />
            </View>
            <View style={containerStyles.searchedListContainer}>
              <Text style={[styles.searchedList, styles.active]} onPress={() => alert('hoge')}>中央北</Text>
              <Text style={[styles.searchedList]} onPress={() => alert('fuga')}>中央南</Text>
              <Text style={[styles.searchedList]} onPress={() => alert('foo')}>中央東</Text>
              <Text style={[styles.searchedList]} onPress={() => alert('var')}>中央西</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.execBtn}
          onPress={() => this.props.navigation.navigate('Guide')}
        >
          <Text style={styles.execText}>案内開始</Text>
        </TouchableOpacity>
      </View>
    );
  }

  public _maybeRenderDevelopmentModeWarning () {
    if (__DEV__) {
      const learnMoreButton = (<Text> Learn more </Text>);

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful
          development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

const containerStyles = StyleSheet.create({
  inputContainer: {
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
});

const inputPickerStyle = StyleSheet.create({
  // https://snack.expo.io/HyOOnZymN
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    backgroundColor: 'white',
    color: 'black',
    minWidth: 300,
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    backgroundColor: 'white',
    color: 'black',
  },
});
