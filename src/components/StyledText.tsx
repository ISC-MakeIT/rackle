import * as React from "react";
import { StyleProp, Text, TextStyle} from "react-native";

interface Props {
  text: string;
  style: StyleProp<TextStyle>;
}

export class MonoText extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: "space-mono" }]} />;
  }
}
