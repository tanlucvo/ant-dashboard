/*
    Routes belongs in this file. use 'isSidemenu' if you want the route to show in sidebar.
    Use @ant-design/icons for the icon in sidebar.
    You can change the code in Sidebar.tsx
*/


import {
    AppstoreOutlined, FileOutlined, MinusOutlined
} from "@ant-design/icons";
// type for route
import { RouteType } from "./Models";
// Dashboard
import Dashboard from "./Views/Dashboard";
// Pages
import BlankPage from "./Views/Pages/BlankPage";
import Login from "./Views/Pages/Login";
import Page403 from "./Views/Pages/Page403";
import Page404 from "./Views/Pages/Page404";
import Page500 from "./Views/Pages/Page500";
const Routes: RouteType[] = [
    // Default 404 Not Found Page
    
    {
        path: "/error/404",
        name: "Dashboard",
        icon: AppstoreOutlined,
        component: Page404,
        layout: "/admin",
        isSidemenu: false,
    },
    {
        path: "/index",
        name: "Dashboard",
        icon: AppstoreOutlined,
        component: Dashboard,
        layout: "/admin",
        isSidemenu: true,
    },
    {
        path: "/pages",
        name: "Pages",
        icon: FileOutlined,
        component: Dashboard,
        layout: "/admin",
        isSidemenu: true,
        subMenu: [
            {
                path: "/pages/blank",
                name: "Blank Page",
                icon: MinusOutlined,
                component: BlankPage,
                layout: "/admin",
                isSidemenu: true,
            },
            {
                path: "/login",
                name: "Login",
                icon: MinusOutlined,
                component: Login,
                layout: "/auth",
                isSidemenu: true,
            },
            {
                path: "/pages/404",
                name: "404",
                icon: MinusOutlined,
                component: Page404,
                layout: "/admin",
                isSidemenu: true,
            },
            {
                path: "/pages/500",
                name: "500",
                icon: MinusOutlined,
                component: Page500,
                layout: "/admin",
                isSidemenu: true,
            },
            {
                path: "/pages/403",
                name: "403",
                icon: MinusOutlined,
                component: Page403,
                layout: "/admin",
                isSidemenu: true,
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        icon: MinusOutlined,
        component: Login,
        layout: "/auth",
        isSidemenu: false,
    },
]

export default Routes;