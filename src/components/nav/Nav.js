import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

export const Nav = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img
          src="./assets/logo.svg"
          alt=""
        ></img>
      </div>
      <nav className={styles.heading}>
        <ul className="nav">
          <li className="nav-item">
            {/* <a
              className="cart-wishlist"
              onClick={() => routeHandler(routeNames.productList)}
            >
            </a> */}
            <NavLink to="/videos" className={styles.navPills}>
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z"
                  fill="currentColor"
                ></path>
              </svg>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/library" className={styles.navPills}>
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H4V7c0-.55-.45-1-1-1z"
                  fill="currentColor"
                ></path>
                <path
                  d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 10.67V7.33c0-.79.88-1.27 1.54-.84l4.15 2.67a1 1 0 0 1 0 1.68l-4.15 2.67c-.66.43-1.54-.05-1.54-.84z"
                  fill="currentColor"
                ></path>
              </svg>
            </NavLink>
          </li>
          <li className="nav-item">
            {/* <a
              className="cart-wishlist"
              onClick={() => routeHandler(routeNames.cart)}
            >
             
            </a> */}
            <NavLink to="/account/details" className={styles.navPills}>
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"
                  fill="currentColor"
                ></path>
              </svg>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
