import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const MyChart = dynamic(() => import("../components/chart"), { ssr: false });
export default function App() {
  return <MyChart />;
}
