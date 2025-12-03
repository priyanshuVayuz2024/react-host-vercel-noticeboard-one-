import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterConfiguration } from "./router/index.jsx";
import { ActiveRoutesProvider } from "./ActiveRoutesContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ActiveRoutesProvider>
      <RouterConfiguration />
    </ActiveRoutesProvider>
  </Provider>

);
