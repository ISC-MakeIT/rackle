import * as React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface Props {
  text: string;
  style: StyleProp<TextStyle>;
}

// HACK Textを継承するのが正しいように思える。
export const MonoText: React.FC<Props> = props => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
);

export const MplusText: React.FC<Props> = props => (
  <Text {...props} style={[props.style, { fontFamily: 'MPLUS1p' }]} />
);
