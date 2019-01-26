import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Props { onChangeActiveScreen: () => void; }

const SubMovieComponent: React.FC<Props> = props => {
  return (
    <TouchableOpacity
      style={styles.subWindowCircle}
      onPress={props.onChangeActiveScreen}
    >
      {/* TODO thumbnail */}
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  subWindowCircle: {
    marginTop: 10,
    width: '8rem',
    height: '8rem',
    borderRadius: '4rem',
    position: 'absolute',
    right: 6,
    top: 20,
    elevation: 8,
    backgroundColor: 'skyblue',
  },
  thumnail: {
    // TODO
    width: '8rem',
    height: '8rem',
  },
});

export default SubMovieComponent;
