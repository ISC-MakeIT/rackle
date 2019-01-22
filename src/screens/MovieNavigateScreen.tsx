import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class MyComponent extends Component {

  public static navigationOptions = {
    headerStyle: {
      display: 'none',
    },
  };
  public render() {
    return(
      <View style={styles.for_section}>
        <View style={styles.section__header}></View>
        <View style={styles.section__main_container}>
          <View style={styles.for_container}>
            <View style={styles.container__main_content}>
              <View style={styles.container__movie}></View>
              <View style={styles.container__option_window}></View>
              <View style={styles.container__controller}></View>
            </View>
            <View style={styles.container__thumbnail}></View>
          </View>
        </View>
      </View>
    );
  }
}

        // <View style={styles.for_container}>
        // <View style={styles.container__main_content}>
          // <View style={styles.container__movie}></View>
          // <View style={styles.container__option_window}></View>
          // <View style={styles.container__controller}></View>
        // </View>
        // <View style={styles.container__thumbnail}></View>
        // </View>


EStyleSheet.build({});

const styles = EStyleSheet.create({
  for_section: {flex: 1, top: '5%', backgroundColor: 'red',},
  section__header: {flex: 0.1, backgroundColor: 'blue',},
  section__main_container: {flex: 0.9, backgroundColor: 'green',},
  for_container: {flex: 0.8,  width: '100%', justifyContent: 'center', backgroundColor: 'pink',},
  container__main_content: {position: 'relative', flex: 1, justifyContent: 'center', backgroundColor: 'white',},
  container__movie: {padding: 10, position: 'absolute', top: 0, zIndex: 10, width: '100%', opacity: 0.2, backgroundColor: 'yellow',},
  container__option_window: {flex:1, zIndex: 1, width: '100%', backgroundColor: 'brown',},
  container__controller: {padding: 10, position: 'absolute', bottom: 0, zIndex: 10, width: '100%', opacity: 0.2, backgroundColor: 'gray',},
  container__thumbnail: {position: 'absolute', bottom: 0, backgroundColor: 'black',},
});
