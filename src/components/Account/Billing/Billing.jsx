const Billing = () => {
  return (
    <>
      <div className="card mb-4">
        <h5 className="card-header">Current Plan</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-xl-6 order-1 order-xl-0">
              <div className="mb-2">
                <h6 className="mb-1">Your Current Plan is Basic</h6>
                <p>A simple start for everyone</p>
              </div>
              <div className="mb-2 pt-1">
                <h6 className="mb-1">Active until Dec 09, 2021</h6>
                <p>
                  We will send you a notification upon Subscription expiration
                </p>
              </div>
              <div className="mb-3 pt-1">
                <h6 className="mb-1">
                  <span className="me-2">$199 Per Month</span>{" "}
                  <span className="badge bg-label-primary">Popular</span>
                </h6>
                <p>Standard plan for small to medium businesses</p>
              </div>
            </div>
            <div className="col-xl-6 order-0 order-xl-0">
              <div className="alert alert-warning" role="alert">
                <h5 className="alert-heading mb-2">We need your attention!</h5>
                <span>Your plan requires update</span>
              </div>
              <div className="plan-statistics">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-1">Days</h6>
                  <h6 className="mb-1">24 of 30 Days</h6>
                </div>
                <div className="progress mb-1" style={{ height: 10 }}>
                  <div
                    className="progress-bar w-75"
                    role="progressbar"
                    aria-valuenow={75}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <p>6 days remaining until your plan requires update</p>
              </div>
            </div>
            <div className="col-12 order-2 order-xl-0 d-flex flex-wrap gap-2">
              <button
                className="btn btn-primary me-2"
                data-bs-toggle="modal"
                data-bs-target="#upgradePlanModal"
              >
                Upgrade Plan
              </button>
              <button className="btn btn-label-danger cancel-subscription">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-action mb-4">
        <div className="card-header align-items-center">
          <h5 className="card-action-title mb-0">Billing Address</h5>
          <div className="card-action-element">
            <button
              className="btn btn-primary btn-sm edit-address"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addNewAddress"
            >
              Edit address
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-xl-7 col-12">
              <dl className="row mb-0">
                <dt className="col-sm-4 mb-2 fw-medium text-nowrap">
                  Company Name:
                </dt>
                <dd className="col-sm-8">Vuexy</dd>
                <dt className="col-sm-4 mb-2 fw-medium text-nowrap">
                  Billing Email:
                </dt>
                <dd className="col-sm-8">user@ex.com</dd>
                <dt className="col-sm-4 mb-2 fw-medium text-nowrap">Tax ID:</dt>
                <dd className="col-sm-8">TAX-357378</dd>
                <dt className="col-sm-4 mb-2 fw-medium text-nowrap">
                  VAT Number:
                </dt>
                <dd className="col-sm-8">SDF754K77</dd>
                <dt className="col-sm-4 mb-2 fw-medium text-nowrap">
                  Billing Address:
                </dt>
                <dd className="col-sm-8">
                  100 Water Plant <br />
                  Avenue, Building 1303
                  <br /> Wake Island
                </dd>
              </dl>
            </div>
            <div className="col-xl-5 col-12">
              <dl className="row mb-0">
                <dt className="col-sm-4 mb-2 fw-medium text-nowrap">
                  Contact:
                </dt>
                <dd className="col-sm-8">+1 (605) 977-32-65</dd>
                <dt className="col-sm-4 mb-2 fw-medium text-nowrap">
                  Country:
                </dt>
                <dd className="col-sm-8">Wake Island</dd>
                <dt className="col-sm-4 mb-2 fw-medium text-nowrap">State:</dt>
                <dd className="col-sm-8">Capholim</dd>
                <dt className="col-sm-4 mb-2 fw-medium text-nowrap">
                  Zipcode:
                </dt>
                <dd className="col-sm-8">403114</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Address Modal */}
      <div
        className="modal fade"
        id="addNewAddress"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-simple modal-add-new-address">
          <div className="modal-content p-3 p-md-5">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="text-center mb-4">
                <h3 className="address-title mb-2">Add New Address</h3>
                <p className="text-muted address-subtitle">
                  Add new address for express delivery
                </p>
              </div>
              <form id="addNewAddressForm" className="row g-3">
                <div className="col-12">
                  <div className="row">
                    <div className="col-md mb-md-0 mb-3">
                      <div className="form-check custom-option custom-option-icon">
                        <label
                          className="form-check-label custom-option-content"
                          htmlFor="customRadioHome"
                        >
                          <span className="custom-option-body">
                            <svg
                              width={41}
                              height={40}
                              viewBox="0 0 41 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24.25 33.75V23.75H16.75V33.75H6.75002V18.0469C6.7491 17.8733 6.78481 17.7015 6.85482 17.5426C6.92482 17.3838 7.02754 17.2415 7.15627 17.125L19.6563 5.76562C19.8841 5.5559 20.1825 5.43948 20.4922 5.43948C20.8019 5.43948 21.1003 5.5559 21.3281 5.76562L33.8438 17.125C33.9696 17.2438 34.0703 17.3866 34.1401 17.5449C34.2098 17.7032 34.2472 17.8739 34.25 18.0469V33.75H24.25Z"
                                fill="currentColor"
                                opacity="0.2"
                              />
                              <path
                                d="M33.25 33.75C33.25 34.3023 33.6977 34.75 34.25 34.75C34.8023 34.75 35.25 34.3023 35.25 33.75H33.25ZM34.25 18.0469H35.25C35.25 18.0415 35.25 18.0361 35.2499 18.0307L34.25 18.0469ZM33.8437 17.125L34.5304 16.398C34.5256 16.3934 34.5207 16.389 34.5158 16.3845L33.8437 17.125ZM21.3281 5.76562L20.6509 6.50143L20.656 6.50611L21.3281 5.76562ZM19.6562 5.76562L20.3288 6.5057L20.3335 6.50141L19.6562 5.76562ZM7.15625 17.125L7.82712 17.8666L7.82878 17.8651L7.15625 17.125ZM6.75 18.0469H7.75001L7.74999 18.0416L6.75 18.0469ZM5.75 33.75C5.75 34.3023 6.19772 34.75 6.75 34.75C7.30228 34.75 7.75 34.3023 7.75 33.75H5.75ZM3 32.75C2.44772 32.75 2 33.1977 2 33.75C2 34.3023 2.44772 34.75 3 34.75V32.75ZM38 34.75C38.5523 34.75 39 34.3023 39 33.75C39 33.1977 38.5523 32.75 38 32.75V34.75ZM23.25 33.75C23.25 34.3023 23.6977 34.75 24.25 34.75C24.8023 34.75 25.25 34.3023 25.25 33.75H23.25ZM15.75 33.75C15.75 34.3023 16.1977 34.75 16.75 34.75C17.3023 34.75 17.75 34.3023 17.75 33.75H15.75ZM35.25 33.75V18.0469H33.25V33.75H35.25ZM35.2499 18.0307C35.2449 17.7243 35.1787 17.422 35.0551 17.1416L33.225 17.9481C33.2409 17.9844 33.2495 18.0235 33.2501 18.0631L35.2499 18.0307ZM35.0551 17.1416C34.9316 16.8612 34.7531 16.6084 34.5304 16.398L33.1571 17.852C33.1859 17.8792 33.209 17.9119 33.225 17.9481L35.0551 17.1416ZM34.5158 16.3845L22.0002 5.02514L20.656 6.50611L33.1717 17.8655L34.5158 16.3845ZM22.0053 5.02984C21.5929 4.6502 21.0528 4.43948 20.4922 4.43948V6.43948C20.551 6.43948 20.6076 6.46159 20.6509 6.50141L22.0053 5.02984ZM20.4922 4.43948C19.9316 4.43948 19.3915 4.6502 18.979 5.02984L20.3335 6.50141C20.3767 6.46159 20.4334 6.43948 20.4922 6.43948V4.43948ZM18.9837 5.02556L6.48371 16.3849L7.82878 17.8651L20.3288 6.50569L18.9837 5.02556ZM6.48538 16.3834C6.25236 16.5942 6.06642 16.8518 5.93971 17.1393L7.76988 17.9459C7.78318 17.9157 7.80268 17.8887 7.82712 17.8666L6.48538 16.3834ZM5.93971 17.1393C5.813 17.4269 5.74836 17.7379 5.75001 18.0521L7.74999 18.0416C7.74981 18.0087 7.75659 17.976 7.76988 17.9459L5.93971 17.1393ZM5.75 18.0469V33.75H7.75V18.0469H5.75ZM3 34.75H38V32.75H3V34.75ZM25.25 33.75V25H23.25V33.75H25.25ZM25.25 25C25.25 24.4033 25.013 23.831 24.591 23.409L23.1768 24.8232C23.2237 24.8701 23.25 24.9337 23.25 25H25.25ZM24.591 23.409C24.169 22.987 23.5967 22.75 23 22.75V24.75C23.0663 24.75 23.1299 24.7763 23.1768 24.8232L24.591 23.409ZM23 22.75H18V24.75H23V22.75ZM18 22.75C17.4033 22.75 16.831 22.9871 16.409 23.409L17.8232 24.8232C17.8701 24.7763 17.9337 24.75 18 24.75V22.75ZM16.409 23.409C15.9871 23.831 15.75 24.4033 15.75 25H17.75C17.75 24.9337 17.7763 24.8701 17.8232 24.8232L16.409 23.409ZM15.75 25V33.75H17.75V25H15.75Z"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="custom-option-title">Home</span>
                            <small> Delivery time (9am – 9pm) </small>
                          </span>
                          <input
                            name="customRadioIcon"
                            className="form-check-input"
                            type="radio"
                            defaultValue
                            id="customRadioHome"
                            defaultChecked
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-md mb-md-0 mb-3">
                      <div className="form-check custom-option custom-option-icon">
                        <label
                          className="form-check-label custom-option-content"
                          htmlFor="customRadioOffice"
                        >
                          <span className="custom-option-body">
                            <svg
                              width={41}
                              height={40}
                              viewBox="0 0 41 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.75 33.75V6.25C22.75 5.91848 22.6183 5.60054 22.3839 5.36612C22.1495 5.1317 21.8315 5 21.5 5H6.5C6.16848 5 5.85054 5.1317 5.61612 5.36612C5.3817 5.60054 5.25 5.91848 5.25 6.25V33.75"
                                fill="currentColor"
                                fillOpacity="0.2"
                              />
                              <path
                                d="M2.75 32.75C2.19772 32.75 1.75 33.1977 1.75 33.75C1.75 34.3023 2.19772 34.75 2.75 34.75V32.75ZM37.75 34.75C38.3023 34.75 38.75 34.3023 38.75 33.75C38.75 33.1977 38.3023 32.75 37.75 32.75V34.75ZM21.75 33.75C21.75 34.3023 22.1977 34.75 22.75 34.75C23.3023 34.75 23.75 34.3023 23.75 33.75H21.75ZM21.5 5V4V5ZM5.25 6.25H4.25H5.25ZM4.25 33.75C4.25 34.3023 4.69772 34.75 5.25 34.75C5.80228 34.75 6.25 34.3023 6.25 33.75H4.25ZM34.25 33.75C34.25 34.3023 34.6977 34.75 35.25 34.75C35.8023 34.75 36.25 34.3023 36.25 33.75H34.25ZM22.75 14C22.1977 14 21.75 14.4477 21.75 15C21.75 15.5523 22.1977 16 22.75 16V14ZM10.25 10.25C9.69772 10.25 9.25 10.6977 9.25 11.25C9.25 11.8023 9.69772 12.25 10.25 12.25V10.25ZM15.25 12.25C15.8023 12.25 16.25 11.8023 16.25 11.25C16.25 10.6977 15.8023 10.25 15.25 10.25V12.25ZM12.75 20.25C12.1977 20.25 11.75 20.6977 11.75 21.25C11.75 21.8023 12.1977 22.25 12.75 22.25V20.25ZM17.75 22.25C18.3023 22.25 18.75 21.8023 18.75 21.25C18.75 20.6977 18.3023 20.25 17.75 20.25V22.25ZM10.25 26.5C9.69772 26.5 9.25 26.9477 9.25 27.5C9.25 28.0523 9.69772 28.5 10.25 28.5V26.5ZM15.25 28.5C15.8023 28.5 16.25 28.0523 16.25 27.5C16.25 26.9477 15.8023 26.5 15.25 26.5V28.5ZM27.75 26.5C27.1977 26.5 26.75 26.9477 26.75 27.5C26.75 28.0523 27.1977 28.5 27.75 28.5V26.5ZM30.25 28.5C30.8023 28.5 31.25 28.0523 31.25 27.5C31.25 26.9477 30.8023 26.5 30.25 26.5V28.5ZM27.75 20.25C27.1977 20.25 26.75 20.6977 26.75 21.25C26.75 21.8023 27.1977 22.25 27.75 22.25V20.25ZM30.25 22.25C30.8023 22.25 31.25 21.8023 31.25 21.25C31.25 20.6977 30.8023 20.25 30.25 20.25V22.25ZM2.75 34.75H37.75V32.75H2.75V34.75ZM23.75 33.75V6.25H21.75V33.75H23.75ZM23.75 6.25C23.75 5.65326 23.5129 5.08097 23.091 4.65901L21.6768 6.07322C21.7237 6.12011 21.75 6.18369 21.75 6.25H23.75ZM23.091 4.65901C22.669 4.23705 22.0967 4 21.5 4V6C21.5663 6 21.6299 6.02634 21.6768 6.07322L23.091 4.65901ZM21.5 4H6.5V6H21.5V4ZM6.5 4C5.90326 4 5.33097 4.23705 4.90901 4.65901L6.32322 6.07322C6.37011 6.02634 6.4337 6 6.5 6V4ZM4.90901 4.65901C4.48705 5.08097 4.25 5.65326 4.25 6.25H6.25C6.25 6.1837 6.27634 6.12011 6.32322 6.07322L4.90901 4.65901ZM4.25 6.25V33.75H6.25V6.25H4.25ZM36.25 33.75V16.25H34.25V33.75H36.25ZM36.25 16.25C36.25 15.6533 36.013 15.081 35.591 14.659L34.1768 16.0732C34.2237 16.1201 34.25 16.1837 34.25 16.25H36.25ZM35.591 14.659C35.169 14.2371 34.5967 14 34 14V16C34.0663 16 34.1299 16.0263 34.1768 16.0732L35.591 14.659ZM34 14H22.75V16H34V14ZM10.25 12.25H15.25V10.25H10.25V12.25ZM12.75 22.25H17.75V20.25H12.75V22.25ZM10.25 28.5H15.25V26.5H10.25V28.5ZM27.75 28.5H30.25V26.5H27.75V28.5ZM27.75 22.25H30.25V20.25H27.75V22.25Z"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="custom-option-title">
                              {" "}
                              Office{" "}
                            </span>
                            <small> Delivery time (9am – 5pm) </small>
                          </span>
                          <input
                            name="customRadioIcon"
                            className="form-check-input"
                            type="radio"
                            defaultValue
                            id="customRadioOffice"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="modalAddressFirstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="modalAddressFirstName"
                    name="modalAddressFirstName"
                    className="form-control"
                    placeholder="John"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="modalAddressLastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="modalAddressLastName"
                    name="modalAddressLastName"
                    className="form-control"
                    placeholder="Doe"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="modalAddressCountry">
                    Country
                  </label>
                  <select
                    id="modalAddressCountry"
                    name="modalAddressCountry"
                    className="select2 form-select"
                    data-allow-clear="true"
                  >
                    <option value>Select</option>
                    <option value="Australia">Australia</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Canada">Canada</option>
                    <option value="China">China</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="Korea">Korea, Republic of</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Russia">Russian Federation</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
                <div className="col-12 ">
                  <label className="form-label" htmlFor="modalAddressAddress1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="modalAddressAddress1"
                    name="modalAddressAddress1"
                    className="form-control"
                    placeholder="12, Business Park"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="modalAddressAddress2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="modalAddressAddress2"
                    name="modalAddressAddress2"
                    className="form-control"
                    placeholder="Mall Road"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="modalAddressLandmark">
                    Landmark
                  </label>
                  <input
                    type="text"
                    id="modalAddressLandmark"
                    name="modalAddressLandmark"
                    className="form-control"
                    placeholder="Nr. Hard Rock Cafe"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="modalAddressCity">
                    City
                  </label>
                  <input
                    type="text"
                    id="modalAddressCity"
                    name="modalAddressCity"
                    className="form-control"
                    placeholder="Los Angeles"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="modalAddressLandmark">
                    State
                  </label>
                  <input
                    type="text"
                    id="modalAddressState"
                    name="modalAddressState"
                    className="form-control"
                    placeholder="California"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="modalAddressZipCode">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="modalAddressZipCode"
                    name="modalAddressZipCode"
                    className="form-control"
                    placeholder={99950}
                  />
                </div>
                <div className="col-12">
                  <label className="switch">
                    <input type="checkbox" className="switch-input" />
                    <span className="switch-toggle-slider">
                      <span className="switch-on" />
                      <span className="switch-off" />
                    </span>
                    <span className="switch-label">
                      Use as a billing address?
                    </span>
                  </label>
                </div>
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary me-sm-3 me-1"
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-label-secondary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*/ Add New Address Modal */}
    </>
  );
};

export default Billing;
