import * as React from "react";
import { View } from "react-native";

// import { Ionicons } from "@expo/vector-icons";
import { MonoText } from "../components/StyledText";
import guideStyle from "../stylesheets/GuideScreen.scss";

interface Props { navigation: any; }

export default class GuideScreen extends React.Component<Props, {}> {
    public static navigationOptions = (navigation: any) => {
        return {
            title: "GuideScreen",
            // TODO
            // header: ({ goBack }) => ({
            //     left: (
            //         <Ionicons
            //             name={Platform.OS  === "ios" ? "ios-arrow-back" : "md-arrow-back"}
            //             onPress={() => { goBack() }}
            //         />
            //     ),
            // }),
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
