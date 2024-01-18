import React from "react";
import HomePage from "./pages/HomePage";
import ArchievedPage from "./pages/ArchievedPage";
import NotFoundPage from "./pages/NotFoundPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import AddNotePage from "./pages/AddNotePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import LocaleContext from "./context/LocaleContext";
import ThemeContext from "./context/ThemeContext";

const NoteApp = () => {
  const [authUser, setAuthUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("locale") || "id";
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      setAuthUser(data);
      setInitializing(false);
    };
    fetchUser();
  }, []);

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return (prevLocale = newLocale);
    });
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return (prevTheme = newTheme);
    });
  };
  const LocaleContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);
  const ThemeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);
  const onLoginSuccess = ({ accessToken }) => {
    putAccessToken(accessToken);
    const loginUser = async () => {
      const { data } = await getUserLogged();
      setAuthUser(data);
    };
    loginUser();
    navigate("/");
  };
  const onLogoutHandler = () => {
    setAuthUser(null);
    putAccessToken("");
  };

  if (initializing) {
    return null;
  }
  if (authUser === null) {
    return (
      <>
        <ThemeContext.Provider value={ThemeContextValue}>
          <LocaleContext.Provider value={LocaleContextValue}>
            <div className={theme === "dark" ? "dark" : ""}>
              <div className="bg-gray-200 text-black dark:bg-black dark:text-white md:px-16 px-4">
                <Navbar onLogout={onLogoutHandler} authUser={authUser} />
                <div className="flex justify-center items-center h-screen">
                  <Routes>
                    <Route
                      path="*"
                      element={<LoginPage onLogin={onLoginSuccess} />}
                    />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </div>
              </div>
            </div>
          </LocaleContext.Provider>
        </ThemeContext.Provider>
      </>
    );
  }

  return (
    <ThemeContext.Provider value={ThemeContextValue}>
      <LocaleContext.Provider value={LocaleContextValue}>
        <div className={theme === "dark" ? "dark" : ""}>
          <div className="bg-gray-200 text-black dark:bg-black dark:text-white md:px-16 px-4 min-h-screen ">
            <Navbar onLogout={onLogoutHandler} authUser={authUser} />
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/notes/new" element={<AddNotePage />} />
              <Route path="/archieved" element={<ArchievedPage />} />
              <Route path="/notes/:id" element={<NoteDetailPage />} />
            </Routes>
          </div>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
};

export default NoteApp;
