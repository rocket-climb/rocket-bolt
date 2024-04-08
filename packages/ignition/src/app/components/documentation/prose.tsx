import { PropsWithChildrenAndlassName } from "@/types";

const Prose = ({ className, children }: PropsWithChildrenAndlassName) => (
  <p
    className={`text-slate-700 dark:text-slate-400 tracking-tight font-normal text-sm mb-2 ${className}`}
  >
    {children}
  </p>
);

export default Prose;
