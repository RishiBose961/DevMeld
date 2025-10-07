import { Code, Search, Trophy } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import { ModeToggle } from "../mode-toggle";
import Notificationcomp from "../notification/Notificationcomp";
import { Button } from "../ui/button";

export const Header = () => {
  const { isAuthenticated, user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
        user: { username: string; id: number };
      };
    }) => state.auth
  );
  const navItems = [
    { id: "problems", label: "Problems", icon: Code, href: "" },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy, href: "leaderboard" },
    { id: "search", label: "Search", icon: Search, href: "search" },
  ];

  return (
    <header className="border-b bg-white rounded-b-2xl dark:bg-gray-900 z-10  border-gray-200 dark:border-gray-700 sticky top-0">
      <div>
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                DevMeld
              </h1>
            </div>
          </Link>
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ id, label, icon: Icon, href }) => (
              <NavLink
                key={id}
                to={`/${href}`}
                className={({ isActive }) =>
                  `flex flex-col items-center py-2 px-4 text-xs font-medium 
         transition-all duration-300 ease-in-out
         ${isActive
                    ? "text-black bg-primary/50 rounded-xl dark:text-white font-semibold shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  }`
                }
              >
                <Icon className="w-4 h-4 mb-1 transition-all duration-300" />
                <span className="transition-all duration-300">{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <Notificationcomp />

            <ModeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    234 credits
                  </p>
                </div>
                <img
                  src="https://via.placeholder.com/32"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/signin">
                  <Button className="text-sm font-medium transition-colors">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700 ">
        <div className="flex justify-around py-2">
          {navItems.map(({ id, label, icon: Icon, href }) => (
            <NavLink
              key={id}
              to={`/${href}`}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-4 text-xs font-medium 
         transition-all duration-300 ease-in-out
         ${isActive
                  ? "text-black bg-primary/50 rounded-xl dark:text-white font-semibold shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                }`
              }
            >
              <Icon className="w-4 h-4 mb-1 transition-all duration-300" />
              <span className="transition-all duration-300">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};
