
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../src/layouts/DefaultLayout.jsx";
import GuestLayout from "../src/layouts/GuestLayout.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import GuestProductsPage from "./pages/GuestProductsPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProductsPage from "./pages/users/ProductsPage.jsx";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/registration',
                element: <SignUpPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/products',
                element: <GuestProductsPage />
            }
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard/>,
            },
            {
                path: '/products',
                element: <ProductsPage/>,
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

export default Router;
