// React core
import React from "react";
import { createRoot } from "react-dom/client";
import "react-image-gallery/styles/css/image-gallery.css";

// Tailwind stylesheet
import "./global.css";
import "css/tailwind.css";

// ZaUI stylesheet
import "zmp-ui/zaui.css";

// Your stylesheet
import "css/app.scss";
import "react-calendar/dist/Calendar.css";

// Expose app configuration
import appConfig from "../app-config.json";
if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

// Mount the app
import Router from "@/router/router";
const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(Router));
