import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React from "react";
import { AdminHeaderPropsType } from "../../Models";

export default function AdminHeader(props: AdminHeaderPropsType) {
  const { displayName, photoURL } = props.currentUser || {};

  return (
    <PageHeader
      backIcon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      className="site-layout-background"
      onBack={props.toggleCollapsed}
      title={props.currentRouteText}
      avatar={{
        size: 40,
        src: photoURL,
        style: { right: 0, position: "absolute" },
      }}
    />
  );
}
