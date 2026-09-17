import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null; // Home page doesn't need breadcrumbs

  return (
    <nav className="flex items-center text-[10px] font-bold tracking-[0.25em] uppercase text-[#8A8A8A] py-3 px-4 sm:px-8 max-w-7xl mx-auto border-b border-[#252321] bg-[#111111]">
      <Link to="/" className="flex items-center gap-1.5 hover:text-[#D4A017] transition-colors">
        <Home className="h-3 w-3 text-[#D4A017]" />
        <span>Home</span>
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="h-3 w-3 mx-2 text-[#4D423E]" />
            {isLast ? (
              <span className="text-[#F5F5F0] font-bold">{formattedName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-[#D4A017] transition-colors text-[#F5F5F0] opacity-80">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
