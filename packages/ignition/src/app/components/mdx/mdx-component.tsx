import { MDXContent } from "@content-collections/mdx/react";
import { allComponents } from "content-collections";

export const MdxComponent = ({
  lang,
  slug,
}: {
  lang: string;
  slug: string;
}) => {
  const selectedComponent = allComponents.find(
    (model) => model.slug === slug && model.locale === (lang || "en")
  );
  return (
    <div>
      {selectedComponent && <MDXContent code={selectedComponent?.body} />}
    </div>
  );
};
