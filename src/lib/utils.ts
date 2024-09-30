import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSetting, getUserInfo } from "zmp-sdk/apis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setCookie(cname: string, cvalue, hour: number) {
  const d = new Date();
  const value = JSON.stringify(cvalue);
  d.setTime(d.getTime() + hour * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return "";
}

export function delete_cookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export const checkUserPermisson = async () => {
  try {
    const data = await getSetting({});
    console.log("data", data);
    return data;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log("error", error);
    return false;
  }
};

export const checkUserInfo = async () => {
  try {
    const { userInfo } = await getUserInfo({});
    console.log("userInfo", userInfo);
    return userInfo;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
    return false;
  }
};
