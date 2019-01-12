import { Icon } from "expo";
import * as React from "react";

import Colors from "../constants/Colors";

interface Props {
  name: string;
  focused: boolean;
}

export default class TabBarIcon extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
