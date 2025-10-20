"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menus = [
    {
      title: "Find Care",
      items: ["Doctors", "Hospitals", "Clinics"],
    },
    {
      title: "Find Wellness",
      items: ["Nutrition", "Fitness Programs", "Mental Health"],
    },
    {
      title: "Find Coverage",
      items: ["Plans", "Benefits", "Support"],
    },
    {
      title: "myBlue | Login",
      items: ["Member Login", "Employer Login", "Provider Login"],
    },
  ];

  const handleMouseEnter = (index) => {
    setOpenMenu(index);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  if (!mounted) {
    // Render only static markup on server to avoid mismatch
    return (
      <header className="w-full border-b bg-white shadow-sm">
        <div className="mx-[18%] flex justify-between items-center px-6 py-2">
          <div className="flex items-center gap-3">
            <img
              src="/MISSISSIPPI_LOGO.jpeg"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="text-2xl font-semibold text-gray-900 tracking-wide">
              MISSISSIPPI
            </span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white">
      {/* --- Top Bar --- */}
      <div className="mx-[18%] flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-3">
          <img src="/MISSISSIPPI_LOGO.jpeg" alt="BCBS Mississippi Logo" className="h-13 w-auto" />
          <span className="text-3xl font-semibold text-gray-900 tracking-wide">
            MISSISSIPPI
          </span>
        </div>

        {/* Right Navigation */}
        <nav className="flex items-center gap-6 text-lg">
          <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center gap-1 ">
            About Us
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
            I&apos;m a Member
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
            I&apos;m a Provider
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
            I&apos;m an Employer
          </a>
        </nav>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="bg-gray-50 text-base mt-2">
        <div className="mx-[18%] px-4">
         <div className="flex items-center shadow-[0_0_10px_rgba(0,0,0,0.2)]">
            {menus.map((menu, index) => (
              <div
                key={index}
                className={`relative flex-1 border-r border-gray-300 last:border-r-0 `} 
                // ${index === menus.length - 1 ? 'bg-blue-100' : ''}  to add in above class to make myBlue have blue bg
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`w-full px-6 py-3 text-gray-700 hover:bg-white hover:border-b-2 hover:border-blue-600 flex items-center justify-center gap-2 ${
                    menu.isBlue ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  {menu.title}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openMenu === index && (
                  <div className="absolute left-0 top-full w-full bg-white shadow-lg border border-gray-200 z-10">
                    {menu.items.map((item, itemIndex) => (
                      <a
                        key={itemIndex}
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}