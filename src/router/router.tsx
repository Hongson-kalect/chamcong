import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import StartPage from "@/pages/start";
import GetPerMissonPage from "@/pages/getPermisson/pages";
import AppLayout from "@/layout/app.layout";
import DieuKhoan from "@/pages/dieukhoan/dieukhoan";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "@/pages/home/home";
import CreateWorkPage from "@/pages/taobangcong/taobangcong";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import TrangBangCong from "@/pages/bangcong/page";

const Router = () => {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <ZMPRouter>
              <AnimationRoutes>
                <Route path="/" element={<AppLayout />}>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="/home" element={<HomePage />}></Route>
                  <Route path="/bangcong" element={<TrangBangCong />}></Route>
                  <Route path="/start" element={<StartPage />}></Route>
                  <Route path="/dieu-khoan" element={<DieuKhoan />}></Route>
                  <Route
                    path="/create-work-page"
                    element={<CreateWorkPage />}
                  ></Route>
                  <Route
                    path="/get-permisson"
                    element={<GetPerMissonPage />}
                  ></Route>
                </Route>
              </AnimationRoutes>
            </ZMPRouter>
          </QueryClientProvider>
        </SnackbarProvider>
        <ToastContainer />
      </App>
    </RecoilRoot>
  );
};
export default Router;
