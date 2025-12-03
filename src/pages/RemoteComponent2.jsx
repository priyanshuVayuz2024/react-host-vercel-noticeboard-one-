import React, { useEffect } from 'react';
import { loadScript } from '../utils/loadScript';
import { loadCSS } from '../utils/loadCss';

const RemoteComponent2 = ({js, css, component}) => {
  useEffect(() => {
    loadScript(js);
    if(css){
        loadCSS(css);
    }
    
  }, [component]);

  return (
    <>
        <div id={component}></div>
    </>
  );
}

export default RemoteComponent2;
