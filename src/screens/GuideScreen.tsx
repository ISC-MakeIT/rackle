import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, ColorPropType } from 'react-native';
import { MonoText } from '../components/StyledText';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Props { navigation: any; }

export default class GuideScreen extends React.Component<Props, {}> {
  public static navigationOptions = (navigation: any) => {
    return {
      title: 'GuideScreen',
      header: () => (
          <View style={guideHeaderStyle.container}>
            <View style={guideHeaderStyle.leftContainer}>
              <Text style={guideHeaderStyle.stationName}>横浜駅</Text>
              <View style={guideHeaderStyle.routeContainer}>
                <TouchableOpacity style={guideHeaderStyle.gateNameContainer}>
                  <Text style={guideHeaderStyle.gateName}>JR/中央改札</Text>
                </TouchableOpacity>
                <View style={guideHeaderStyle.routeOptions}>
                  <Text style={guideHeaderStyle.routeOptionText}>▶︎▶︎▶︎</Text>
                </View>
                <TouchableOpacity style={guideHeaderStyle.gateNameContainer}>
                  <Text style={guideHeaderStyle.gateName}>相鉄線/2F改札</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),

      // TODO
      // header: ({ goBack }) => ({
      //     left: (
      //         <Ionicons
      //             name={Platform.OS  === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
      //             onPress={() => { goBack() }}
      //         />
      //     ),
      // }),
    };
  }

  constructor(props: Props) {
    super(props);
  }

  public render() {
    const playlistId = 'PLL4UBL_GFXMlMjpCQdOKEUw_GT7AFB-SX';
    const playlistYoutubeIds = ['uS00Bd9ZVz4', '9iieMHXubJU', '_Hdk2vXESB0', 'X8p0y5KXdIk', 'yYbWPRuxK1U', '33Np_lJseBE', 'z3VW7TNklww', 'tNMatlAOOcs', 'EyT0uC1D1I8', 'bxG4LTsLThE'];

    const thumbnails = (
      <FlatList
        data={playlistYoutubeIds}
        renderItem={({ item }) => (
          <TouchableOpacity >
            <Image
              style={thumbnailStyle.Image}
              source={{ uri: `http://i.ytimg.com/vi/${item}/default.jpg` }}
            />
          </TouchableOpacity>
        )}
        horizontal={true}
        keyExtractor={item => item}
      />);

    return (
      <View style={guideStyle.container}>
        <View style={guideStyle.mainContainer}>
          <View style={guideStyle.mainWindow}>
            <MonoText>screen/GuideScreen</MonoText>
            <TouchableOpacity style={guideStyle.extButton}>
              <Text style={guideStyle.extButtonText}>案内終了</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={guideStyle.subWindowCircle}
          >
          </TouchableOpacity>
        </View>
        <View style={thumbnailStyle.Container}>
          {thumbnails}
        </View>
      </View>
    );
  }
}

EStyleSheet.build();

const { width, height } = Dimensions.get('window');

const guideStyle = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mainContainer: {
    width: width,
  },
  mainWindow: {
    height: (height - 120),
  },
  subWindowCircle: {
    backgroundColor: Color.subColorGray,
    width: '8rem',
    height: '8rem',
    borderRadius: '4rem',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    top: 10,
    elevation: 8,
  },
  extButton: {
    backgroundColor: Color.subColorRed,
    width: '8rem',
    height: '2.5rem',
    borderRadius: '0.3rem',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
  },
  extButtonText: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: Color.white,
    letterSpacing: '0.1rem',
  },
});

const thumbnailStyle = StyleSheet.create({
  Image: {
    width: 120,
    height: 120,
  },
  Container: {
    height: 120,
  },
});

const guideHeaderStyle = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    marginTop: getStatusBarHeight(),
    justifyContent: 'flex-start',
    backgroundColor: Color.black,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
  },
  stationName: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: '1rem',
    lineHeight: 30,
  },
  gateNameContainer: {
    backgroundColor: 'white',
    height: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  gateName: {
    lineHeight: 20,
    fontSize: '0.7rem',
  },
  routeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  routeOptionText: {
    fontSize: '0.7rem',
    color: Color.subColorRed,
    lineHeight: 30,
    paddingRight: 0.5,
  },
});
