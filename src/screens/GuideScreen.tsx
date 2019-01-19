import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MonoText } from '../components/StyledText';
import { getStatusBarHeight } from 'react-native-status-bar-height';

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
                  <Text style={guideHeaderStyle.routeOptionText}>▶︎</Text>
                  <Text style={guideHeaderStyle.routeOptionText}>▶︎</Text>
                  <Text style={guideHeaderStyle.routeOptionText}>▶︎</Text>
                </View>
                <TouchableOpacity style={guideHeaderStyle.gateNameContainer}>
                  <Text style={guideHeaderStyle.gateName}>相鉄線/2F改札</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={guideHeaderStyle.rightContainer}>
              <Text style={guideHeaderStyle.rightText}>一時停止</Text>
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
          <TouchableOpacity>
            <Image
              style={guideStyle.thumbnailImage}
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
          <View>
            <MonoText>screen/GuideScreen</MonoText>
          </View>

          <View style={guideStyle.subWindowCircle}>
          </View>
        </View>
        <View style={guideStyle.thumbnailContainer}>
          {thumbnails}
        </View>
      </View>
    );
  }
}

const guideStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mainContainer: { },
  thumbnailImage: {
    width: 100,
    height: 100,
  },
  thumbnailContainer: {},
  subWindowCircle: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

const guideHeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    marginTop: getStatusBarHeight(),
    justifyContent: 'space-evenly',
    backgroundColor: '#312D2D',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
  },
  stationName: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: 16,
    lineHeight: 30,
  },
  gateNameContainer: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 20,
    marginTop: 5,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  gateName: {
    lineHeight: 10,
    fontSize: 10,
  },
  routeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  routeOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  routeOptionText: {
    fontSize: 10,
    color: 'red',
    lineHeight: 35,
    paddingRight: 5,
  },
  rightContainer: {
    backgroundColor: 'red',
    marginLeft: 'auto',
  },
  rightText: {
    fontSize: 22,
    lineHeight: 30,
    paddingHorizontal: 20,
  },
});
