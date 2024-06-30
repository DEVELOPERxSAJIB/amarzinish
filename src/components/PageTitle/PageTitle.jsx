import { Helmet } from "react-helmet";

// eslint-disable-next-line react/prop-types
const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title || "Wifi Dashboard"} - Penta Online</title>
    </Helmet>
  );
};

export default PageTitle;
