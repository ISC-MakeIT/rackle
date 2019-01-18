import * as React from "react";
import MapViewComponent from "../components/mapComponents/MapViewComponent";

export default class MapScreen extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {
      indoorLevel: "1",
      initializationLocation: {
        latitude: 35.46588771428577,
        longitude: 139.62227088041905,
        latitudeDelta: 0.5,
        longitudeDelta: 0.0121,
      },
      markers: [{
        movieMarkers: [{
          floor: "B1",
          movieId: 1,
          latitude: 35.465821301223436,
          longitude: 139.62295688688755,
        }, {
          floor: "B1",
          movieId: 2,
          latitude: 35.46571343866254,
          longitude: 139.62286870926619,
        }, {
          floor: "B1",
          movieId: 3,
          latitude: 35.465792082771856,
          longitude: 139.62272554636002,
        }, {
          floor: "B1",
          movieId: 4,
          latitude: 35.465903768197734,
          longitude: 139.62255354970694,
        }, {
          floor: "B1",
          movieId: 5,
          latitude: 35.466043852632446,
          longitude: 139.6223419904709,
        }, {
          floor: "B1",
          movieId: 6,
          latitude: 35.46616127214609,
          longitude: 139.6221974864602,
        }, {
          floor: "B1",
          movieId: 7,
          latitude: 35.46594281709978,
          longitude: 139.62197788059711,
        }, {
          floor: "B3",
          movieId: 8,
          latitude: 35.46597258163476,
          longitude: 139.62195876985788,
        }],
      }, {
        publicFacilityMarkers: [{
          floor: "B1",
          type: "toilet",
          latitude: 35.46598896577774,
          longitude: 139.62186254560947,
        }, {
          floor: "B2",
          type: "toilet",
          latitude: 35.46571562322217,
          longitude: 139.62188635021448,
        }, {
          floor: "B2",
          type: "toilet",
          latitude: 35.466379726599,
          longitude: 139.6222296729684,
        }, {
          floor: "B3",
          type: "toilet",
          latitude: 35.46599115032989,
          longitude: 139.62186221033335,
        }],
      }],
      guideLines: [{
        floor: "B1",
        path: [{
          latitude: 35.465821301223436,
          longitude: 139.62295688688755,
        }, {
          latitude: 35.46571343866254,
          longitude: 139.62286870926619,
        }, {
          latitude: 35.465792082771856,
          longitude: 139.62272554636002,
        }, {
          latitude: 35.465903768197734,
          longitude: 139.62255354970694,
        }, {
          latitude: 35.466043852632446,
          longitude: 139.6223419904709,
        }, {
          latitude: 35.46616127214609,
          longitude: 139.6221974864602,
        }, {
          latitude: 35.46594281709978,
          longitude: 139.62197788059711,
        }, {
          latitude: 35.46598896577774,
          longitude: 139.62186254560947,
        }],
      }, {
        floor: "B3",
        path: [{
          latitude: 35.46599115032989,
          longitude: 139.62186221033335,
        }, {
          latitude: 35.46597258163476,
          longitude: 139.62195876985788,
        }],
      }],
    };
  }

    public render() {
        return (
          <MapViewComponent
            indoorLevel={this.state.indoorLevel} // 案内を開始する階を指定
            initializedLocation={this.state.initializationLocation} // mapを表示するときの初期値 今回は横浜の緯度経度
            markers={this.state.markers} // ピンを刺す緯度経度をピンの種類と階層分けて渡す
            guideLines={this.state.guideLines}
          />
        );
    }
}
