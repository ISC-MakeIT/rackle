import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Color from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Props {
  navigate: any;
  buttonText: string;
  pageName: string;
}

export const ExtButton: React.FC<Props> = props => {
  const navigate = () => props.navigate(props.pageName);

  return (
    <TouchableOpacity
      style={rootButtonStyle.execBtn}
      onPress={navigate}
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
    backgroundColor: Color.mainColor,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '4.5rem',
  },
  execText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: Color.white,
    letterSpacing: '0.2rem',
  },
});
