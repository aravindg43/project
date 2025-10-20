import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Blue Cross & Blue Shield of Mississippi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
       
        {/* Main Content Area - Placeholder for now */}

        <main className="flex-grow bg-gray-50 mx-[18%] mt-1">
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Content Area */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <p className="text-gray-700 mb-4">
                    This content area will be populated with the search
                    functionality and other provider information as we build out
                    the page.
                  </p>
                  <p className="text-gray-700 mb-4">
                    This content area will be populated with the search
                    functionality and other provider information as we build out
                    the page.
                  </p>
                  <p className="text-gray-700 mb-4">
                    This content area will be populated with the search
                    functionality and other provider information as we build out
                    the page.
                  </p>

                  <p className="text-gray-700 mb-4">
                    This content area will be populated with the search
                    functionality and other provider information as we build out
                    the page.
                  </p>
                </div>
              </div>

              {/* Right Sidebar - Search Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="mb-4">Network Provider Search</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Use our directory of ZIP Code or Regional Service
                  </p>
                  {/* Form will be added later */}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
