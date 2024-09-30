import * as React from "react";

export interface IHomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout(props: IHomeLayoutProps) {
  //   const;

  return <div>{props.children}</div>;
}
