"use client";
import { AnimatedCodeBlock, ScriptAction } from "@/components/code-block";
import { Script } from "@/components/code-block/types";

import { shuffle, putVariantsOnIt } from "./utils";
import { useEffect, useState } from "react";
import { CollectionID } from "rocketicons/data";
import IconLoader, { IconHandlerProps } from "@/components/icons/icon-loader";

const Animation = ({
  Icon,
  colors,
  iconName,
}: IconHandlerProps & { colors: string[]; iconName: string }) => {
  const [state, setState] = useState<string>("icon-slate-200");
  const [script, setScript] = useState<Script>([]);

  useEffect(() => {
    const { script } = shuffle([
      ...colors.slice(0, 3).map((color) => `${color}`),
      ...putVariantsOnIt(colors.slice(-3)),
    ]).reduce(
      ({ prev, script }, color) => ({
        prev: `icon-${color}`,
        script: [
          ...script,
          {
            time: "3s",
            action: ScriptAction.DELETE_TYPING,
            elementId: "el_0.el_0",
            from: prev,
            to: "icon-",
            skipCommit: true,
          },
          {
            action: ScriptAction.UPDATE_TYPING,
            elementId: "el_0.el_0",
            text: `${color}`,
          },
        ],
      }),
      { prev: "icon-slate-200", script: [] as any[] }
    );
    setScript(script);
  }, [colors]);

  return (
    <>
      <div className="size-48 order-last sm:order-none flex items-center justify-center border rounded-lg border-slate-200 dark:border-slate-800">
        <Icon className={`transition duration-500 ${state} size-48`} />
      </div>
      <AnimatedCodeBlock
        className="w-96 md:w-[480px]"
        variants="minimalist"
        skipRender={true}
        onCommit={(_, state) => state && setState(state)}
        script={[
          ...script,
          {
            action: ScriptAction.RESTART,
          },
        ]}
      >
        <div>
          <Icon data-cb-tag={iconName} className="icon-slate-200" />
        </div>
      </AnimatedCodeBlock>
    </>
  );
};

type ColorsAnimationProsp = {
  icon: string;
  collection: CollectionID;
  colors: string[];
};

// TODO: Allow the IconLoader to pass along the iconName to the handler being called.
const ColorsAnimation = ({
  collection,
  icon,
  colors,
}: ColorsAnimationProsp) => (
  <div className="flex h-72 sm:h-48 flex-col sm:flex-row my-12 items-center justify-center gap-4">
    <IconLoader
      collectionId={collection}
      icon={icon}
      iconName={icon}
      Handler={Animation}
      colors={colors}
    />
  </div>
);

export default ColorsAnimation;
