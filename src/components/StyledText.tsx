import * as React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface Props {
  text: string;
  style: StyleProp<TextStyle>;
}

const MonoText: React.SFC<Props> = props => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
);

export default MonoText;
