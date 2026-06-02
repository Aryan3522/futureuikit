import * as React from "react";

export function useDevicePerformance() {
  const [isLowEnd, setIsLowEnd] = React.useState(false);

  React.useEffect(() => {
    // Basic heuristics for low-end devices
    const getDevicePerformance = () => {
      if (typeof navigator === "undefined") return false;

      // Check hardware concurrency (number of logical processors)
      // Devices with less than 4 cores are typically low-end
      const cores = navigator.hardwareConcurrency || 4;
      
      // Check device memory (in GB) if available
      // @ts-ignore - deviceMemory is not universally typed
      const memory = navigator.deviceMemory || 4;

      // Check for poor connection
      // @ts-ignore - connection is not universally typed
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const isSlowConnection = connection ? (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === '3g') : false;

      return cores < 4 || memory < 4 || isSlowConnection;
    };

    setIsLowEnd(getDevicePerformance());
  }, []);

  return { isLowEnd };
}
