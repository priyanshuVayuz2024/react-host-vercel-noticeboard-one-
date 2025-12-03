import { createContext, useContext, useState, useEffect } from "react";

const ActiveRoutesContext = createContext();

export const useActiveRoutes = () => useContext(ActiveRoutesContext);

function storeModulePaths(data) {
  const domainModules = data["domain-modules"];

  if (!Array.isArray(domainModules)) return;

  domainModules.forEach((domainModule) => {
    const moduleArray = domainModule.modules;
    const subModulesGroups = domainModule["domain-sub-modules"];

    if (!moduleArray?.length || !subModulesGroups?.length) return;

    const containerId = moduleArray[0].containerId;
    if (!containerId) return;

    // Extract all 'subModule' paths from each sub-module group
    const paths = subModulesGroups.map(subModGroup => {
      const subModules = subModGroup["sub-modules"];
      if (Array.isArray(subModules) && subModules[0]?.subModule) {
        return subModules[0].subModule.startsWith("/")
          ? subModules[0].subModule.slice(1)
          : subModules[0].subModule;
      }
      return null;
    }).filter(Boolean); // remove nulls

    // Store in localStorage
    localStorage.setItem(`${containerId}_routes`, JSON.stringify(paths));
  });
}





function buildRouteTree(flatRoutes) {
  flatRoutes.sort(
    (a, b) => a.route.split("/").length - b.route.split("/").length
  );

  const routeMap = {};
  const tree = [];

  flatRoutes.forEach(({ label, containerId, route, bundleLink, cssLink, group, additionalLink, layout }) => {
    const segments = route.split("/").filter(Boolean);
    const key = route;
    const node = {
      text: label,
      containerId: containerId,
      url: route,
      bundleLink,
      cssLink,
      group,
      additionalLink,
      layout
    };

    routeMap[key] = node;

    if (segments.length === 1) {
      tree.push(node);
    } else {
      const parentPath = "/" + segments.slice(0, -1).join("/");
      const parentNode = routeMap[parentPath];

      if (parentNode) {
        parentNode.children = parentNode.children || [];
        parentNode.children.push(node);
      } else {
        tree.push(node);
      }
    }
  });

  return tree;
}

export const ActiveRoutesProvider = ({ children }) => {
  const [activeRoutes, setActiveRoutes] = useState([]);
  const [masterConfig, setMasterConfig] = useState();
  const [config, setConfig] = useState({});

  const [loginRoute, setLoginRoute] = useState('/sign-in')


  const noticeBoardPath = "/forum/noticeboard";

  // const BASE_URL = "https://anarock-super-admin.vayuz.com";
  const BASE_URL = "https://react-revamp.apnacomplex.com";
  const domain =
    window.location.hostname == "localhost"
      ? "anarock-super-admin.vayuz.com"
      : window.location.hostname;

  useEffect(() => {
    document.title = config?.PLATFORM_NAME || "Anarock Main";
  }, [config]);

  useEffect(() => {
    const fetchDomainInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/get_domain_info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domain, // or use variable: domain
          }),
        });
        const result = await response.json();

        if (result.code === 200) {
          const { modules, configVariables } = result.data;


          storeModulePaths(modules?.[0])

          const extractedRoutes = modules?.[0]?.["domain-modules"]
            .map((route) => {
              // const containerId = route?.modules[0]?.containerId;
              const containerId = route?.modules[0]?.containerId;
              const routePath = route?.modules[0]?.moduleLink;



              const tableBundleLink = route?.modules[0]?.[`sub-modules-child`]?.filter(obj => obj?.type == 'table')?.[0]?.bundleURLs?.[0]?.url
              const sidebarBundleLink = route?.modules[0]?.[`sub-modules-child`]?.filter(obj => obj?.type == 'sidebar')?.[0]?.bundleURLs?.[0]?.url
              const headerBundleLink = route?.modules[0]?.[`sub-modules-child`]?.filter(obj => obj?.type == 'header')?.[0]?.bundleURLs?.[0]?.url

              localStorage.setItem(`${containerId}-tableBundle`, tableBundleLink)
              localStorage.setItem(`${containerId}-sidebarBundle`, sidebarBundleLink)
              localStorage.setItem(`${containerId}-headerBundle`, headerBundleLink)


              // Store in localStorage
              if (containerId && routePath) {
                localStorage.setItem(containerId, routePath);
              }

              return {
                route: routePath,
                label: route?.modules[0]?.moduleName,
                containerId: containerId,
                bundleLink: route?.modules[0]?.primaryJsLink || null,
                cssLink: route?.modules[0]?.primaryCssLink || null,
                group: route?.modules[0]?.moduleGroup?.[0],
                additionalLink: route?.modules[0]?.bundleLinks,
                layout: route?.modules[0]?.layout
                // cssLink: null
              };
            });

          // console.log(extractedRoutes, "extraa");

          const nestedRoutes = buildRouteTree(extractedRoutes);
          setActiveRoutes(nestedRoutes);

          setLoginRoute(modules?.[0]?.defaultLoginRoute)
          console.log(nestedRoutes, extractedRoutes, 'scotts outside', modules?.[0]?.["domain-modules"]
            .filter((route) => route.isActive));


          const domainConfigs = configVariables?.[0]?.configKeys || [];

          const configObject = domainConfigs.reduce((acc, keyItem) => {
            const configKey = keyItem.key;
            const defaultValue = keyItem.value;
            const domainSpecificValue =
              keyItem.domainSpecificConfig?.[0]?.value;

            if (
              [
                "PLATFORM_NAME",
                "PLATFORM_HEADING",
                "Platform_Logo",
                "PLATFORM_THEME",
                "email",
                "password",
                "SIGNIN_TEMPLATE_NAME",
              ].includes(configKey)
            ) {
              acc[configKey] = domainSpecificValue || defaultValue || "";
            }

            return acc;
          }, {});
          setMasterConfig(configVariables);
          setConfig(configObject);
        }
      } catch (error) {
        console.error("Failed to fetch domain info:", error);
      }
    };

    fetchDomainInfo();
  }, []);

  masterConfig?.[0].configKeys.forEach((config) => {
    localStorage.setItem(
      config?.key,
      config?.domainSpecificConfig?.[0]?.value
        ? config?.domainSpecificConfig?.[0]?.value
        : config?.value
    );
  });

  console.log(activeRoutes, 'scotts');


  return (
    <ActiveRoutesContext.Provider value={{ activeRoutes, config, loginRoute }}>
      {children}
    </ActiveRoutesContext.Provider>
  );
};
