"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

const ProgressBarComponent = () => {
  const [progress, setProgress] = React.useState(15);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return <Progress value={progress} className="w-full" />;
};

export default ProgressBarComponent;
