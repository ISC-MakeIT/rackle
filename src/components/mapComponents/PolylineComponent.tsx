import * as React from 'react';
import { Polyline } from 'react-native-maps';
import Colors from '../../constants/Colors';

interface Props {
  indoorLevel: string;
  guideLines:guideLines[];
  guideLinesColor?: string;
}

interface State {
  indoorLevel: string;
  guideLines: guideLines[];
}

interface guideLines {
  floor: string;
    latitude: number;
    longitude: number;
}

export default class PolylineComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      indoorLevel: this.props.indoorLevel,
      guideLines: this.props.guideLines,
    };
  }

  public componentWillReceiveProps(nextProps: Props) {
    this.setState({
      indoorLevel: nextProps.indoorLevel,
    });
  }

  public render() {
    return this.props.guideLinesColor == undefined ? this.createStrongColor() : this.createWeakColor(this.props.guideLinesColor);
  }

  private createStrongColor() {
    const currentGuideLines = this.props.guideLines.filter(guideLine => guideLine.floor === this.state.indoorLevel);
    if (currentGuideLines.length === 0) return null;
    const coordinates = currentGuideLines.map(currentGuideLine => {
      return {
        latitude: currentGuideLine.latitude,
        longitude: currentGuideLine.longitude,
      };
    });
      return (
        <Polyline
          coordinates={coordinates}
          strokeWidth={5}
          lineCap={'round'}
          lineDashPattern={[1.7, 1.5]}
          lineJoin={'miter'}
          strokeColor={Colors.mainColor}
          miterLimit={11}
        />
      );
  }

  private createWeakColor(color: string) {
    const currentGuideLines = this.props.guideLines.filter(guideLine => guideLine.floor !== this.state.indoorLevel);
    if (currentGuideLines.length === 0) return null;
    const coordinates = currentGuideLines.map(currentGuideLine => {
      return {
        latitude: currentGuideLine.latitude,
        longitude: currentGuideLine.longitude,
      };
    });
      return (
        <Polyline
          coordinates={coordinates}
          strokeWidth={5}
          lineCap={'round'}
          lineDashPattern={[1.7, 1.5]}
          lineJoin={'miter'}
          strokeColor={color}
          miterLimit={11}
        />
      );
  }
}
