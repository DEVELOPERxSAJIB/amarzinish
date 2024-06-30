const Security = () => {
  return (
    <>
      {/* Change Password */}
      <div className="card mb-4">
        <h5 className="card-header">Change Password</h5>
        <div className="card-body">
          <form id="formChangePassword" method="GET">
            <div className="alert alert-warning" role="alert">
              <h5 className="alert-heading mb-2">
                Ensure that these requirements are met
              </h5>
              <span>Minimum 8 characters long, uppercase &amp; symbol</span>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-sm-6 form-password-toggle">
                <label className="form-label" htmlFor="newPassword">
                  New Password
                </label>
                <div className="input-group input-group-merge">
                  <input
                    className="form-control"
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="············"
                  />
                  <span className="input-group-text cursor-pointer">
                    <i className="ti ti-eye-off" />
                  </span>
                </div>
              </div>
              <div className="mb-3 col-12 col-sm-6 form-password-toggle">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <div className="input-group input-group-merge">
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="············"
                  />
                  <span className="input-group-text cursor-pointer">
                    <i className="ti ti-eye-off" />
                  </span>
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary me-2">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/*/ Change Password */}

      {/* Recent Devices */}
      <div className="card mb-4">
        <h5 className="card-header">Recent Devices</h5>
        <div className="table-responsive">
          <table className="table border-top">
            <thead>
              <tr>
                <th className="text-truncate">Browser</th>
                <th className="text-truncate">Device</th>
                <th className="text-truncate">Location</th>
                <th className="text-truncate">Recent Activities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-truncate">
                  <i className="ti ti-brand-windows text-info ti-xs me-2" />
                  <span className="fw-medium">Chrome on Windows</span>
                </td>
                <td className="text-truncate">HP Spectre 360</td>
                <td className="text-truncate">Switzerland</td>
                <td className="text-truncate">10, July 2021 20:07</td>
              </tr>
              <tr>
                <td className="text-truncate">
                  <i className="ti ti-device-mobile text-danger ti-xs me-2" />
                  <span className="fw-medium">Chrome on iPhone</span>
                </td>
                <td className="text-truncate">iPhone 12x</td>
                <td className="text-truncate">Australia</td>
                <td className="text-truncate">13, July 2021 10:10</td>
              </tr>
              <tr>
                <td className="text-truncate">
                  <i className="ti ti-brand-android text-success ti-xs me-2" />
                  <span className="fw-medium">Chrome on Android</span>
                </td>
                <td className="text-truncate">Oneplus 9 Pro</td>
                <td className="text-truncate">Dubai</td>
                <td className="text-truncate">14, July 2021 15:15</td>
              </tr>
              <tr>
                <td className="text-truncate">
                  <i className="ti ti-brand-apple ti-xs me-2" />
                  <span className="fw-medium">Chrome on MacOS</span>
                </td>
                <td className="text-truncate">Apple iMac</td>
                <td className="text-truncate">India</td>
                <td className="text-truncate">16, July 2021 16:17</td>
              </tr>
              <tr>
                <td className="text-truncate">
                  <i className="ti ti-brand-windows text-info ti-xs me-2" />
                  <span className="fw-medium">Chrome on Windows</span>
                </td>
                <td className="text-truncate">HP Spectre 360</td>
                <td className="text-truncate">Switzerland</td>
                <td className="text-truncate">20, July 2021 21:01</td>
              </tr>
              <tr>
                <td className="text-truncate border-bottom-0">
                  <i className="ti ti-brand-android text-success ti-xs me-2" />
                  <span className="fw-medium">Chrome on Android</span>
                </td>
                <td className="text-truncate border-bottom-0">Oneplus 9 Pro</td>
                <td className="text-truncate border-bottom-0">Dubai</td>
                <td className="text-truncate border-bottom-0">
                  21, July 2021 12:22
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*/ Recent Devices */}
    </>
  );
};

export default Security;
