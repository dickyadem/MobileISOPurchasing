import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { Divider, MD2Colors } from "react-native-paper";

const WidgetBaseSidebar = (props) => {
    const imageLogo =
    "https://cdn-icons-png.flaticon.com/512/1011/1011954.png?w=740&t=st=1684898738~exp=1684899338~hmac=337fff11d9a2af02f1fdbeaebf9026de4b08b86d5125a394d0ab1ad2abfe4ba5";

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
        backgroundColor: MD2Colors.purple100,
    },
    title: {
        textAlign: "center",
        paddingVertical: 16,
        fontSize: 16,
        backgroundColor: MD2Colors.purple100,
    },
    copyright: {
        fontSize: 16,
        textAlign: "center",
        color: "gray",
        paddingVertical: 16,
    },
});