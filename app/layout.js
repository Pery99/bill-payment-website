"use client";
import { ThemeProvider } from "@material-tailwind/react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body>
          <Toaster />
          <Provider store={store}>{children}</Provider>
        </body>
      </html>
    </ThemeProvider>
  );
}
