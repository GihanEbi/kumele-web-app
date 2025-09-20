"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

type ProgressBarComponentProps = {
  eventRate: number;
};

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({
  eventRate,
}) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(eventRate * 20 || 0), 500);
    return () => clearTimeout(timer);
  }, [eventRate]);
  return <Progress value={progress} className="w-full" />;
};

export default ProgressBarComponent;
