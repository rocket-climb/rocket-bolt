"use client";
import { useDisclosure } from "@/components/modal-context";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import Button from "@/components/button";
import { IoChevronForwardSharp } from "rocketicons/io5";
import { PropsWithLang } from "@/app/types";
import { SidebarLeft } from "./sidebar-left";

type UrlObserverProps = {
  onChanges: (hash: string) => void;
};

const UrlObserver = ({ onChanges }: UrlObserverProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    const targetId = window.location.hash.substring(1);
    const target = document.getElementById(targetId); // I've never saw that on a react code...
    onChanges(
      window.location.hash && target
        ? targetId
        : (pathName.split("/").pop() as string)
    );
  }, [pathName, searchParams]);
  return <></>;
};

export const CollapsedSidebar = ({ lang }: PropsWithLang) => {
  const [hash, setHash] = useState<string>("" as string);
  const { isOpen, onOpen, onClose, Modal } = useDisclosure();

  return (
    <>
      <Suspense>
        <UrlObserver
          onChanges={(hash) => {
            isOpen && onClose();
            setHash(hash);
          }}
        />
      </Suspense>
      <div className={`docs-${hash}`}>
        <div
          data-open={true}
          className="group fixed w-full top-[64px] z-10 border-b border-slate-900/10 dark:border-slate-800 px-4 py-3 backdrop-blur transition-colors duration-500 bg-white/95 dark:bg-slate-900/70 lg:hidden"
        >
          <div className="flex flex-col justify-between">
            <Button
              className="flex items-center gap-1"
              type="button"
              onClick={() => onOpen()}
            >
              <IoChevronForwardSharp />
              <span>Menu</span>
            </Button>
          </div>
          <Modal>
            <div
              data-open={true}
              className="group fixed pl-3 pr-7 h-full overflow-y-auto bg-white dark:bg-slate-800"
            >
              <SidebarLeft lang={lang} />
            </div>
          </Modal>
        </div>
      </div>
      <div className="collapsed-menu lg:hidden"></div>
    </>
  );
};
