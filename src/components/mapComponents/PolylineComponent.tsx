import * as React from 'react';
import { Polyline } from 'react-native-maps';
import Colors from '../../constants/Colors';

interface Props {
  indoorLevel: string;
  guideLines: {
    floor: string,
    lineLatLng: {
      latitude: number,
      longitude: number,
    }[],
  }[];
}

interface State {
  indoorLevel: string;
}

export default class PolylineComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      indoorLevel: this.props.indoorLevel,
    };
  }

  public componentWillReceiveProps(nextProps: Props) {
    this.setState({
      indoorLevel: nextProps.indoorLevel,
    });
  }

  public render() {
    const currentGuideLines = this.props.guideLines.filter(guideLine => guideLine.floor === this.state.indoorLevel);
    if (currentGuideLines[0] == undefined) return null;
    const currentGuideLine = currentGuideLines[0].lineLatLng;
    return (
      <Polyline
        coordinates={currentGuideLine}
        strokeWidth={5}
        lineCap={'round'}
        lineDashPattern={[1.7, 1.5]}
        lineJoin={'miter'}
        strokeColor={Colors.mainColor}
        miterLimit={11}
      />
    );
  }
}
