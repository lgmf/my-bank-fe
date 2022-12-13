import { ReactNode } from "react";

interface RepeatProps {
  times: number;
  element: ReactNode;
}

export default function Repeat({ times, element }: RepeatProps) {
  const arr = new Array(times);
  return <>{arr.map(() => element)}</>;
}
