import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/new.png"; // or .svg

// In-page sections on Home + standalone pages
const NAV_ITEMS = [
  { to: "/#about", label: "About" },        // scrolls on Home
  { to: "/#services", label: "Services" },  // scrolls on Home
  { to: "/#portfolio", label: "Portfolio" },// scrolls on Home
  // { to: "/#blog", label: "Blog" },          // scrolls on Home
  { to: "/#faq", label: "FAQ" },            // scrolls on Home
  { to: "/careers", label: "Careers" },     // page
  { to: "/contact", label: "Contact" }      // page
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const AnchorOrNav = ({ item, className }) => {
    const isHash = item.to.includes("#");
    return isHash ? (
      <a href={item.to} className={className} onClick={() => setOpen(false)}>
        {item.label}
      </a>
    ) : (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `${className} ${isActive ? "text-app" : "text-muted"}`
        }
        onClick={() => setOpen(false)}
      >
        {item.label}
      </NavLink>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="shell bg-surface/80 backdrop-blur border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand: logo + wordmark */}
          <Link to="/" className="inline-flex items-center gap-2" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="OmniTech logo"
              className="h-14 w-14 rounded-md brightness-110 drop-shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-3"
              loading="eager"
              fetchPriority="high"
            />
            <span className="text-2xl md:text-3xl font-semibold tracking-tight text-[rgb(var(--primary))]">
              OmniTech
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden gap-6 md:flex">
            {/* Home link */}
            {pathname === "/" ? (
              <a href="/#home" className="text-sm font-medium text-muted hover:text-app">
                Home
              </a>
            ) : (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-app ${isActive ? "text-app" : "text-muted"}`
                }
              >
                Home
              </NavLink>
            )}
            {NAV_ITEMS.map((item) => (
              <AnchorOrNav
                key={item.to}
                item={item}
                className="text-sm font-medium hover:text-app"
              />
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-6 bg-app" />
            <span className="mt-1 block h-0.5 w-6 bg-app" />
            <span className="mt-1 block h-0.5 w-6 bg-app" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="shell md:hidden border-t">
          <div className="mx-auto grid max-w-7xl gap-2 px-4 py-3">
            {pathname === "/" ? (
              <a href="/#home" className="py-2 text-sm font-medium text-muted hover:text-app">
                Home
              </a>
            ) : (
              <NavLink
                to="/"
                className="py-2 text-sm font-medium text-muted hover:text-app"
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>
            )}
            {NAV_ITEMS.map((item) => (
              <AnchorOrNav
                key={`${item.to}-m`}
                item={item}
                className="py-2 text-sm font-medium text-muted hover:text-app"
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
