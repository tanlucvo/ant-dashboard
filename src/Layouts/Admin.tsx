import { Layout } from "antd";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminFooter from "../Components/Footer/AdminFooter";
import AdminHeader from "../Components/Header/AdminHeader";
import Sidebar from "../Components/Sidebar/Sidebar";
import { RouteType } from "../Models";
import Routes from "../Routes";
const { Content } = Layout;

export default function AdminLayout(props: { location: any }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const getRoutes = (layoutRoutes: RouteType[]): null | any => {
    return layoutRoutes.map((prop, key) => {
      // if a route doesn't have any subMenu and its layout is admin
      const propPath = prop.layout + prop.path;
      if (prop.layout === "/admin" && !prop.subMenu) {
        return (
          <Route
            exact
            path={propPath}
            component={(): JSX.Element => <prop.component />}
            key={key}
          />
        );
        // For route that has suMenu, loop each item and find the exact route
      } else if (prop.subMenu) {
        return (
          prop.subMenu !== undefined &&
          prop.subMenu.map((sub, key) => {
            return (
              <Route
                exact
                path={sub.layout + sub.path}
                component={sub.component}
                key={key}
              />
            );
          })
        );
      }
      return <Redirect to="/admin/error/404" key={key} />;
    });
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const getCurrentRouteText = (
    path: string,
    thisRoutes: RouteType[]
  ): string => {
    for (let i = 0; i < thisRoutes.length; i += 1) {
      const menu = thisRoutes[i];
      if (path.includes(menu.layout + menu.path) && !menu.subMenu) {
        return menu.name;
      }
      if (menu.subMenu) {
        for (let j = 0; j < menu.subMenu.length; j++) {
          const subMenu = menu.subMenu[j];
          if (path === subMenu.layout + subMenu.path) {
            return subMenu.name;
          }
        }
      }
    }
    return "Brand";
  };
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
    });
  }, []);

  if(!currentUser){
      return <Redirect to="/auth/login"/>
  }

  return (
    <React.Fragment>
      <Layout>
        <Sidebar collapsed={collapsed} routes={Routes} />
        <Layout
          className="site-layout"
          style={{ marginLeft: collapsed ? 0 : 200, minHeight: "100vh" }}
        >
          <AdminHeader
            currentRouteText={getCurrentRouteText(
              props.location.pathname,
              Routes
            )}
            collapsed={collapsed}
            routes={Routes}
            toggleCollapsed={toggleCollapsed}
            currentUser={currentUser}
          />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Switch>{getRoutes(Routes)}</Switch>
            </div>
          </Content>
          <AdminFooter />
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
