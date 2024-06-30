import { Link } from "react-router-dom";
const PaymentFailed = () => {
  return (
    <div className="container my-5 py-5 d-flex justify-content-center flex-column align-items-center">
      <p className="h4 text-danger">Bkash payment Failed</p>
      <Link type="button" className="btn mt-5 btn-secondary" to="/">
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentFailed;
