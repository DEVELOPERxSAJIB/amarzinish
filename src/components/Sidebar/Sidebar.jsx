import { Link, useLocation, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ sidebar }) => {
  const location = useLocation();
  const { id } = useParams();

  return (
    <>
      {sidebar && (
        <aside
          id="layout-menu"
          className="layout-menu menu-vertical menu bg-menu-theme"
        >
          <div className="app-brand demo">
            <Link to="/" className="app-brand-link py-3">
              <span className="app-brand-logo demo">
                {/* <svg
                width={32}
                height={22}
                viewBox="0 0 32 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                  fill="#7367F0"
                />
                <path
                  opacity="0.06"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                  fill="#161616"
                />
                <path
                  opacity="0.06"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                  fill="#161616"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                  fill="#7367F0"
                />
              </svg> */}
              </span>
              <span
                style={{
                  background:
                    "-webkit-linear-gradient(60deg, #4834d4, #7367F0, #9C94F4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
                className="app-brand-text demo menu-text fw-bold"
              >
                Penta Online
              </span>
            </Link>
          </div>
          <div className="menu-inner-shadow" />

          <ul className="menu-inner py-1">
            <li
              className={
                location.pathname === "/" ? "menu-item active" : "menu-item"
              }
            >
              <Link to={"/"} className="menu-link">
                <i className="menu-icon tf-icons ti ti-home" />
                <div data-i18n="Email">Dashboard</div>
              </Link>
            </li>

            <li
              className={
                location.pathname === "/packages" ||
                location.pathname === "/create-plan" ||
                location.pathname === `/update-plan/${id}`
                  ? "menu-item active"
                  : "menu-item"
              }
            >
              <Link to={"/packages"} className="menu-link">
                <i className="ti ti-currency-dollar me-1 ti-xs"></i>
                <div data-i18n="Email">Pricing & Plans</div>
              </Link>
            </li>

            {/* Employees */}
            <li className={"menu-item"}>
              <a
                href="#productSubmenu"
                data-bs-toggle="collapse"
                aria-expanded="false"
                className={
                  location.pathname === "/employees" ||
                  location.pathname === "/create-employee" ||
                  location.pathname === "/pending-employees" ||
                  location.pathname === `/employees/profile/${id}` ||
                  location.pathname === `/employees/update/${id}`
                    ? `dropdown-toggle menu-link bg-custom`
                    : `dropdown-toggle menu-link`
                }
              >
                <i className="menu-icon tf-icons ti ti-users" />
                <div data-i18n="Chat">Employees</div>
              </a>
              <ul className="list-unstyled collapse" id="productSubmenu">
                <li
                  className={
                    location.pathname === "/employees"
                      ? "menu-item active"
                      : "menu-item"
                  }
                >
                  <Link to={"/employees"} className="menu-link">
                    <div className="ms-3 d-flex">
                      <i className="menu-icon tf-icons ti ti-folder" />
                      <div data-i18n="Chat">My Stuffs</div>
                    </div>
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === "/create-employee"
                      ? "menu-item active"
                      : "menu-item"
                  }
                >
                  <Link to={"/create-employee"} className="menu-link">
                    <div className="ms-3 d-flex">
                      <i className="menu-icon tf-icons ti ti-plus" />
                      <div data-i18n="Kanban">Add Stuff</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Customers */}
            <li className={"menu-item"}>
              <a
                href="#customerSubmenu"
                data-bs-toggle="collapse"
                aria-expanded="false"
                className={
                  location.pathname === "/customers" ||
                  location.pathname === "/create-customer" ||
                  location.pathname === `/customers/account/${id}` ||
                  location.pathname === `/customers/update-customer/${id}`
                    ? `dropdown-toggle menu-link bg-custom`
                    : `dropdown-toggle menu-link`
                }
              >
                <i className="menu-icon tf-icons ti ti-user" />
                <div data-i18n="Chat">Customers</div>
              </a>
              <ul className="list-unstyled collapse" id="customerSubmenu">
                <li
                  className={
                    location.pathname === "/customers"
                      ? "menu-item active"
                      : "menu-item"
                  }
                >
                  <Link to={"/customers"} className="menu-link">
                    <div className="ms-3 d-flex">
                      <i className="menu-icon tf-icons ti ti-folder" />
                      <div data-i18n="Chat">All Customers</div>
                    </div>
                  </Link>
                </li>

                <li
                  className={
                    location.pathname === "/create-customer"
                      ? "menu-item active"
                      : "menu-item"
                  }
                >
                  <Link to={"/create-customer"} className="menu-link">
                    <div className="ms-3 d-flex">
                      <i className="menu-icon tf-icons ti ti-plus" />
                      <div data-i18n="Kanban">Add Customer</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Charts & Maps */}
            <li className="menu-header small text-uppercase">
              <span className="menu-header-text" data-i18n="Charts & Maps">
                Charts &amp; Maps
              </span>
            </li>
            <li className="menu-item">
              <a className="menu-link menu-toggle">
                <i className="menu-icon tf-icons ti ti-chart-pie" />
                <div data-i18n="Charts">Charts</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="charts-apex.html" className="menu-link">
                    <div data-i18n="Apex Charts">Apex Charts</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="charts-chartjs.html" className="menu-link">
                    <div data-i18n="ChartJS">ChartJS</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="maps-leaflet.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-map" />
                <div data-i18n="Leaflet Maps">Leaflet Maps</div>
              </a>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
