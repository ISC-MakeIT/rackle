import React from "react";
import { StyleSheet, View} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MarkerComponent from "./MarkerComponent";

interface MapViewComponentProps extends MarkerPoint {
    location: {
      latitude: number;
      longitude: number;
    };
    level: {string: MarkerPoint};
}

interface MapViewComponentState extends MarkerPoint {
  indoorLevel: number;
  location: {
    latitude: number;
    longitude: number;
  };
  marker: MarkerPoint;
  level: {string: MarkerPoint};
}

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface LatLng {
    latitude: number;
    longitude: number;
}

interface MarkerPoint extends LatLng {
  string: {
    floor: LatLng[],
    toilet: LatLng[],
  };
}

export default class MapViewComponent extends React.Component<MapViewComponentProps, MapViewComponentState> {
  constructor(props: MapViewComponentProps) {
    super (props);
    this.state = {
      indoorLevel: "1",
      location: this.props.location,
      marker: this.props.level[1],
      level: this.props.level,
    };
  }

    public shouldComponentUpdate(nextProps, nextState) {
        // 階層が変わっていなければ再表示しない
        if (this.state.indoorLevel === nextState.indoorLevel && this.state.region === nextState.region) {
            return false;
        }
        return true;
    }

    public render() {
        return (
            <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={this.state.location}
                onRegionChange={(e) => this.locationChange (e)} // 動くたび発火
                minZoomLevel={18} // 初期拡大
                onPress={(e) => console.log (e.nativeEvent.coordinate)}
                onIndoorLevelActivated={(e) => { this.indoorLevel (e.nativeEvent.IndoorLevel.name); }} // 現在参照している階をgetだぜ
            >
            {
                this.state.marker.floor.map((point: LatLng, index: number) => {
                    return (
                        // 案内用のアイコンを表示
                        <MarkerComponent key={index} latLng={point} />
                    );
                })
            }
            {
                this.state.marker.toilet.map((point: LatLng, index: number) => {
                    return (
                        // トイレ用のアイコンを表示
                        <MarkerComponent key={index} latLng={point} icon={"toilet"} />
                    );
                })
            }
            </MapView>
            </View>
        );
    }

    // 現在の階層を取得しそれに対応した階のピンを刺す情報に置き換える
    private indoorLevel(name: string) {
        // 階層を取得しているとたまに"Level 1"とか出てくるのでとりあえず無視
        if (name !== "Level 1") {
            const level: MarkerPoint = this.state.level[`${name}`];
            this.setState ({
                indoorLevel: name,
                marker: level,
            });
        }
    }

    // 現在地を常に更新
    private locationChange(region: Region) {
      this.setState ({
        location: region,
      });
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 700,
        width: 420,
        justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
