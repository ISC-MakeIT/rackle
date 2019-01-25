import * as React from 'react';
import {Dimensions, Text, View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../constants/Colors';

interface Props {
  stationName: string;
  startGateName: string;
  endGateName: string;
}

export default class NaviPlate extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={guideHeaderStyle.container}>
        <View style={guideHeaderStyle.leftContainer}>
          <Text style={guideHeaderStyle.stationName}>{this.props.stationName}</Text>
          <View style={guideHeaderStyle.routeContainer}>
            <TouchableOpacity style={guideHeaderStyle.gateNameContainer}>
              <Text style={guideHeaderStyle.gateName}>{this.props.startGateName}</Text>
            </TouchableOpacity>
            <View style={guideHeaderStyle.routeOptions}>
              <Text style={guideHeaderStyle.routeOptionText}>▶︎▶︎▶︎</Text>
            </View>
            <TouchableOpacity style={guideHeaderStyle.gateNameContainer}>
              <Text style={guideHeaderStyle.gateName}>{this.props.endGateName}</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
    );
  }
}

EStyleSheet.build({});

const guideHeaderStyle = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
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
