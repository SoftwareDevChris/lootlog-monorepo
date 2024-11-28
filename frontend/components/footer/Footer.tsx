import Link from "next/link";

import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";

import { ROUTES } from "@/utils/routes";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-inner-container">
        {/* Logo and mission text */}
        <div className="logo-container">
          <h6 className="logo">
            Loot
            <span>Log</span>
          </h6>
        </div>

        {/* Navigation */}
        <div className="nav-container">
          <h6>Navigation</h6>
          <ul>
            {ROUTES.map((route) => (
              <li key={route.name}>
                <Link href={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social media */}
        <div className="socials-container">
          <h6 className="text-lg uppercase">Social Media</h6>
          <div className="icon-container">
            <Link href="">
              <FaFacebook size={20} />
            </Link>
            <Link href="">
              <FaYoutube size={20} />
            </Link>
            <Link href="">
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
