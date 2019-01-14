import * as React from "react";
import {Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";

import {MonoText} from "../components/StyledText";
import homeStyle from "../stylesheets/HomeScreen.scss";

interface Props {
    navigation: any; // navigation
}

export default class HomeScreen extends React.Component<Props, {}> {

    public static navigationOptions = {
        title: "fremap",
    };

    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
        <View style={homeStyle.rootContainer}>
            <ScrollView
                style={homeStyle.container}
                contentContainerStyle={homeStyle.contentContainer}
            >

            <View style={homeStyle.getStartedContainer}>
                {this._maybeRenderDevelopmentModeWarning()}

                <Text style={homeStyle.getStartedText}>Get started by opening</Text>

                <View style={[homeStyle.codeHighlightContainer, homeStyle.homeScreenFilename]}>
                    <MonoText style={homeStyle.codeHighlightText}>screens/HomeScreen.js</MonoText>
                </View>

                <Text style={homeStyle.getStartedText}>
                Change this text and your app will automatically reload.
                </Text>
                <Button
                    title="change screen"
                    onPress={() => this.props.navigation.navigate("Guide")}
                />
            </View>

            </ScrollView>

            <View style={[styles.tabBarInfoContainer, homeStyle.tabBarInfoContainer]}>
                <Text style={homeStyle.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

                <View style={[homeStyle.codeHighlightContainer, homeStyle.navigationFilename]}>
                    <MonoText style={homeStyle.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
                </View>
            </View>
        </View>
        );
    }

    public _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
        const learnMoreButton = ( <Text> Learn more </Text>);

        return (
            <Text style={homeStyle.developmentModeText}>
            Development mode is enabled, your app will be slower but you can use useful
            development tools. {learnMoreButton}
            </Text>
        );
        } else {
        return (
            <Text style={homeStyle.developmentModeText}>
            You are not in development mode, your app will run at full speed.
            </Text>
        );
        }
    }
}

const styles = StyleSheet.create({
    tabBarInfoContainer: {
        ...Platform.select({
        ios: {
            shadowColor: "black",
            shadowOffset: {
            height: -3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
        },
        android: {
            elevation: 20,
        },
        }),
    },
});
