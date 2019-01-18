import * as React from 'react';
import { Polyline } from 'react-native-maps';

interface PolylineComponentProps {
  indoorLevel: string;
  guideLines: Array<{
    floor: string,
    path: Array<{
      latitude: number,
      longitude: number,
    }>,
  }>;
}

interface PolylineComponentState {
  indoorLevel: string;
}

export default class PolylineComponent extends React.Component<PolylineComponentProps, PolylineComponentState> {
  constructor(props: PolylineComponentProps) {
    super(props);
    this.state = {
      indoorLevel: this.props.indoorLevel,
    };
  }

  public componentWillReceiveProps(nextProps: PolylineComponentProps) {
    this.setState({
      indoorLevel: nextProps.indoorLevel,
    });
  }

  public render() {
    const polyline = this.polylineGenerate();
    return (
      polyline
    );
  }

  private polylineGenerate(floor = this.state.indoorLevel, guideLines = this.props.guideLines) {
    const currentGuideLines = guideLines.filter(guideLine => guideLine.floor === floor);
    if (currentGuideLines[0] == undefined) return null;
    const currentGuideLine = currentGuideLines[0].path;
    return (
      <Polyline
        coordinates={currentGuideLine}
        strokeWidth={6}
        lineCap={'round'}
        lineDashPattern={[2, 1]}
        lineJoin={'miter'}
        strokeColor={'#f00'}
      />
    );
  }
}
