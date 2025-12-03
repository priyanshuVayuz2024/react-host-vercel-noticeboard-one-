import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getMuiTheme } from "./theme/muiTheme";
import React from "react";
import * as MaterialUI from "@mui/material";
import ReactDOM from "react-dom";
import * as EmotionReact from "@emotion/react";
import * as EmotionStyled from "@emotion/styled";
import * as MuiIcons from "@mui/icons-material";
import * as StylesMUI from "@mui/material/styles";
import * as ReactRouterDOM from "react-router-dom";
import * as TiptapMUI from "mui-tiptap";
import * as TiptapStarterMUI from "@tiptap/starter-kit";
import * as XDatePickerMUI from "@mui/x-date-pickers";
import * as XDatePickerAdapterMUI from "@mui/x-date-pickers/AdapterDateFns";
import MicrofrontendLoader from "./MFloader/MicroFrontendLoader";
import * as CryptoJS from "crypto-js";
import * as ReactHotToast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { OnlineStatus } from "./components/OnlineStatus";
import * as ReactPdf from "react-pdf";
import { pdfjs } from "react-pdf";
// import * as Axios from "axios";
import * as ChartJs from "chart.js";
import * as ReactChartJs2 from "react-chartjs-2";
import * as ReactGridLayout from "react-grid-layout";

function App() {
  window.EmotionReact = EmotionReact;
  window.EmotionStyled = EmotionStyled;
  window.MuiIcons = MuiIcons;
  window.TiptapMUI = TiptapMUI;
  window.TiptapStarterMUI = TiptapStarterMUI;
  window.XDatePickerMUI = XDatePickerMUI;
  window.CryptoJS = CryptoJS;
  window.StylesMUI = StylesMUI;
  window.process = { env: {} };
  window.React = React;
  window.ReactDOM = ReactDOM;
  window.MaterialUI = MaterialUI;
  window.ReactRouterDOM = ReactRouterDOM;
  window.XDatePickerAdapterMUI = XDatePickerAdapterMUI;
  window.ReactHotToast = ReactHotToast;
  window.MicrofrontendLoader = MicrofrontendLoader;
  window.ReactPdf = ReactPdf;
  // window.navigateGlobal = useNavigate();

  // window.Axios = Axios
  window.ChartJs = ChartJs
  window.ReactChartJs2 = ReactChartJs2;
  window.ReactGridLayout = ReactGridLayout;



  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Toaster containerStyle={{ inset: "0px" }} />
      <OnlineStatus />
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
