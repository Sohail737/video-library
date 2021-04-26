import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import styles from "./Search.module.css";
export const Search = () => {
  const [search, setSearch] = useState("");
  const query = new URLSearchParams(useLocation().search);
  const searchParams = query.get("search");
  useEffect(() => {
    if (
      searchParams === "" ||
      searchParams === null
    ) {
      setSearch("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams !== "" && searchParams !== null) {
      setSearch((prev) => (prev = searchParams));
    }
  }, [searchParams]);

  const navigate = useNavigate();

  const filterSearch = (event) => {
    event.preventDefault();

    navigate(`?search=${search}`);
  };
  return (
    <>
      <form onSubmit={filterSearch} className={styles.search}>
        <input
          className={styles.searchInput + " input"}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
        <button className={styles.searchButton} type="submit">
          <svg
            className={styles.searchIcon}
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.319 14.433A8.001 8.001 0 0 0 6.343 3.868a8 8 0 0 0 10.564 11.976l.043.045l4.242 4.243a1 1 0 1 0 1.415-1.415l-4.243-4.242a1.116 1.116 0 0 0-.045-.042zm-2.076-9.15a6 6 0 1 1-8.485 8.485a6 6 0 0 1 8.485-8.485z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </button>
      </form>
    </>
  );
};
