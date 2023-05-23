import _ from "lodash";
import { useState, useEffect } from "react";
import { Modal } from "react-native";
import { ScrollView } from "react-native";
import {
    ActivityIndicator,
    Appbar,
    DataTable,
    List,
    Portal,
    Provider,
    Searchbar,
} from "react-native-paper";
import { ServicePemasokList } from "../../services/ServicePemasok";
import WidgetBaseLoader from "../base/WidgetBaseLoader";

const WidgetPemasokChoice = ({ onPress }) => {
    const [daftarPemasok, setDaftarPemasok] = useState([]);
    const [complete, setComplete] = useState(false);
    const [visible, setVisible] = useState(false);

    const pemasokList = () => {
        setComplete(false);

        const debounce = _.debounce(() => {
            ServicePemasokList()
                .then(({ results }) => {
                    setDaftarPemasok(results);
                })
                .catch((error) => console.log(error))
                .finally(() => setComplete(true));
        }, 500);

        debounce();
    };

    useEffect(() => {
        pemasokList();
    }, []);

    return (
        <>
            <Provider>
                <Portal>
                    <Modal
                        animationType="fade"
                        style={{ backgroundColor: "#ffffff" }}
                        visible={visible}>
                        <Appbar.Header>
                            <Appbar.Action
                                icon="arrow-left"
                                onPress={() => setVisible(false)}
                            />
                            <Appbar.Content title="Pilih Pemasok" />
                        </Appbar.Header>

                        {complete && (
                            <ScrollView
                                contentContainerStyle={{
                                    paddingBottom: 24,
                                }}>
                                <Searchbar
                                    placeholder="Search"
                                    onChangeText={(text) => { }}
                                    onSubmitEdit={() => { }}
                                    style={{
                                        marginHorizontal: 16,
                                        marginVertical: 16,
                                    }}
                                />

                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Kode Pemasok</DataTable.Title>
                                        <DataTable.Title>Nama Pemasok</DataTable.Title>
                                        <DataTable.Title numeric>Telepon</DataTable.Title>
                                    </DataTable.Header>

                                    {daftarPemasok.map((pemasok, index) => (
                                        <DataTable.Row
                                            key={index}
                                            onPress={() => {
                                                _.debounce(() => {
                                                    onPress(pemasok);
                                                    setVisible(false);
                                                }, 100)();
                                            }}>
                                            <DataTable.Cell>{pemasok.kodePemasok}</DataTable.Cell>
                                            <DataTable.Cell>{pemasok.namaPemasok}</DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {pemasok.teleponPemasok}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable>
                            </ScrollView>
                        )}
                        <WidgetBaseLoader complete={complete} />
                    </Modal>
                </Portal>

                <List.Section style={{ paddingHorizontal: 16 }}>
                    <List.Item
                        title="Pilih Pemasok"
                        onPress={() => setVisible(true)}
                        left={() => (
                            <>
                                {!complete && <ActivityIndicator animating={!complete} />}
                                {complete && <List.Icon icon="account-search-outline" />}
                            </>
                        )}></List.Item>
                </List.Section>
            </Provider>
        </>
    );
};

export default WidgetPemasokChoice;