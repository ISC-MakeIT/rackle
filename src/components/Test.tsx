import * as React from "react";
import MapViewComponent from "./mapComponents/MapViewComponent";

export default class Test extends React.Component<{}, {}> {
    constructor(props) {
        super (props);
        this.state = {
            indoorLevel: 1,
            location: {
              latitude: 35.46588771428577,
              longitude: 139.62227088041905,
              latitudeDelta: 0.5,
              longitudeDelta: 0.0121,
            },
            level: {
              1: {
                floor: [{
                  latitude: 35.465988146570666,
                  longitude: 139.62243519723415
                }, {
                  latitude: 35.4662085129718,
                  longitude: 139.62274834513664,
                }],
                toilet: [{
                  latitude: 35.46562605622866,
                  longitude: 139.62143406271935,
                }],
              },
              B1: {
                floor: [{
                  latitude: 35.46562469087737,
                  longitude: 139.6228090301156,
                }, {
                  latitude: 35.46588383413554,
                  longitude: 139.6225032582879,
                }],
                toilet: [{
                  latitude: 35.46547750587319,
                  longitude: 139.62226554751396,
                }],
              },
              B2: {
                floor: [{
                  latitude: 35.46585352342876,
                  longitude: 139.62188635021448,
                }, {
                  latitude: 35.4664067602963,
                  longitude: 139.6223959699273,
                }],
                toilet: [{
                  latitude: 35.46614461496969,
                  longitude: 139.62208315730095,
                }],
              },
            },
          };
    }

    public render() {
        return (
            <MapViewComponent
                location={ this.state.location } // mapを表示するときの初期値 今回は横浜の緯度経度
                level={ this.state.level } //ピンを刺す緯度経度をピンの種類と階層分けて渡す
            />
        );
    }
}
