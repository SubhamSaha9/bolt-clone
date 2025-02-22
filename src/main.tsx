import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index.ts";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeProvider.tsx";

const store = configureStore({
  reducer: rootReducer,
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
    >
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
        <Toaster />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);
