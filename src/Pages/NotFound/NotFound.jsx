
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      className="d-flex align-items-center justify-content-center gap-5 flex-column"
    >
      <p>NotFound</p>
      <button className="btn btn-secondary">
        <Link className="nav-link" to="/">
          Back to Home
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
