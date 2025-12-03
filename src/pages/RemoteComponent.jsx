import React, { useEffect } from "react";
import { loadScript } from "../utils/loadScript";
import { loadCSS } from "../utils/loadCss";

const RemoteComponent = ({ js, css, component }) => {
  console.log(js, "js from remotecomponent");
  console.log(css, "css from remotecomponent");
  console.log(component, "js from remotecomponent");
  useEffect(() => {
    // Load all JS files if array, otherwise just load the single file
    if (Array.isArray(js)) {
      console.log("is Array");
      for (var i = 0; i < js.length; i++) {
        loadScript(js[i].url);
      }
    }

    // Load all CSS files if array, otherwise just load the single file
    if (Array.isArray(css)) {
      for (var i = 0; i < css.length; i++) {
        loadCSS(css[i].url);
      }
    }
  }, [js, css, component]);

  return <div id={component}></div>;
};

export default RemoteComponent;
