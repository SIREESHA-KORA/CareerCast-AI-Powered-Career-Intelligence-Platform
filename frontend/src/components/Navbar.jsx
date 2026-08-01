import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Upload, Target, Award, LayoutDashboard, Info, ShieldCheck, Compass } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Upload & Parse', path: '/upload', icon: Upload },
    { name: 'Prediction', path: '/predict', icon: Sparkles },
    { name: 'Skill Gap', path: '/skills', icon: Target },
    { name: 'Learning', path: '/learning', icon: Award },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Admin', path: '/admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav shadow-sm bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold font-heading tracking-tight text-slate-900">
                Career<span className="emerald-gradient-text font-extrabold">Cast</span>
              </span>
              <span className="block text-[10px] uppercase font-semibold text-emerald-700 tracking-wider">
                AI Intelligence Platform
              </span>
            </div>
          </NavLink>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/60'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100/80'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/upload"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4" />
              <span>Analyze Resume</span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
