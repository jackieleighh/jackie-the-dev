import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { label: "about me", href: "#about" },
  { label: "my work", href: "#projects" },
  { label: "get in touch", href: "#contact" },
];

function ResponsiveNavbar({ visible = false }: { visible?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false);
    },
    []
  );

  return (
    <nav
      className={`nav${scrolled ? " nav--scrolled" : ""}${visible ? " nav--visible" : ""}`}
    >
      <div className="nav-inner">
        <a
          className="nav-brand"
          href="#home"
          onClick={(e) => handleNav(e, "#home")}
        >
          J
        </a>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className="nav-link"
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className={`nav-hamburger${menuOpen ? " nav-hamburger--open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
        </button>
      </div>

      <div className={`nav-mobile${menuOpen ? " nav-mobile--open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            className="nav-mobile-link"
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default ResponsiveNavbar;
