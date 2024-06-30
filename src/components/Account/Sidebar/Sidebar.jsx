import moment from "moment";
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ data }) => {
  return (
    <div className="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
      <div className="card mb-4">
        <div className="card-body">
          {data && (
            <>
              <div className="user-avatar-section">
                <div className="d-flex align-items-center flex-column">
                  <img
                    className="img-fluid rounded mb-3 pt-1 mt-4"
                    style={ data.image?.url ? { height: "250px", width: "220px", objectFit: "cover" } : {height: "250px", width: "220px", objectFit: "fill" }}
                    src={ data.image.url !== null ? data.image.url :
                      "https://static.vecteezy.com/system/resources/thumbnails/022/876/359/small_2x/social-media-user-3d-cartoon-illustration-speech-bubble-with-internet-icon-png.png"
                    }
                    alt="User avatar"
                  />
                  <div className="user-info text-center">
                    <h4 className="mb-2">{data && data.name}</h4>
                    <span className="badge bg-label-secondary mt-1">
                      Customer
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around flex-wrap py-3 border-bottom"></div>
              <p className="mt-4 small text-uppercase text-muted">Details</p>
              <div className="info-container">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <span className="fw-medium me-1">Name:</span>
                    <span>{data?.name}</span>
                  </li>
                  {data.gender && (
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1 ">Gender:</span>
                      <span>{data.gender}</span>
                    </li>
                  )}
                  {data.remark && (
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1 ">Nick Name:</span>
                      <span className="text-primary">{data.remark}</span>
                    </li>
                  )}
                  {data.email && (
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Email:</span>
                      <span>{data.email}</span>
                    </li>
                  )}

                  {data.mobile && (
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Contact:</span>
                      <span>{data.mobile}</span>
                    </li>
                  )}

                  <li className="mb-2 pt-1">
                    <span className="fw-medium me-1">Joined :</span>
                    <span>{moment(data.createdAt).format("ll")}</span>
                  </li>
                  {data.address && (
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Address:</span>
                      <span>
                        {data.address?.street}, {data.address?.city}{" "}
                        {data.address?.postalCode && -data.address.postalCode}
                      </span>
                    </li>
                  )}

                  {data.address.country && (
                    <li className="pt-1">
                      <span className="fw-medium me-1">Country:</span>
                      <span>{data.address.country}</span>
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    remark: PropTypes.string,
    gender: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    createdAt: PropTypes.string,
    image : PropTypes.shape({
      url: PropTypes.string,
    }),
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      postalCode: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
};

export default Sidebar;
