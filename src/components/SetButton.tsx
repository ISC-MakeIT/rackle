import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Props {
  navigate: any;
  buttonText: string;
  pageName: string;
  stage: number;
  changeStage: any;
}

export const SetButton: React.FC<Props> = props => {
  const navigate = () => props.navigate(props.pageName, getInfo());
  const getInfo = () => {
    const info = props.info;
    console.warn(info);
    return ({
      wheelchair: info.wheelchair == undefined ? undefined : info.wheelchair,
      caregiver: info.caregiver == undefined ? undefined : info.caregiver,
    });
  };
  return (
    <TouchableOpacity
      style={rootButtonStyle.execBtn}
      onPress={props.stage === 3 ? navigate : props.changeStage}
    >
        <Text style={rootButtonStyle.execText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

EStyleSheet.build();

const rootButtonStyle = EStyleSheet.create({
  execBtn: {
    width: '80%',
    height: '3.5rem',
    backgroundColor: Color.subColorRed,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '4.5rem',
    marginTop: 40,
  },
  execText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: Color.white,
    letterSpacing: '0.2rem',
  },
});
