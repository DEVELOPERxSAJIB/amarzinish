import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const Tabs = ({ data }) => {
  return (
    <>
      <div>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <i className="ti ti-currency-dollar me-1 ti-xs"></i>Billing &
              Plans
            </button>
          </li>
        </ul>

        {/* Tabs Data */}

        <div className="tab-content" id="pills-tabContent">
          {/* === 1st Tab === */}
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="card mb-4">
              <h5 className="card-header">Package</h5>
              <div className="card-body pb-5">
                <div className="d-flex gap-4">
                  <div
                    className="img-area border border-primary border-2 solid "
                    style={{ width: "50%" }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        padding: "10px",
                      }}
                      src={
                        data?.icon?.url !== null
                          ? data?.icon?.url
                          : "https://static.vecteezy.com/system/resources/previews/028/754/715/original/3d-purple-gift-box-present-illustration-icon-for-ui-ux-png.png"
                      }
                      alt="package icon"
                    />
                  </div>
                  <div
                    className="text-area bg-primary p-5"
                    style={{ width: "50%" }}
                  >
                    <h4 className="m-0 text-white border-bottom border-2 py-1">
                      Name : {data && data?.name}
                    </h4>

                    <h4 className="m-0 text-white border-bottom border-2 py-1">
                      Data Pack : {data?.mbps} Mbps
                    </h4>
                    <h4 className="m-0 text-white border-bottom border-2 py-1">
                      Price : {data?.price} BDT
                    </h4>
                    {data?.badge && (
                      <h4 className="m-0 text-white border-bottom border-2 py-1">
                        Badge : {data?.badge}
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Tabs.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    mbps: PropTypes.string,
    badge: PropTypes.string,
    createdAt: PropTypes.string,
    icon: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
};

export default Tabs;
