import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const SubMovieComponent: React.FC<{}> = props => {
  return (
    <View style={[styles.container, styles.subWindowCircle]}>
      <TouchableOpacity style={styles.thumbnailContainer}>
        {/* TODO thumbnail */}
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginTop: 10,
    width: 100,
  },
  subWindowCircle: {
    width: '8rem',
    height: '8rem',
    borderRadius: '4rem',
    position: 'absolute',
    right: 6,
    top: 20,
    elevation: 8,
    backgroundColor: 'skyblue',
  },
  thumbnailContainer: {
    width: 10,
    height: 10,
  },
  thumnail: {
    width: '8rem',
    height: '8rem',
  },
});

export default SubMovieComponent;
