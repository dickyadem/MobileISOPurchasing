import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const WidgetBaseLogo = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    // uri: "https://icons.iconarchive.com/icons/inipagi/business-economic/512/store-icon.png",
                    uri: "https://cdn-icons-png.flaticon.com/512/1011/1011954.png?w=740&t=st=1684898738~exp=1684899338~hmac=337fff11d9a2af02f1fdbeaebf9026de4b08b86d5125a394d0ab1ad2abfe4ba5",
                }}
            />
            <Text variant="titleMedium">Mobile SISFO Purchasing</Text>
            <Text variant="bodySmall">By Adem {new Date().getFullYear()}</Text>
        </View>
    );
};

export default WidgetBaseLogo;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    image: {
        resizeMode: "center",
        width: 160,
        height: 160,
        alignSelf: "center",
    },
});