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
        [floor: string]: {
            // destination, floor, toilet
            [type: string]: Array<{
                latitude: number,
                longitude: number,
            }> | "undefined",
        };
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
    marker: {
        [type: string]: Array<{
            latitude: number,
            longitude: number,
        }> | "undefined",
    };
    level: {
        [floor: string]: {
            [type: string]: Array<{
                latitude: number,
                longitude: number,
            }> | "undefined",
        };
    };
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

interface MarkerPoint {
    [type: string]: Array<{
        latitude: number,
        longitude: number,
    }> | "undefined";
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
                    ((floor = this.state.marker.floor) => {
                         if (floor !== "undefined") {
                            const marker = floor.map((point: LatLng, index: number) => {
                                return (
                                    // 階層ごとののアイコンを表示
                                    <MarkerComponent key={index} latLng={point} icon={"floor"} />
                                );
                            });
                            return marker;
                         }
                         return null;
                    })()
                }
                {
                    ((toilet = this.state.marker.toilet) => {
                        if (toilet !== "undefined") {
                            const marker = toilet.map((point: LatLng, index: number) => {
                                return (
                                    // トイレののアイコンを表示
                                    <MarkerComponent key={index} latLng={point} icon={"toilet"} />
                                );
                            });
                            return marker;
                        }
                        return null;
                    })()
                }
                {
                    ((destination = this.state.marker.destination) => {
                        if (destination !== "undefined") {
                            const marker = destination.map((point: LatLng, index: number) => {
                                return (
                                    // 目的地のアイコンを表示
                                    <MarkerComponent key={index} latLng={point} icon={"destination"} />
                                );
                            });
                            return marker;
                        }
                        return null;
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
        backfaceVisibility: "hidden",
    },
});
