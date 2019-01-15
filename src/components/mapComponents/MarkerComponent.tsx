import * as React from "react";
import {  Marker } from "react-native-maps";

interface MarkerComponentProps {
    key: number;
    latLng: {
        latitude: number;
        longitude: number;
    };
    icon: string;
}

interface MarkerComponentState {
    coordinate: {
        latitude: number,
        longitude: number,
    };
    icon: string;
}

export default class MarkerComponent extends React.Component <MarkerComponentProps, MarkerComponentState> {
    constructor(props: MarkerComponentProps) {
        super (props);
        this.state =  {
            coordinate: this.props.latLng,
            icon: this.props.icon,
        };
    }

    // propsの更新。これをしないとマーカーが更新されない
    public componentWillReceiveProps(nextProps: MarkerComponentProps) {
        this.setState ({
            coordinate: nextProps.latLng,
            icon: nextProps.icon,
        });
    }

    public render() {
       return (
            <Marker
                coordinate={this.state.coordinate}
                tracksInfoWindowChanges={false}
                image={this.iconChange ()}
            />
        );
    }

    // 必要な画像をしてい
    private iconChange() {
        if (this.state.icon === "toilet") return require("../../../assets/images/toilet.jpg");
    }
}
