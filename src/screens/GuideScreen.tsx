import * as React from "react";
import { View} from "react-native";

import { MonoText } from "../components/StyledText";
import guideStyle from "../stylesheets/GuideScreen.scss";

interface Props {
    navigation: any;
}

export default class GuideScreen extends React.Component<Props, {}> {
    public static navigationOptions = () => {
        return {
            title: "GuideScreen",
            // TODO left icon
            // headerLeft: (
            //     <Ionicons
            //         name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
            //     />
            // ),
        };
    }

    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <View style={guideStyle.container}>
                <View>
                    <MonoText>screen/GuideScreen</MonoText>
                </View>
            </View>
        );
    }
}
