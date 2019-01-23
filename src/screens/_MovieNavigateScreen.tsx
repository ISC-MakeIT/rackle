import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient, Video } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class MyComponent extends Component {
  public static navigationOptions = {
    headerStyle: {
      display: 'none',
    },
  };

  public render() {
          return(
      <View style={{flex: 1, padding: 30,}}><Text>aaaa</Text>
      <Video
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        style={{flex: 1}}
        resizeMode="contain"
        onLoad={onLoad}
        onError={onError}
      />
      </View>
    );
  }
}


// return(
//   <View style={styles.for_section}>
//     <View style={styles.section__header}></View>
//     <View style={styles.section__main_container}>
//       <View style={styles.for_container}>
//         <View style={styles.container__main_content}>
//           <View style={styles.container__movie}></View>
//           <View style={styles.container__option_window}>

//           <Video source={{uri: "Url"}}   // Can be a URL or a localfile.
//    ref={(ref) => {
//      this.player = ref
//    }}                                      // Store reference
//    onBuffer={this.onBuffer}                // Callback when remote video is buffering
//    onEnd={this.onEnd}                      // Callback when playback finishes
//    onError={this.videoError}               // Callback when video cannot be loaded
//    style={styles.backgroundVideo} />
   
//           </View>
//           <View style={styles.container__controller}></View>
//         </View>
//       </View>
//       <View style={styles.container__thumbnail}></View>
//     </View>
//   </View>
// );


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
  section__header: {flex: 0.05, backgroundColor: 'blue',},
  section__main_container: {flex: 0.95, position: 'relative', backgroundColor: 'green',},
  for_container: {flex: 0.8, width: '100%', justifyContent: 'center', backgroundColor: 'pink',},
  container__main_content: {position: 'relative', flex: 1, justifyContent: 'center', backgroundColor: 'white',},
  container__movie: {padding: 10, position: 'absolute', top: 0, zIndex: 10, width: '100%', opacity: 0.2, backgroundColor: 'yellow',},
  container__option_window: {flex:1, zIndex: 1, width: '100%', backgroundColor: 'brown',},
  container__controller: {padding: 10, position: 'absolute', bottom: 0, zIndex: 10, width: '100%', opacity: 0.2, backgroundColor: 'gray',},
  container__thumbnail: {position: 'absolute', flex: 0.2, bottom: 0, padding: '15%', width: '100%', backgroundColor: 'black',},
});
