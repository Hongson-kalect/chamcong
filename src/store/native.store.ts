import { getStorage, removeStorage, setStorage } from "zmp-sdk/apis";

export const setCache = async (data: { key: string; value: any }[]) => {
  const cache = {};
  data.map((item) => {
    cache[item.key] = item.value;
  });
  try {
    const { errorKeys } = await setStorage({
      data: cache,
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const getCaches = async (keys: string[]) => {
  try {
    const data = await getStorage({
      keys,
    });
    return data;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
export const getCache = async (keys: string) => {
  try {
    const data = await getStorage({
      keys: [keys],
    });
    return data?.[keys];
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const removeCache = async (keys: string[]) => {
  try {
    const data = await removeStorage({
      keys,
    });
    return data;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
