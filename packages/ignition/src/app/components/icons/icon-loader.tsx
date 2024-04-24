import { IconProps, IconType } from "rocketicons";
import { RcRocketIcon } from "rocketicons/rc";
import { CollectionID } from "rocketicons/data";
import IconsLoader, { HandlerPros } from "@/data-helpers/icons/icons-loader";
import { getCollectionsInfo } from "./get-icons-data";

export type IconHandlerProps = { Icon: IconType };

type IconProxyHandlerProps<T extends IconHandlerProps> = {
  icon: string;
  Handler?: (props: T) => JSX.Element;
} & IconProps;

const IconProxyHandler =
  <T extends IconHandlerProps>({
    Handler,
    icon,
    ...props
  }: IconProxyHandlerProps<T>) =>
  function IconProxyLoader ({ collection }: HandlerPros) {
    const Icon = collection[icon];
    return (
      // @ts-ignore TS2322
      (Handler && <Handler Icon={Icon} {...props} />) || <Icon {...props} />
    );
  };

type IconLoaderProps<T extends IconHandlerProps> = {
  collectionId: CollectionID;
  Loading?: () => JSX.Element;
} & Omit<T, "Icon"> &
  IconProxyHandlerProps<T>;

const IconLoader = <T extends IconHandlerProps>({
  collectionId,
  icon,
  Handler,
  Loading,
  ...props
}: IconLoaderProps<T>) => {
  if (!getCollectionsInfo(collectionId).exists(icon)) {
    return (
      // @ts-ignore TS2322
      (Handler && <Handler Icon={RcRocketIcon} />) || (
        <RcRocketIcon {...props} />
      )
    );
  }

  return (
    <IconsLoader
      collectionId={collectionId}
      Handler={IconProxyHandler({ Handler, icon, ...props })}
      Loading={Loading}
    />
  );
};

export default IconLoader;
