import React from "react";

export type PreviewComponent = React.FC;

export type PreviewRegistryMap = Record<
  string,
  PreviewComponent
>;