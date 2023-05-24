import AsyncStorage from "@react-native-async-storage/async-storage";
import { ServiceBaseRequest } from "./ServiceBase";
import { CONFIG_BASE_API_URL } from "../config/ConfigBase";

export const ServicePembelianCreate = (payload) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/pembelian`, payload, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};
export const ServicePembelianList = (page, terms) => {
  return new Promise(async (resolve, reject) => {
      const config = {
          headers: {
              "x-access-token": await AsyncStorage.getItem("@token"),
              params: { page, terms },
          },
      };

      ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/Pembelian`, config)
          .then((response) => {
              const { results, ...pagination } = response.data;
              resolve({ results, ...pagination });
          })
          .catch((error) => reject(error));
  });
};
export const ServicePembelianShare = (faktur) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
      responseType: "blob",
    };

    ServiceBaseRequest.post(
      `${CONFIG_BASE_API_URL}/pembelian/${faktur}/faktur-excel`,
      null,
      config
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};

export const ServicePembelianEdit = (payload) => {
  return new Promise(async (resolve, reject) => {
      const config = {
          headers: {
              "x-access-token": await AsyncStorage.getItem("@token"),
          },
      };

      ServiceBaseRequest.put(
          `${CONFIG_BASE_API_URL}/pembelian/${payload.faktur}`,
          payload,
          config
      )
          .then((response) => {
              resolve(response.data);
          })
          .catch((error) => reject(error));
  });
};

export const ServicePembelianDelete = (faktur) => {
  return new Promise(async (resolve, reject) => {
      const config = {
          headers: {
              "x-access-token": await AsyncStorage.getItem("@token"),
          },
      };

      ServiceBaseRequest.delete(
          `${CONFIG_BASE_API_URL}/pembelian/${faktur}`,
          config
      )
          .then(() => {
              resolve(null);
          })
          .catch((error) => reject(error));
  });
};