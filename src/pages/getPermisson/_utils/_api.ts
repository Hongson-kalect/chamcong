import { authorize, getUserInfo } from "zmp-sdk";

export const getUserPermisson = async () => {
  try {
    const data = await authorize({
      scopes: ["scope.userLocation", "scope.userPhonenumber"],
    });
    console.log("data", data);
    return data;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log("error", error);
    console.log(error);
  }
};
