import { PropsWithClassName, PropsWithLang } from "@/types";
import dynamic from "next/dynamic";
import { withLocale } from "@/locales";
import { DependencyList } from "react";

type Callback = <T extends Function>(callback: T, deps: DependencyList) => T;

export type MdxPartialProps = {
  slug: string;
  path: "docs" | "components";
} & PropsWithLang &
  PropsWithClassName;

type CacheFunctionProps = {
  callback?: Callback;
  deps?: DependencyList;
};

export const MdxPartial = ({
  lang,
  slug: unparsedSlug,
  path,
  className,
  callback,
  deps
}: MdxPartialProps & CacheFunctionProps) => {
  const [slug, componentSlug] = unparsedSlug.split("/");
  const { component, doc } = withLocale(lang);

  const loadDoc = () => {
    const loaded = doc(slug);
    return (componentSlug && loaded["components"][componentSlug]) || loaded;
  };

  const selectedDoc = path === "docs" ? loadDoc() : component(slug);

  callback = callback || (((cb: any, _deps: DependencyList) => cb) as Callback);

  const DynamicMarkDownComponent = callback(
    dynamic(() => import(`@/locales/${path}/${selectedDoc?.filePath}`), {
      loading: () => <p className={className ?? "h-2 w-9/12 bg-slate-200 dark:bg-slate-700 rounded"}></p>
    }),
    deps || []
  );

  return <>{selectedDoc && <DynamicMarkDownComponent />}</>;
};
