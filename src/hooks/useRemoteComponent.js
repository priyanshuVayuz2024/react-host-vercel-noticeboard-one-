import { useState, useEffect } from 'react';

const useRemoteComponent = (url, scope, module) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url || !scope || !module) return;

    const loadComponent = async () => {
      try {
        // Create a dynamic import URL
        const dynamicImportUrl = url;

        // Dynamically import the remote module
        // const data = await import(/* @vite-ignore */ dynamicImportUrl);
        const container = await import(dynamicImportUrl);

        // Access the module factory and load the component
        const factory = await container.get(module);
        // console.log("Factory");
        // console.log
        const Module = factory();
        // console.log(Module.default);
        // console.log(Module)
        setComponent(Module);
        // console.log(data);
        // console.log("Inside component")
        // setComponent(() => SignIn);
        setLoading(false);
      } catch (error) {
        console.error('Error loading remote component:', error);
        setError(error);
        setLoading(false);
      }
    };
    loadComponent();
  }, [url, scope, module]);

  return { Component, loading, error };
};

export default useRemoteComponent;
