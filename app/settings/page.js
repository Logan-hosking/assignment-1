"use client";

import { useEffect, useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="))
      ?.split("=")[1];

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  function changeTheme(newTheme) {
    setTheme(newTheme);

    document.cookie = `theme=${newTheme}; max-age=31536000; path=/`;

    document.documentElement.setAttribute("data-theme", newTheme);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">Settings</h1>

      <p className="mt-4">
        Customise the Phoneme Activity Builder interface.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Theme</h2>

        <p className="mt-3">
          Current theme: <strong>{theme}</strong>
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => changeTheme("light")}
            className="border rounded px-5 py-3"
          >
            Light
          </button>

          <button
            onClick={() => changeTheme("dark")}
            className="border rounded px-5 py-3"
          >
            Dark
          </button>
        </div>
      </section>
    </div>
  );
}