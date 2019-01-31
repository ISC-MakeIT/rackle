import * as React from 'react';
import {
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../constants/Colors';

interface Props {
  thumbnails: string[];
}

interface Item {
  item: string;
  index: number;
}

const renderItem = ({item, index} : Item) => {
  return (
    <TouchableOpacity>
      <Image style={style.image} source={{ uri: `http://i.ytimg.com/vi/${item}/default.jpg` }} />
    </TouchableOpacity>
  );
};

const keyExtractor = (item: string, index: number) => index.toString();

const ThumbnailList: React.FC<Props> = props => (
  <FlatList
    data={props.thumbnails}
    horizontal={true}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
    style={style.thumbnails}
  />
);

const style = EStyleSheet.create({
  thumbnails: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 90,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  image: {
    width: 120,
    height: 90,
  },
});

export default ThumbnailList;
