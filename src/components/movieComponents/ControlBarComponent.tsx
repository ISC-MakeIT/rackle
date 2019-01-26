import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from 'react-native-progress/Bar';

interface Props {
  paused : boolean;
  progress: number;
  pressPlayPause: () => void;
}

const ControlBar: React.FC<Props> = props => (
  <View style={style.controls}>
    <TouchableOpacity onPress={props.pressPlayPause}>
      <Ionicons name={props.paused ? 'ios-play' : 'ios-pause' } size={40} color='#FFF' />
    </TouchableOpacity>
    <TouchableWithoutFeedback>
      <ProgressBar
        progress={props.progress}
        color={Color.white}
        unfilledColor={'rgba(255, 255, 255, 0.5)'}
        borderColor={Color.white}
        height={16}
      />
    </TouchableWithoutFeedback>
    <Text style={style.seekTime}>
      00:00
    </Text>
  </View>
);

const style = EStyleSheet.create({
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 40,
    left: 0,
    right: 0,
    bottom: 90,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  seekTime: {
    color: Color.white,
  },
});

export default ControlBar;