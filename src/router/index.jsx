import App from "../App";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ErrorComponent } from "../components/ui/errorComponent";
import { PrimaryLayout } from "../layout";
import { useActiveRoutes } from "../ActiveRoutesContext";
import MicrofrontendLoader from "../MFloader/MicroFrontendLoader";
import ProtectedRoute from "../components/protectedRoute";

// Placeholder boilerplate component
const PlaceholderComponent = ({ label, children }) => (
  <div style={{ padding: "2rem" }}>
    {children?.length > 0 ? <Outlet /> : <h2>{label} is Coming Soon...</h2>}
  </div>
);

// Converts a single route to a route object
const getRouteElement = (route) =>
  route.bundleLink ? (
    <>
      <MicrofrontendLoader
        // scriptUrl={route.containerId == 'dashboardMF' ? 'http://localhost:5000/dashboard-bundle.js' : route.bundleLink + `?date=${Date.now()}`}
        scriptUrl={route.bundleLink + `?date=${Date.now()}`}
        // scriptUrl={
        //   route.containerId == "noticeBoardMF"
        //     ? "http://localhost:3000/noticeboard-bundle.js"
        //     : route.bundleLink + `?date=${Date.now()}`
        // }
        mountDivId={`${route.containerId || route.url}-mf`}
        globalVarName={route.containerId}
        cssUrl={route?.cssLink + `?date=${Date.now()}`}
        additionalLink={route?.additionalLink}
      />
    </>
  ) : (
    <PlaceholderComponent label={route.text} children={route.children} />
  );


// Recursive function to convert routes
const convertRoutesToRouterObjects = (routes = []) => {
  return routes.map((route) => {
    const children = route.children
      ? convertRoutesToRouterObjects(route.children)
      : [];
    return {
      path: route.url + `${route?.children ? "" : "/*"}`,
      element: getRouteElement({ ...route, children }),
      children,
      containerId: route?.containerId,
      text: route.text,
      layout: route.layout
    };
  });
};

export const RouterConfiguration = () => {
  const { activeRoutes } = useActiveRoutes();

  // Step 1: Convert routes
  const allRoutes = convertRoutesToRouterObjects(activeRoutes || []);

  // Step 2: Separate standalone and primary-layout routes
  const standaloneRoutes = allRoutes.filter(
    (r) => !(r.layout)
  );
  const primaryLayoutRoutes = allRoutes.filter(
    (r) => (r.layout)
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorComponent />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <PrimaryLayout />,
              children: [
                ...primaryLayoutRoutes,
                {
                  path: "*",
                  element: <ErrorComponent />,
                },
              ],
            },
          ],
        },
        ...standaloneRoutes.map((route) => ({
          path: route.path,
          element: route.element,
          children: route.children,
        })),
        {
          path: "*",
          element: <ErrorComponent />,
        },
      ],
    },
  ]);


  return activeRoutes?.length > 0 ? (
    <RouterProvider router={router} />
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};
