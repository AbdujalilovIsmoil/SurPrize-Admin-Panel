import App from "./App.tsx";
import store from "store";
import { Suspense } from "react";
import { Loader } from "components";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./assets/styles/globals.css";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attempIndex) => Math.min(1000 * 2 ** attempIndex, 30000),
    },
  },
});

interface ToastProps extends ToastContainerProps {}

const toast: ToastProps = {
  autoClose: 2000,
  pauseOnHover: false,
  draggable: false,
};

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <ToastContainer {...toast} />
        <App />
      </Suspense>
    </QueryClientProvider>
  </Provider>
);
