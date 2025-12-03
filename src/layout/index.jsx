// import { useMemo, useState, useRef, useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import MicrofrontendLoader from "../MFloader/MicroFrontendLoader";

// export const PrimaryLayout = () => {
//   const [open, setOpen] = useState(true);
//   const user = localStorage.getItem("user");
//   const mfRef = useRef(null);
//   const headerRef = useRef(null);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   console.log(token, "token from layout");

//   const [headerLoaded, setHeaderLoaded] = useState(false);
//   const [sidebarLoaded, setSidebarLoaded] = useState(false);

//   useEffect(() => {
//     if (!token) {
//       navigate("/sign-in");
//       return;
//     }
//   }, [token, navigate]);

//   const stableProps = useMemo(
//     () => ({
//       open,
//       setOpen,
//     }),
//     []
//   );

//   // Update MF props when location changes
//   useEffect(() => {
//     if (mfRef.current?.updateProps) {
//       mfRef.current.updateProps({ open, setOpen });
//     }
//     if (headerRef.current?.updateProps) {
//       headerRef.current.updateProps({ open, setOpen });
//     }
//   }, [open]);

//   const layoutBundlesLoaded = headerLoaded && sidebarLoaded;

//   return (
//     <>
//       {token && (
//         <MicrofrontendLoader
//           ref={headerRef}
//           scriptUrl={
//             "https://d18aratlqkym29.cloudfront.net/frontend-build/header/1.1/mf/header-bundle.js" +
//             `?date=${Date.now()}`
//           }
//           // scriptUrl="http://localhost:5000/header-bundle.js"
//           mountDivId="headerMain"
//           globalVarName="headerMain"
//           propsToPass={stableProps}
//           onLoad={() => setHeaderLoaded(true)}
//         />
//       )}
//       <div className="flex bg-var(--color-primary)">
//         {token && (
//           <MicrofrontendLoader
//             ref={mfRef}
//             // scriptUrl={
//             //   "https://anarock-staging.s3.us-east-1.amazonaws.com/anarock-frontend-react/sidebar/1.1/mf/sidebar-bundle.js" +
//             //   `?date=${Date.now()}`
//             // }
//             scriptUrl={
//               "https://d18aratlqkym29.cloudfront.net/frontend-build/sidebar/1.1/mf/sidebar-bundle.js" +
//               `?date=${Date.now()}`
//             }
//             // scriptUrl="http://localhost:4000/sidebar-bundle.js"
//             mountDivId="sidebarMain"
//             globalVarName="sidebarMain"
//             propsToPass={stableProps}
//             onLoad={() => setSidebarLoaded(true)}
//           />
//         )}
//         <div className="w-full p-6">
//           {layoutBundlesLoaded ? (
//             <Outlet />
//           ) : (
//             <div className="w-full h-screen flex items-center justify-center">
//               <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };



import { useMemo, useState, useRef, useEffect } from "react";
import { Navigate, Outlet, useOutletContext, useNavigate } from "react-router-dom";
import MicrofrontendLoader from "../MFloader/MicroFrontendLoader";
import { useActiveRoutes } from "../ActiveRoutesContext";

export const PrimaryLayout = () => {
  const [open, setOpen] = useState(true);
  const user = localStorage.getItem("user");
  const mfRef = useRef(null);
  const headerRef = useRef(null);


  const [headerLoaded, setHeaderLoaded] = useState(false);
  const [sidebarLoaded, setSidebarLoaded] = useState(false);


  const { activeRoutes: routes, config } = useActiveRoutes()


  // Only pass static props at initial mount
  const stableProps = useMemo(() => ({
    open,
    setOpen,
    setHeaderLoaded
  }), []);


  // Update MF props when location changes
  useEffect(() => {
    if (mfRef.current?.updateProps) {
      mfRef.current.updateProps({ open, setOpen, routes });
    }
    if (headerRef.current?.updateProps) {
      headerRef.current.updateProps({ open, setOpen, config });
    }
  }, [open, routes, config]);


  const layoutBundlesLoaded = headerLoaded && sidebarLoaded;



  return (
    <>
      <div className="fixed w-full z-10">
        <MicrofrontendLoader
          ref={headerRef}
          scriptUrl={
            // "https://d18aratlqkym29.cloudfront.net/frontend-build/header/1.1/mf/header-bundle.js" +
            localStorage.getItem(`noticeBoardMF-headerBundle`) +
            `?date=${Date.now()}`
          }
          // scriptUrl={"https://anarock-staging.s3.us-east-1.amazonaws.com/anarock-frontend-react/header/1.2/mf/header-bundle.js" + `?date=${Date.now()}`}
          // scriptUrl={"http://localhost:3000/header-bundle.js" + `?date=${Date.now()}`}
          mountDivId="headerMain"
          globalVarName="headerMain"
          propsToPass={stableProps}
        />
      </div>
      <div className="flex bg-var(--color-primary)">
        <MicrofrontendLoader
          ref={mfRef}
          scriptUrl={
            localStorage.getItem(`noticeBoardMF-sidebarBundle`) +
            // "https://d18aratlqkym29.cloudfront.net/frontend-build/sidebar/1.1/mf/sidebar-bundle.js" +
            `?date=${Date.now()}`
          }
          // scriptUrl={"https://anarock-staging.s3.us-east-1.amazonaws.com/anarock-frontend-react/sidebar/1.2/mf/sidebar-bundle.js" + `?date=${Date.now()}`}
          // scriptUrl={"http://localhost:3000/sidebar-bundle.js" + `?date=${Date.now()}`}
          mountDivId="sidebarMain"
          globalVarName="sidebarMain"
          propsToPass={stableProps}
          onLoad={() => setSidebarLoaded(true)}
        />
        {/* mx-auto 2xl:max-w-[85rem] */}
        <div className={`${!open ? "xl:max-w-[calc(100%-80px)]" : "xl:max-w-[calc(100%-240px)]"} relative !min-h-[calc(100%-80px)] p-4 xl:p-6 !pt-[104px] w-full bg-[#F5F9FE] dark:bg-slate-800`}>
          {/* <div className="w-full p-6"> */}
          {layoutBundlesLoaded ? (
            <Outlet />
          ) : (
            <div className="fixed inset-0 bg-white z-40 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};