import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../constants/Colors';
import { TouchableOpacity, Text } from 'react-native';

interface Props {
  gateName: string;
  active: boolean;
  value: number;
  updateActiveSelector: (e: number) => void;
}

export const GateSelector: React.FC<Props> = props => {
  const btnColor = props.active ? { backgroundColor: Color.mainColor } : { backgroundColor: Color.white };
  const textColor = props.active ? { color: Color.white } : { color: Color.mainColor };

  const updateActiveSelector = () => props.updateActiveSelector(props.value);

  return (
    <TouchableOpacity style={[styles.list, { ...btnColor }]} onPress={updateActiveSelector}>
      <Text style={[styles.text, {...textColor}]}>{props.gateName}</Text>
    </TouchableOpacity>
  );
};

EStyleSheet.build();
const styles = EStyleSheet.create({
  list: {
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
  text: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: Color.mainColor,
  },
});

