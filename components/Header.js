import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between max-w-xl p-4 m-auto">
      <h1 className="font-bold">
        <Link href="/">
          <a className="transition hover:opacity-80">
            next<span className="font-light">xkcd</span>
          </a>
        </Link>
      </h1>

      <nav>
        <ul className="flex flex-row gap-2">
          <li>
            <Link href="/">
              <a className="text-sm font-semibold">Home</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
