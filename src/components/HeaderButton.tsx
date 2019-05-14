import * as React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import Color from '../constants/Colors';
import EStyleSheet, { absoluteFill } from 'react-native-extended-stylesheet';
import SetImage from '../../assets/images/set.png';


interface Props {
  navigate: any;
  buttonText: string;
  pageName: string;
}

export const HeaderButton: React.FC<Props> = props => {
  const navigate = () => props.navigate(props.pageName, getInfo());

  const getInfo = () => {
    const info = props.info;
    return ({
      wheelchair: info.wheelchair == undefined ? undefined : info.wheelchair,
      caregiver: info.caregiver == undefined ? undefined : info.caregiver,
    });
  };
  return (
    <TouchableOpacity
      style={rootButtonStyle.execBtn}
      onPress={navigate}
    >
        {/* <Text style={rootButtonStyle.execText}>{props.buttonText}</Text> */}
        <Image
          source={SetImage}
          style={{width: 25, height: 25}}
        />
    </TouchableOpacity>
  );
};

EStyleSheet.build();

const rootButtonStyle = EStyleSheet.create({
  execBtn: {
    width: '30%',
    height: '2rem',
    backgroundColor: Color.mainColor,
    borderRadius: 50,
    position: 'absolute',
    right: -80,
    top: 25,
  },
  execText: {
    fontSize: '1.2rem',
    fontWeight: '500',
    color: Color.white,
    letterSpacing: '0.1rem',
  },
});
