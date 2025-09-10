export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-loreal-red to-loreal-red-light rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <span className="font-semibold text-gray-900">
              GlowPulse <span className="text-loreal-red">AI</span>
            </span>
          </div>
          
          <div className="text-sm text-gray-600 text-center md:text-right">
            <p>&copy; 2024 L'Oréal. All rights reserved.</p>
            <p className="mt-1">Beauty Trend Intelligence Platform</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
