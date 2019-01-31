import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from '../../constants/Colors';
import { ElevatorCapacity } from 'src/domains/map';

interface Props {
  modalView: boolean;
}

export default class ExtButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const style = this.props.modalView ? styles.appearModal : styles.hiddenModal;

    return (
      <View style={style} >
        {this.props.children}
      </View>
    );
  }
}

EStyleSheet.build();
const styles = EStyleSheet.create({
  appearModal: {
    backgroundColor: '#fff',
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    flex: 1,
  },
  hiddenModal: {
    //backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: '#000',
    display: 'none',
  },
});
