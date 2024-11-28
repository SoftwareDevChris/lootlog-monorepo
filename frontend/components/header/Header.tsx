import { UserMenu } from "./menu/UserMenu";
import { Navigation } from "./Navigation";
import { Logo } from "../logo/Logo";

export const Header = async () => {
  return (
    <header className="h-header border-b-orangeCustom700 static top-0 w-full border-b-4">
      <div className="relative mx-auto grid h-full max-w-[1200px] grid-cols-4 grid-rows-1 items-center justify-between px-4">
        <Navigation />
        <Logo />
        <UserMenu />
      </div>
    </header>
  );
};
