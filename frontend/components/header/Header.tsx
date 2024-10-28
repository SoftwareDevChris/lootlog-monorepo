import { UserMenu } from "./menu/UserMenu";
import { Navigation } from "./Navigation";
import { Logo } from "../logo/Logo";

export const Header = async () => {
  return (
    <header>
      <div className="header-content">
        <Logo />

        <Navigation />

        <UserMenu />
      </div>
    </header>
  );
};
