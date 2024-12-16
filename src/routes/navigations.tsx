import { navigationsInterface } from "types";
import {
  Category,
  ClassOutlined,
  AddBoxOutlined,
  HomeMaxOutlined,
  EventSeatOutlined,
  LocalMallOutlined,
  StorefrontOutlined,
  ViewCarouselOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";

const navigations: navigationsInterface[] = [
  {
    id: 1,
    path: "/",
    title: "Home",
    icon: <HomeMaxOutlined />,
  },
  {
    id: 2,
    title: "Banner",
    path: "/pages/banner",
    icon: <ViewCarouselOutlined />,
  },
  {
    id: 3,
    title: "Box",
    path: "/pages/box",
    icon: <AddBoxOutlined />,
  },
  {
    id: 4,
    title: "Category",
    path: "/pages/category",
    icon: <Category />,
  },
  {
    id: 5,
    title: "Sub category",
    path: "/pages/sub-category",
    icon: <ClassOutlined />,
  },
  {
    id: 6,
    title: "Order",
    path: "/pages/order",
    icon: <ProductionQuantityLimitsOutlined />,
  },
  {
    id: 7,
    title: "Product",
    path: "/pages/product",
    icon: <LocalMallOutlined />,
  },
  {
    id: 8,
    title: "Sections",
    path: "/pages/sections",
    icon: <EventSeatOutlined />,
  },
  {
    id: 9,
    title: "Store",
    path: "/pages/store",
    icon: <StorefrontOutlined />,
  },
];

export default navigations;
