import * as React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MarkerComponent from "./MarkerComponent";

interface MapViewComponentProps {
    indoorLevel: string;
    location: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
    level: {
        // "1", B1, B2, ・・・
        [floor: string]: Array<{
            // destination, floor, toilet
            [type: string]: {
                latitude: number,
                longitude: number,
            },
        }>;
    };
}

interface MapViewComponentState {
    indoorLevel: string;
    location: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
    marker: Array<{
      [type: string]: {
          latitude: number,
          longitude: number,
      },
    }>;
    level: {
        [floor: string]: Array<{
            [type: string]: {
                latitude: number,
                longitude: number,
            },
        }>;
    };
}

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface MarkerPoint {
    [floor: string]: Array<{
          [type: string]: {
              latitude: number,
              longitude: number,
          },
    }>;
}

export default class MapViewComponent extends React.Component <MapViewComponentProps, MapViewComponentState> {
    constructor(props: MapViewComponentProps) {
        super (props);
        this.state = {
            indoorLevel: this.props.indoorLevel,
            location: this.props.location,
            marker: this.props.level[ this.props.indoorLevel ],
            level: this.props.level,
        };
    }

    public shouldComponentUpdate(nextProps: MapViewComponentProps, nextState: MapViewComponentState) {
        // 階層が変わっていなければ再表示しない
        if (this.state.indoorLevel === nextState.indoorLevel) {
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
                    onRegionChange={(e: Region) => this.locationChange (e)} // 動くたび発火
                    minZoomLevel={18} // 初期拡大
                    onPress={(e: any) => console.log (e.nativeEvent.coordinate)}
                    onIndoorLevelActivated={(e: any) => { this.indoorLevel (e.nativeEvent.IndoorLevel.name); }} // 現在参照している階をgetだぜ
                >
                {
                    // typeごとに<MarkerComponent/>を呼ぶ
                    (() => {
                        const type = this.state.marker;
                        const marker = type.map((point, index: number) => {
                            const keys = Object.keys(point);
                            const key = keys[0];
                            return (
                                // 階層ごとののアイコンを表示
                                <MarkerComponent key={index} latLng={point[key]} icon={key} />
                            );
                        });
                        return marker;
                    })()
                }
                </MapView>
            </View>
        );
    }

    // 現在の階層を取得しそれに対応した階のピンを刺す情報に置き換える
    private indoorLevel(name: string) {
        // 階層を取得しているとたまに"Level 1"とか出てくるのでとりあえず無視
        if (name !== "Level 1") {
            const level: MarkerPoint = this.state.level;
            this.setState ({
                indoorLevel: name,
                marker: level[name],
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
        backfaceVisibility: "hidden",
    },
});
