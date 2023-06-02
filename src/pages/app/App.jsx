import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import MyAccount from "../myAccount/MyAccount";
import MyOrders from "../myOrders/MyOrders";
import MyOrder from "../myorder/MyOrder";
import NotFound from "../notFound/NotFound";
import SignIn from "../signIn/SignIn";
import NavBar from "./../../components/navbar/NavBar";
import { ShoppingCartProvider } from "../../context/index";
import CheckoutSideMenu from "../../components/checkoutSideMenu/CheckoutSideMenu";

import "./App.css";

//Crear las rutas de la app
const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/clothes", element: <Home /> },
    { path: "/electronics", element: <Home /> },
    { path: "/furnitures", element: <Home /> },
    { path: "/toys", element: <Home /> },
    { path: "/others", element: <Home /> },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />

        <NavBar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
