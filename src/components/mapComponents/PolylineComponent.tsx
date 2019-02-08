import * as React from 'react';
import { Polyline } from 'react-native-maps';
import Colors from '../../constants/Colors';
import { LocationPoint } from '../../domains/map';

interface Props {
  indoorLevel: string;
  guideLines: LocationPoint[];
  guideLinesColor?: string;
}

interface State {
  indoorLevel: string;
  guideLines: LocationPoint[];
}


export default class PolylineComponent extends React.Component<Props, State> {
  readonly state = {
    indoorLevel: this.props.indoorLevel,
    guideLines: this.props.guideLines,
  };

  public componentWillReceiveProps(nextProps: Props) {
    this.setState({
      indoorLevel: nextProps.indoorLevel,
    });
  }

  public render() {
    return this.createLineColor(this.props.guideLinesColor);
  }

  private createLineColor(color = Colors.mainColor) {
    const currentGuideLines = this.props.guideLinesColor ?
      this.props.guideLines : this.props.guideLines.filter(guideLine => guideLine.floor === this.state.indoorLevel);
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
          lineDashPattern={[1.7, 2]}
          lineJoin={'miter'}
          strokeColor={color}
          miterLimit={11}
        />
      );
  }
}
