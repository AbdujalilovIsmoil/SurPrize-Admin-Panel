import { lazy } from "react";

const Box = lazy(() => import("pages/Box"));
const Home = lazy(() => import("pages/Home"));
const Order = lazy(() => import("pages/Order"));
const Error = lazy(() => import("pages/Error"));
const Store = lazy(() => import("pages/Store"));
const Banner = lazy(() => import("pages/Banner"));
const Product = lazy(() => import("pages/Product"));
const Category = lazy(() => import("pages/Category"));
const Sections = lazy(() => import("pages/Sections"));
const SubCategory = lazy(() => import("pages/SubCategory"));

export {
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
};
