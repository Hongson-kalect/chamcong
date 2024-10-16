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

export const getDate = (date?: Date, format?: "date" | "datetime") => {
  if (!date) date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  const datetime = `${year}-${month}-${day}T-${hour}-${minute}`;
  const dateOnly = `${year}-${month}-${day}`;
  if (format === "datetime") return datetime;
  return dateOnly;
};

export function getFirstAndLastDayOfMonth(year, month) {
  // Tạo đối tượng Date cho ngày đầu tiên của tháng
  let firstDay = new Date(Date.UTC(year, month - 1, 1));

  // Tạo đối tượng Date cho ngày cuối cùng của tháng
  let lastDay = new Date(Date.UTC(year, month, 0));

  // Định dạng ngày theo yyyy-mm-dd
  let options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };
  let firstDayFormatted = firstDay.toLocaleDateString("en-CA", options);
  let lastDayFormatted = lastDay.toLocaleDateString("en-CA", options);

  return {
    firstDay: firstDayFormatted,
    lastDay: lastDayFormatted,
  };
}

export function getTimeDiff(date1, date2) {
  //08:00:00
  const date1Minus = date1.split(":");
  const date2Minus = date2.split(":");
  return (date1Minus[0] - date2Minus[0]) * 60 + (date1Minus[1] - date2Minus[1]);
}

export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function numberToCurrency2(
  input: number | string,
  gap: number = 3,
  symbol: string = ","
) {
  let result = "";

  const text = input.toString();
  let i = 0;
  while (i < text.length) {
    if (i !== 0 && (text.length - i) % gap === 0) result += symbol + text[i];
    else result += text[i];
    i++;
  }

  return result;
}
