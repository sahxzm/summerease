export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <p>
              <span className="text-gray-800 dark:text-gray-200">
                Developed by{" "}
              </span>
              <span className="text-rose-600 dark:text-rose-400 font-medium">
                Sahil Singh
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-pink-600 dark:text-gray-200">
              Contact me:
            </span>
            <a
              href="mailto:sahilsingh0322@gmail.com"
              className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
            >
              sahilsingh0322@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
