import { Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" bg-gray-900 text-white mt-8">

      {/* Colored bar at Top*/}
      <div className="h-2 bg-gradient-to-r from-lime-500 from-33% via-fuchsia-600 via-33% to-blue-900 to-66%"></div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Column */}
          <div>
            <h3 className="mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Be a Member
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Be an Employer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Be a Provider
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Find Coverage Column */}
          <div>
            <h3 className="mb-4">Find Coverage</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Blue Care
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Special Enrollment
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Small Business
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Large Business
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  65+ Medicare
                </a>
              </li>
            </ul>
          </div>

          {/* Other Sites Column */}
          <div>
            <h3 className="mb-4">Other Sites</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Blue Cross & Blue Shield of Mississippi Foundation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Get Ready to Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Illuminate Health
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Substance Abuse Community Wellness Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Be Healthy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              >
                <Facebook className="w-5 h-5 text-gray-900" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              >
                <Twitter className="w-5 h-5 text-gray-900" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Colored bar at bottom */}
      {/* <div className="h-2 bg-gradient-to-r from-purple-600 via-blue-500 to-green-400"></div> */}
    </footer>
  );
}
