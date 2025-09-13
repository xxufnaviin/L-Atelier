export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="font-italiana text-2xl font-medium text-gray-900 tracking-wide">
              L'Atelier
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
