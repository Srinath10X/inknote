"use client";

import React from "react";
import dynamic from "next/dynamic";

const ClientOnly = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default dynamic(() => Promise.resolve(ClientOnly), { ssr: false });
