import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Terminal } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "@/data/portfolio";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const parseHref = (href: string) => {
  // returns { path, hash } e.g. "/#about" -> { path: "/", hash: "about" }, "/blog" -> { path: "/blog", hash: "" }
  const [path, hash = ""] = href.split("#");
  return { path: path || "/", hash };
};

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("home");

  const onHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!onHomePage) return;
      const hashSections = navItems
        .map((n) => parseHref(n.href))
        .filter((p) => p.path === "/" && p.hash);
      const y = window.scrollY + 120;
      for (let i = hashSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(hashSections[i].hash);
        if (el && el.offsetTop <= y) {
          setActiveHash(hashSections[i].hash);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHomePage]);

  const isActive = (href: string) => {
    const { path, hash } = parseHref(href);
    if (path === "/blog") return pathname.startsWith("/blog");
    if (path === "/" && hash) return onHomePage && activeHash === hash;
    return false;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const { path, hash } = parseHref(href);
    setOpen(false);
    if (path === "/" && hash) {
      if (onHomePage) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `/#${hash}`);
      } else {
        e.preventDefault();
        navigate(`/#${hash}`);
        // After route change, scroll to section
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 60);
      }
    }
    // else: normal Link navigation handles it
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !onHomePage ? "glass shadow-card" : "bg-transparent"
      )}
    >
      <nav className="container-narrow flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm font-semibold">
          <Terminal className="h-4 w-4 text-primary" />
          <span>
            gideon<span className="text-primary">.yebei</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const { path } = parseHref(item.href);
            const active = isActive(item.href);
            const className = cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              active
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            );
            return (
              <li key={item.href}>
                {path === "/blog" ? (
                  <Link to="/blog" className={className}>
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={className}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-border animate-fade-in">
          <ul className="container-narrow py-4 space-y-1">
            {navItems.map((item) => {
              const { path } = parseHref(item.href);
              const cls =
                "block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent";
              return (
                <li key={item.href}>
                  {path === "/blog" ? (
                    <Link to="/blog" onClick={() => setOpen(false)} className={cls}>
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cls}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};
