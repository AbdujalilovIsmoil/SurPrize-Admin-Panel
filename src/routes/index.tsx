import Routes from "./Routes";
import { Login } from "./authRoute";
import { createBrowserRouter } from "react-router-dom";
import {
  Box,
  Home,
  Error,
  Store,
  Order,
  Banner,
  Product,
  Category,
  Sections,
  SubCategory,
} from "./appRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Routes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <Banner />,
        path: "/pages/banner",
      },
      {
        element: <Box />,
        path: "/pages/box",
      },
      {
        element: <Category />,
        path: "/pages/category",
      },
      {
        element: <SubCategory />,
        path: "/pages/sub-category",
      },
      {
        element: <Order />,
        path: "/pages/order",
      },
      {
        element: <Product />,
        path: "/pages/product",
      },
      {
        element: <Sections />,
        path: "/pages/sections",
      },
      {
        element: <Store />,
        path: "/pages/store",
      },
    ],
  },
  {
    element: <Login />,
    path: "/pages/auth/login",
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default routes;
