"use client";
import React from "react";
import "./header.css"

/**
 * This markup is intentionally aligned with the IDs/classes used in header.js:
 * - #primary-nav
 * - #nav-and-menus
 * - #nav-option-1..4 and #primary-nav-menu-1..4
 * - #bread-crumb (for breadcrumb injection)
 * - #main-video-wrapper (video/image injection)
 * If you change these IDs, update header.js accordingly.
 */
const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-gray-200">
      {/* Top bar / brand */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">bcbsms</a>

        {/* Mobile menu toggle (header.js attaches handlers to the container) */}
        <button
          id="mobile-nav-header"
          className="md:hidden px-3 py-2 border rounded"
          aria-label="Toggle navigation"
          onClick={() => {
            // header.js exposes toggleMobileNav() in global scope
            // @ts-ignore
            if (typeof window !== "undefined" && window.toggleMobileNav) {
              // @ts-ignore
              window.toggleMobileNav();
            }
          }}
        >
          Menu
        </button>
      </div>

      {/* Primary Nav container that header.js expects */}
      <nav id="primary-nav" className="bg-white">
        <div id="nav-and-menus" className="max-w-7xl mx-auto px-4 md:flex md:items-start md:gap-8">
          {/* Top-level buttons */}
          <div className="flex gap-4 py-2 border-b md:border-b-0">
            <button id="nav-option-1" className="background-white color-black flex items-center gap-1">
              <span>Find Care</span>
              <span className="nav-chevron nav-chevron-closed" aria-hidden />
            </button>
            <button id="nav-option-2" className="background-white color-black flex items-center gap-1">
              <span>Find Wellness</span>
              <span className="nav-chevron nav-chevron-closed" aria-hidden />
            </button>
            <button id="nav-option-3" className="background-white color-black flex items-center gap-1">
              <span>Find Coverage</span>
              <span className="nav-chevron nav-chevron-closed" aria-hidden />
            </button>
            <button id="nav-option-4" className="background-white color-black flex items-center gap-1">
              <span>myBlue</span>
              <span className="nav-chevron nav-chevron-closed" aria-hidden />
            </button>
          </div>

          {/* Menus (hidden by default; header.js toggles .hidden/.visible) */}
          <div className="w-full md:flex md:gap-8">
            {/* Menu 1: Find Care */}
            <div id="primary-nav-menu-1" className="hidden md:block md:min-w-[240px]">
              <section className="py-4">
                <h4 className="font-semibold mb-2">Providers</h4>
                <ul className="space-y-1">
                  <li>
                    <a className="text-blue-600 underline" href="/im-a-member/find-a-network-provider/">
                      Find a Network Provider
                    </a>
                  </li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Pharmacies</h4>
                <ul className="space-y-1">
                  <li>
                    <a className="text-blue-600 underline" href="https://testblueland.bcbsms.com/angular-apps/medical-drug-formulary-search/search.html#/">
                      Drug Search
                    </a>
                  </li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Know Your Benefits</h4>
                <ul className="space-y-1">
                  <li>
                    <a className="text-blue-600 underline" href="/im-a-member/healthy-you-wellness-benefit">
                      Healthy You! Wellness Benefit
                    </a>
                  </li>
                  <li>
                    <a className="text-blue-600 underline" href="/im-a-member/member-benefits-and-programs">
                      Member Benefits & Programs
                    </a>
                  </li>
                </ul>
              </section>
            </div>

            {/* Menu 2: Find Wellness */}
            <div id="primary-nav-menu-2" className="hidden md:block md:min-w-[240px]">
              <section className="py-4">
                <h4 className="font-semibold mb-2">Be Healthy</h4>
                <ul className="space-y-1">
                  <li>
                    <a className="text-blue-600 underline" href="https://test.behealthy.bcbsms.com/">
                      Health & Wellness
                    </a>
                  </li>
                  <li>
                    <a className="text-blue-600 underline" href="https://test.behealthy.bcbsms.com/food-and-recipes/">
                      Food & Recipes
                    </a>
                  </li>
                  <li>
                    <a className="text-blue-600 underline" href="https://test.behealthy.bcbsms.com/mental-health/">
                      Mental Health
                    </a>
                  </li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Experience Blue</h4>
                <ul className="space-y-1">
                  <li>
                    <a className="text-blue-600 underline" href="http://test.healthiermississippi.org/">
                      Blue Cross & Blue Shield of Mississippi Foundation
                    </a>
                  </li>
                </ul>
              </section>
            </div>

            {/* Menu 3: Find Coverage */}
            <div id="primary-nav-menu-3" className="hidden md:block md:min-w-[240px]">
              <section className="py-4">
                <h4 className="font-semibold mb-2">Individuals & Families</h4>
                <ul className="space-y-1">
                  <li>
                    <a className="text-blue-600 underline" href="/find-coverage/blue-care">
                      Blue Care
                    </a>
                  </li>
                  <li>
                    <a className="text-blue-600 underline" href="/find-coverage/special-enrollment">
                      Special Enrollment
                    </a>
                  </li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">For Employers</h4>
                <ul className="space-y-1">
                  <li><a className="text-blue-600 underline" href="/find-coverage/small-business">Small Business</a></li>
                  <li><a className="text-blue-600 underline" href="/find-coverage/large-business">Large Business</a></li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Seniors</h4>
                <ul className="space-y-1">
                  <li><a className="text-blue-600 underline" href="/find-coverage/blue65">65+ Medicare</a></li>
                </ul>
              </section>
            </div>

            {/* Menu 4: myBlue (login area – header.js injects login form HTML) */}
            <div id="primary-nav-menu-4" className="hidden md:block md:min-w-[240px]">
              <section className="py-4" id="nav-wrapper-login">
                <h4 className="font-semibold mb-2">myBlue</h4>
                <div id="login-form-injection-site" className="space-y-2" />
                <div className="text-sm text-gray-500 mt-2">
                  <a className="text-blue-600 underline" href="https://test.bcbsms.com/login-help?trouble=username">
                    Forgot Username
                  </a>{" "}
                  |{" "}
                  <a className="text-blue-600 underline" href="https://test.bcbsms.com/login-help?trouble=password">
                    Forgot Password
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb target */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-2 text-sm">
          <span id="bread-crumb" />
        </div>
      </div>

      {/* Video/Image wrapper used by header.js for desktop vs mobile */}
      <div id="main-video-wrapper" className="max-w-7xl mx-auto px-4 py-4" />
    </header>
  );
};

export default Header;
