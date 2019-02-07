import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  stationName: string;
  startGateName: string;
  endGateName: string;
  caption: string;
}

const NavigationPlate: React.FC<Props> = props => (
  <View style={styles.container}>
    <View style={styles.leftContainer}>
      <FontAwesome name={'map-marker'} size={16} color={Color.subColorRed} style={styles.mapMarkerIcon} />
      <Text style={styles.stationName}>{props.stationName}</Text>
      <View style={styles.routeContainer}>
        <TouchableOpacity style={styles.gateNameContainer}>
          <Text style={styles.gateName}>{props.startGateName}</Text>
        </TouchableOpacity>
        <Text style={styles.routeOptionText}>▶︎▶︎▶︎</Text>
        <TouchableOpacity style={styles.gateNameContainer}>
          <Text style={styles.gateName}>{props.endGateName}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.caption}>{props.caption}</Text>
  </View>
);

EStyleSheet.build({});

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 67,
    backgroundColor: 'transparent',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 30,
  },
  mapMarkerIcon: {
    marginLeft: 10,
    textAlign: 'center',
    lineHeight: 30,
  },
  stationName: {
    marginLeft: 10,
    paddingRight: 5,
    color: Color.white,
    fontSize: '1rem',
    lineHeight: 30,
    fontFamily: 'MPLUS1p',
  },
  gateNameContainer: {
    backgroundColor: Color.white,
    height: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 50,
    marginLeft: 5,
  },
  gateName: {
    lineHeight: 20,
    fontSize: '0.7rem',
    fontFamily: 'MPLUS1p',
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
    marginLeft: 5,
    fontFamily: 'MPLUS1p',
  },
  caption: {
    marginHorizontal: 10,
    color: Color.white,
    fontSize: '1.5rem',
    lineHeight: 30,
    fontWeight: '700',
    fontFamily: 'MPLUS1p-Medium',
  },
});

export default NavigationPlate;