import {  createBrowserRouter, Navigate } from "react-router";
import HomePage from "./admin/pages/home/HomePage";
import PedidosPage from "./admin/pages/pedidos/PedidosPage";
import PedidoPage from "./admin/pages/pedido/PedidoPage";
import CalendarioPage from "./admin/pages/calendario/CalendarioPage";
import AdminLayout from "./admin/layouts/AdminLayout";
import ProductosCatalogoPage from "./catalogos/pages/productos/ProductosCatalogoPage";
import ProductoCatalogo from "./catalogos/pages/producto/ProductoCatalogo";
import { lazy } from "react";
import AuthLayout from "./auth/layouts/AuthLayout";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { AdminRoute, NotAuthenticatedRoutes } from "./components/custom/routes/ProtectedRoutes";

const CatalogosLayout = lazy(() => import("./catalogos/layouts/CatalogosLayout"));

export const appRouter = createBrowserRouter([
    {
        path:'/auth',
        element:<NotAuthenticatedRoutes><AuthLayout></AuthLayout></NotAuthenticatedRoutes>,
        children:[
            {
                path:'login',
                element: <LoginPage></LoginPage>
            },
            {
                path:'register',
                element: <RegisterPage></RegisterPage>
            }
        ]
    },
    {
        path:'/',
        element:<AdminRoute><AdminLayout></AdminLayout></AdminRoute>,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>
            },
            {
                path:'pedidos',
                element:<PedidosPage></PedidosPage>
            },
            {
                path:'pedidos/:id',
                element: <PedidoPage></PedidoPage>
            },
            {
                path:'calendario',
                element: <CalendarioPage></CalendarioPage>
            }
        ]
    },
    {
        path: '/catalogos',
        element:<AdminRoute><CatalogosLayout></CatalogosLayout></AdminRoute>,
        children:[
            {
                index:true,
                element: <ProductosCatalogoPage></ProductosCatalogoPage>,
            },
            {
                path:'productos/:id',
                element: <ProductoCatalogo></ProductoCatalogo>
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/'></Navigate>
    }
]);