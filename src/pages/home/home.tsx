import { removeCache } from "@/store/native.store";
import * as React from "react";
import { Button } from "zmp-ui";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const resetCache = async () => {
    await removeCache(["used", "used2"]);
    window.location.reload();
  };
  return (
    <div>
      Trang home nè
      <Button onClick={resetCache}>ádsad</Button>
    </div>
  );
}
