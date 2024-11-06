import { ReactNode, useContext } from "react";
import { FunnelContext } from "./Funnel";

interface StepProps {
  children: ReactNode;
  name: string;
}

export default function Step({ children, name }: StepProps) {
  const context = useContext(FunnelContext);
  if (context?.step === name) {
    return <>{children}</>;
  }
  return null;
}
