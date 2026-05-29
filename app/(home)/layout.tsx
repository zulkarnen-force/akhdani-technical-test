"use client";
import { useState } from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <header className="bg-primary text-primary-foreground p-4 shadow-md ">
        <h1 className="text-2xl font-bold">My App</h1>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="bg-surface-muted text-secondary-foreground w-64 p-4 mr-4">
          <nav>
            <ul>
              <li className="mb-2">
                <a
                  href="/"
                  className={`text-lg font-medium hover:bold active:text-primary text-center flex ${
                    activePage === "home" ? "underline" : ""
                  }`}
                  onClick={() => setActivePage("home")}
                >
                  Permohonan Perjalanan Dinas
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/master-data"
                  className={`text-lg font-medium hover:bold active:text-primary flex justify-center ${
                    activePage === "master-data" ? "underline" : ""
                  }`}
                  onClick={() => setActivePage("master-data")}
                >
                  Master Data
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="min-w-0 flex-1 overflow-auto px-6 py-8 sm:px-8"> {children}</main>
      </div>
    </div>
  );
}
