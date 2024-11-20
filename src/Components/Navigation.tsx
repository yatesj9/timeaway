import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import RequestModal from "./RequestModal";

interface NavigationProps {
  handleReloadRequests: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ handleReloadRequests }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark"); // Enable dark mode
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark"); // Default to light mode
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      // Update class and localStorage
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="text-white p-4">
        <nav className="flex justify-between items-center">
          <h1 className="rounded text-black dark:text-white text-2xl">
            Time Away
          </h1>
          <div className="flex items-center space-x-4">
            <button className="button-cyan" onClick={openModal}>
              New Request
            </button>
            <div
              className="relative flex items-center justify-center w-12 h-6 bg-gray-400 rounded-full cursor-pointer"
              onClick={toggleDarkMode}
            >
              {/* Background of the toggle switch */}
              <span
                className={`absolute left-0 w-6 h-6 bg-white rounded-full transition-transform ${
                  darkMode ? "transform translate-x-6" : ""
                }`}
              ></span>
              {/* Icons */}
              <SunIcon
                className={`w-4 h-4 text-yellow-400 transition-opacity duration-300 ${
                  darkMode ? "opacity-100" : "opacity-0"
                }`}
              />
              <MoonIcon
                className={`w-4 h-4 text-green-400 transition-opacity duration-300 ${
                  darkMode ? "opacity-0" : "opacity-100"
                }`}
              />{" "}
            </div>
          </div>
        </nav>
      </header>

      <RequestModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleReloadRequests={handleReloadRequests}
      />
    </>
  );
};

export default Navigation;
