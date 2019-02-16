import * as React from 'react';
import { LinearGradient } from 'expo';
import { Text, Dimensions, View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface Props {
  announceText: string;
}

export const AnnounceModal: React.FC<Props> = props => {
  return (
    <View style={styles.backGround}>
      <View style={styles.container}>
        <Text>{props.announceText}</Text>
        <Entypo name='triangle-down' style={styles.triangle}/>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  backGround: {
    width,
    height: height * 0.8,
    backgroundColor: 'rgba(0,0,0,0.6)', // TransParentBlack
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    zIndex: 999,
  },
  container: {
    backgroundColor: 'white',
    height: 50,
    width: width * 0.6,
    borderRadius: 50,
    marginBottom: 30,
    marginRight: 10,
  },
  triangle: {
    color: 'white',
    position: 'absolute',
    fontSize: 60,
    bottom: -45,
    right: 5,
  },
  announceText: {
    color: Colors.black,
  },
});
