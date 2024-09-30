import { DekstopNavigation } from "./navigation/DekstopNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";

export const Navigation = () => {
  return (
    <nav className="header-navigation">
      <DekstopNavigation />
      <MobileNavigation />
    </nav>
  );
};
