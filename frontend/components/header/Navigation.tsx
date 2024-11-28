import { DekstopNavigation } from "./navigation/DekstopNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";

export const Navigation = () => {
  return (
    <nav className="order-1 col-span-1 w-full md:order-2 md:col-span-2">
      <MobileNavigation />
      <DekstopNavigation />
    </nav>
  );
};
