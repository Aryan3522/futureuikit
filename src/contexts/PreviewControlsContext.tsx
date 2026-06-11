"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PreviewControlsContextType {
  controls: ReactNode | null;
  setControls: (controls: ReactNode | null) => void;
}

const PreviewControlsContext = createContext<PreviewControlsContextType>({
  controls: null,
  setControls: () => {},
});

export const usePreviewControls = () => useContext(PreviewControlsContext);

export const PreviewControlsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [controls, setControls] = useState<ReactNode | null>(null);

  return (
    <PreviewControlsContext.Provider value={{ controls, setControls }}>
      {children}
    </PreviewControlsContext.Provider>
  );
};
