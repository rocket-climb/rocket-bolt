import { PropsWithChildrenAndlassName } from "@/app/types";

type ExternalLinkProps = {
  href: string;
} & PropsWithChildrenAndlassName;

const ExternalLink = ({ href, className, children }: ExternalLinkProps) => (
  <a
    target="_blank"
    href={href}
    className={`hover:text-slate-700 hover:dark:text-slate-300 ${
      className || ""
    }`}
  >
    {children || href}
  </a>
);

export default ExternalLink;
