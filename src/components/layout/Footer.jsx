// src/components/layout/Footer.jsx
export function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Our Story</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Team</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">For Teachers</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">For Parents</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">For Zoos</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Activity Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">FAQs</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Facebook</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Instagram</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {currentYear} Zoo Quest Adventure. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }