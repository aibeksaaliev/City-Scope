import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "@/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { addInterceptors } from "@/configs/axiosApi";
import MainLayout from "@/components/Layouts/MainLayout";
import LayoutWrapper from "@/components/Layouts/LayoutWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_CLIENT_ID = '231307494375-32534kje7hjgfk374s81e0ab3jm2dcg0.apps.googleusercontent.com';


addInterceptors(store);

export default function App({ Component, pageProps }: AppProps) {

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}
