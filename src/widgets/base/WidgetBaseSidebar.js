import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { Divider, MD2Colors } from "react-native-paper";

const WidgetBaseSidebar = (props) => {
    const imageLogo =
        "https://icons.iconarchive.com/icons/inipagi/business-economic/512/store-icon.png";

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Image style={styles.imageLogo} source={{ uri: imageLogo }} />
            <Text style={styles.title}>Mobile SISFO Purchasing</Text>

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <Divider />
            <Text style={styles.copyright}>Adem © {new Date().getFullYear()}</Text>
        </SafeAreaView>
    );
};

export default WidgetBaseSidebar;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        marginTop: 0,
    },

    imageLogo: {
        resizeMode: "center",
        width: "100%",
        height: "20%",
        alignSelf: "center",
        backgroundColor: MD2Colors.amber100,
    },
    title: {
        textAlign: "center",
        paddingVertical: 16,
        fontSize: 16,
        backgroundColor: MD2Colors.amber100,
    },
    copyright: {
        fontSize: 16,
        textAlign: "center",
        color: "gray",
        paddingVertical: 16,
    },
});