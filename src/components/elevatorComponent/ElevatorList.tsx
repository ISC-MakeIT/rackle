import * as React from 'react';
import { View, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Elevator} from './Elevator';
import {Tab} from './Tab';
import Color from '../../constants/Colors';
import * as _ from 'lodash';
import NavigationPlate from '../NavigationPlate';
import { ObjectPoint } from '../../domains/object_point';
import { Gate } from '../../domains/gate';

type ElevatorCapacity = '6人乗り' | '8人乗り' | '12人乗り';


interface Props {
  elevatorModalView: boolean;
  elevatorObjectPoints: ObjectPoint[];
  startGate: Gate;
  endGate:Gate;
  elevatorListChangeFlg: () => void;
 }

interface State {
  currentCapacity: ElevatorCapacity;
}

export default class ElevatorList extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      currentCapacity: '12人乗り',
    };
  }

  render() {
    const tagNames = ['6人乗り', '8人乗り', '12人乗り'];
    return (
      <View style={styles.body}>
        <View style={styles.navigationPlate}>
          <NavigationPlate
            stationName={'横浜駅'}
            startGateName={`${this.props.startGate.tname}/${this.props.startGate.name}`}
            endGateName={`${this.props.endGate.tname}/${this.props.endGate.name}`}
          >
          </NavigationPlate>
        </View>
        <TouchableOpacity
          style={styles.modalChangeButton}
          onPress={this.props.elevatorListChangeFlg}
        >
          <View style={styles.modalChangeButtonAround}>
            <Text style={styles.modalChangeButtonText}>×</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.listName}>
          <Text style={styles.listNameText}>エレベータ一覧</Text>
          <View style={styles.listNameBottomLineUp}></View>
          <View style={styles.listNameBottomLine}></View>
        </View>
        <View style={styles.container}>
          <View style={styles.containerView}>
            <FlatList
              data={tagNames}
              contentContainerStyle={{ flexDirection: 'row'}}
              renderItem={size => {
                return (
                  <Tab
                    capacity={size.item}
                    changeTabCapacity={this.changeTabCapacity}
                    key={`tab_${size.item}`}
                    currentCapacity={this.state.currentCapacity}
                  />
                );
              }}
            />
          </View>
          <FlatList
            data={this.gatCurrentSizeElevator()}
            renderItem={elevatorObjectPoint => {
              return (
                <Elevator
                  size={elevatorObjectPoint.item.caption}
                  name={elevatorObjectPoint.item.name}
                  key={`elevatorMarker_${elevatorObjectPoint.item.id}`}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }

  private changeTabCapacity = (capacity: ElevatorCapacity) => {
    this.setState({
      currentCapacity: capacity,
    });
  }

  private gatCurrentSizeElevator = () => {
    return this.props.elevatorObjectPoints.filter((elevatorObjectPoint: ObjectPoint) => {
      return elevatorObjectPoint.caption === this.state.currentCapacity;
    });
  }
}

EStyleSheet.build({});
const {width, height} = Dimensions.get('screen');

const styles = EStyleSheet.create({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  body: {
    top: height * 0.02,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: height,
    flexDirection: 'column',
  },
  containerView: {
    marginTop: height * 0.03,
    flexDirection: 'row',
  },
  navigationPlate: {
    position: 'absolute',
    top: - height * 0.02,
  },
  modalChangeButton: {
    zIndex: 100,
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: 50,
    width: width * 0.12,
    height: width * 0.12,
    right: width * 0.05,
  },
  modalChangeButtonText: {
    color: Color.white,
    fontSize: '3rem',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  modalChangeButtonAround: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: height * 0.01,
  },
  listName: {
    marginTop: height * 0.04,
  },
  listNameText: {
    fontFamily: 'MPLUS1p-Medium',
    color: Color.white,
    fontSize: '1.5rem',
    marginLeft: width * 0.05,
    marginBottom: height * 0.01,
  },
  listNameBottomLineUp: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.005,
    width: width * 0.55,
    backgroundColor: '#fff',
    marginTop: height * 0.01,
    zIndex: 10,
  },
  listNameBottomLine: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.005,
    width: width,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: height * 0.01,
    zIndex: 5,
  },
});
