import * as React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MarkerComponent from "./MarkerComponent";
import PolylineComponent from "./PolylineComponent";

interface MapViewComponentProps {
    indoorLevel: string;
    initializationLocation: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
    markers: [{
        movieMarkers: [{
            floor: string,
            movieId: number,
            latitude: number,
            longitude: number,
        }],
    }, {
        publicFacilityMarkers: [{
            floor: string,
            type: "toilet" | "elevator",
            latitude: number,
            longitude: number,
        }];
    }];
    guideLines: [{
        floor: string,
        path: [{
            latitude: number,
            longitude: number,
        }],
    }];
}

interface MapViewComponentState {
  indoorLevel: string;
  initializedLocation: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
  };
  currentStateMarkers: {
      movieMarkers: Array<{
          floor: string,
          movieId: number,
          latitude: number,
          longitude: number,
      }>,
      publicFacilityMarkers: Array<{
          floor: string,
          type: "toilet" | "elevator",
          latitude: number,
          longitude: number,
      }>;
  };
  markers: [{
      movieMarkers: Array<{
          floor: string,
          movieId: number,
          latitude: number,
          longitude: number,
      }>,
  }, {
      publicFacilityMarkers: Array<{
          floor: string,
          type: string,
          latitude: number,
          longitude: number,
      }>;
  }];
  guideLines: [{
      floor: string,
      path: [{
          latitude: number,
          longitude: number,
      }],
  }];
}

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export default class MapViewComponent extends React.Component <MapViewComponentProps, MapViewComponentState> {
    constructor(props: MapViewComponentProps) {
        super (props);
        this.state = {
            indoorLevel: this.props.indoorLevel,
            initializedLocation: this.props.initializationLocation,
            currentStateMarkers: this.currentStateMarkersGenerate(this.props.indoorLevel),
            markers: this.props.markers,
            guideLines: this.props.guideLines,
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
        const movieMarkers = this.state.currentStateMarkers.movieMarkers;
        const currentMovieMarker = movieMarkers.map((point, index: number) => {
            const latLng = {
                latitude: point.latitude,
                longitude: point.longitude,
            };
            return (
                <MarkerComponent key={index} latLng={latLng} iconName={"floor"} pinColor={"rgb(150,255,0)"} />
            );
        });

        const publicFacilityMarkers = this.state.currentStateMarkers.publicFacilityMarkers;
        // console.log(publicFacilityMarkers);
        const currentPublicFacilityMarker = publicFacilityMarkers.map((point, index: number) => {
            const latLng = {
                latitude: point.latitude,
                longitude: point.longitude,
            };
            const iconName = point.type;
            return (
                <MarkerComponent key={index} latLng={latLng} iconName={iconName} pinColor={"rgb(255,255,0)"}/>
            );
        });

        return (
            <View style={styles.container}>
                <MapView
                    showsTraffic={false}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={this.state.initializedLocation}
                    onRegionChange={(e: Region) => this.locationChange (e)} // 動くたび発火
                    minZoomLevel={18} // 初期拡大
                    // onPress={(e: any) => console.log (e.nativeEvent.coordinate)}
                    onIndoorLevelActivated={(e: any) => { this.indoorLevel (e.nativeEvent.IndoorLevel.name); }} // 現在参照している階をgetだぜ
                >
                {currentMovieMarker}
                {currentPublicFacilityMarker}
                <PolylineComponent
                    indoorLevel={this.state.indoorLevel}
                    guideLines={this.state.guideLines}
                />
                </MapView>
            </View>
        );
    }

    // 現在の階層を取得しそれに対応した階のピンを刺す情報に置き換える
    private indoorLevel(level: string) {
        const floor = level.substr(-2);
        // FIXME 階層を取得しているとたまに"Level 1"とか出てくるのでとりあえず無視
        if (floor !== "Level 1") {
            const currentStateMarkers = this.currentStateMarkersGenerate(floor);
            this.setState ({
                indoorLevel: floor,
                currentStateMarkers,
            });
        }
    }

    // 現在地を常に更新
    private locationChange(region: Region) {
        this.setState ({
            initializedLocation: region,
        });
    }

    // 階層を入れるとその階のマーカーの情報をcurrentStateMarkersに格納する
    private currentStateMarkersGenerate(indoorLevel: string, markers = this.props.markers) {
        const movieMarkers = markers[0].movieMarkers.filter(movieMarker => movieMarker.floor === indoorLevel);
        const publicFacilityMarkers = markers[1].publicFacilityMarkers.filter(publicFacilityMarker => publicFacilityMarker.floor === indoorLevel);
        const FloorMarkers = {
            movieMarkers,
            publicFacilityMarkers,
        };
        return FloorMarkers;
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 700,
        margin: 0,
        padding: 0,
        width: 420,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        backfaceVisibility: "hidden",

    },
});
