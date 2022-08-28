import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const [results, setResults] = useState([]);
  const [cleanSearch, setCleanSearch] = useState(false);
  const searchRef = useRef();
  const { locale, locales } = useRouter();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();

    if (!q) return;

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults);
      });
  };

  const handleClick = () => {
    searchRef.current.value = "";
    setCleanSearch[cleanSearch = !cleanSearch];
    setResults([]);
  };

  useEffect(() => {}, [results]);

  // const restOfLocales = locales.filter((l) => l !== locale);

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
          <li>
            <input
              className="px-4 py-1 text-xs border border-gray-400 rounded-3xl"
              type="text"
              onChange={handleChange}
              ref={searchRef}
            />
            <button className="px-2 ml-2 rounded-xl bg-gray-200" onClick={handleClick}> Clean search</button>

            <div className="relative z-10">
              {Boolean(results.length) && (
                <div className="absolute top-0 left-0">
                  <ul className="z-50 w-full overflow-hidden bg-white border rounded-lg shadow-xl border-gray-50">
                    <li className="m-0" key="all-results">
                      <Link href={`/search?q=${getValue()}`}>
                        <a className="block px-2 py-1 overflow-hidden text-sm italic font-semibold text-gray-400 hover:bg-slate-200 text-ellipsis whitespace-nowrap">
                          Ver {results.length} resultados
                        </a>
                      </Link>
                    </li>

                    {results && results.map((result) => {
                      return (
                        <li className="m-0" key={result.id}>
                          <Link href={`/comic/${result.id}`}>
                            <a
                              onClick={handleClick}
                              className="block px-2 py-1 overflow-hidden text-sm font-semibold hover:bg-slate-200 text-ellipsis whitespace-nowrap"
                            >
                              {result.title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
