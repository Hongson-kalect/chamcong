import { authorize, getUserInfo } from "zmp-sdk";

export const getUserPermisson = async () => {
  await authorize({
    scopes: ["scope.userLocation", "scope.userPhonenumber"],
    success: (data) => {
      // xử lý khi gọi api thành công
      return true;
    },
    fail: (error) => {
      // xử lý khi gọi api thất bại
      return false;
    },
  });
};
