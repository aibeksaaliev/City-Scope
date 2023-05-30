import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "@/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { addInterceptors } from "@/configs/axiosApi";
import MainLayout from "@/components/Layouts/MainLayout";

addInterceptors(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </PersistGate>
    </Provider>
  );
}
