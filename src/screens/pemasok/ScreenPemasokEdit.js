import { useEffect, useState } from "react";
import {
    ServicePemasokDelete,
    ServicePemasokEdit,
} from "../../services/ServicePemasok";
import { Alert, ScrollView, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import { SafeAreaView } from "react-native-safe-area-context";
import _ from "lodash";

const ScreenPemasokEdit = ({ navigation, route }) => {
    const [complete, setComplete] = useState(false);
    const [pemasok, setPemasok] = useState({});

    const handleChange = (name, value) => {
        setPemasok((values) => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        const time = setTimeout(() => {
            setPemasok(route.params.pemasok);
            setComplete(true);
        }, 1000);

        return () => clearTimeout(time);
    }, [route.params.pemasok]);

    const handleServicePemasokEdit = () => {
        setComplete(false);
        const debounce = _.debounce(() => {
            ServicePemasokEdit(pemasok)
                .then(() => {
                    Alert.alert("Notifikasi", "Berhasil");
                    navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setComplete(true));
        }, 1000);

        debounce();
    };

    const handleServicePemasokDelete = () => {
        Alert.alert("Konfirmasi", "Yakin ingin menghapus?", [
            {
                text: "Yakin",
                onPress: () => {
                    ServicePemasokDelete(pemasok.kodePemasok)
                        .then(() => {
                            Alert.alert("Berhasil", "Barang berhasil dihapus!");
                            navigation.goBack();
                        })
                        .catch(() => { });
                },
            },
            {
                text: "Batal",
                style: "cancel",
            },
        ]);
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <Appbar.Header>
                    <Appbar.BackAction
                        disabled={!complete}
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content title="Edit Pemasok" />
                    <Appbar.Action
                        disabled={!complete}
                        icon="trash-can-outline"
                        onPress={handleServicePemasokDelete}
                    />
                </Appbar.Header>
                <WidgetBaseLoader complete={complete} />
                {complete && (
                    <ScrollView style={{
                        marginVertical: 24,
                        marginHorizontal: 24,
                    }}>
                        <View style={{ gap: 24 }}>
                            <TextInput
                                value={pemasok.kodePemasok || ""}
                                onChangeText={(text) => handleChange("kodePemasok", text)}
                                mode="outlined"
                                label="Kode Pemasok"
                                disabled
                            />

                            <TextInput
                                value={pemasok.namaPemasok || ""}
                                onChangeText={(text) => handleChange("namaPemasok", text)}
                                mode="outlined"
                                label="Nama Pemasok"
                            />

                            <TextInput
                                value={pemasok.teleponPemasok || ""}
                                onChangeText={(text) => handleChange("teleponPemasok", text)}
                                mode="outlined"
                                label="Telepon Pemasok"
                            />

                            <TextInput
                                value={pemasok.alamatPemasok || ""}
                                onChangeText={(text) => handleChange("alamatPemasok", text)}
                                mode="outlined"
                                label="Alamat Pemasok"
                            />
                        </View>
                        <WidgetBaseGroup>
                            <Button onPress={handleServicePemasokEdit} mode="contained">
                                Simpan Perubahan
                            </Button>
                        </WidgetBaseGroup>
                    </ScrollView>
                )}

            </SafeAreaView>
        </>
    );
};

export default ScreenPemasokEdit;