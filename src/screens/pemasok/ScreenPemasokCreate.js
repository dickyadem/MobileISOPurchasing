import { useCallback, useState } from "react";
import SchemaPemasok from "../../schema/SchemaPemasok";
import { useFocusEffect } from "@react-navigation/native";
import { ServicePemasokCreate } from "../../services/ServicePemasok";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { ScrollView, View } from "react-native";

const ScreenPemasokCreate = ({ navigation, route }) => {
    const [pemasok, setPemasok] = useState(SchemaPemasok);
    const [complete, setComplete] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const time = setTimeout(() => {
                setComplete(true);
            }, 1000);
        }, [])
    );

    const handleChange = (name, value) => {
        setPemasok((values) => ({ ...values, [name]: value }));
    };

    const handleServicePemasokCreate = () => {
        ServicePemasokCreate(pemasok)
            .then(() => {
                navigation.goBack();
            })
            .catch(() => { });
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction
                    disabled={!complete}
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content title="Tambah Pemasok" />
            </Appbar.Header>
            <WidgetBaseLoader complete={complete} />
            {complete && (
                <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                    <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
                        <TextInput
                            value={pemasok.kodePemasok || ""}
                            onChangeText={(text) => handleChange("kodePemasok", text)}
                            mode="outlined"
                            label="Kode Pemasok"
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
                        <Button
                            compact={false}
                            onPress={handleServicePemasokCreate}
                            mode="contained"
                        >
                            Simpan
                        </Button>
                    </View>
                </ScrollView>
            )}
        </>
    );
};

export default ScreenPemasokCreate;