import {
  setType,
  setPriceRange,
  setCategory,
  setSearch,
  setSortBy,
} from "../../app/AllSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import { Collapse, Divider } from "antd";
import { useEffect, useState } from "react";
import { FaMobile, FaLaptop, FaCamera } from "react-icons/fa6";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { Card } from "antd";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { TiStar } from "react-icons/ti";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "./style.css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useRef } from "react";
import SwiperCore from "swiper";
import { useGetProductQuery } from "../../app/ProductApi";
import { useNavigate } from "react-router-dom";
import AuctionDetails from "./../../components/Timer/AuctionDetails";
SwiperCore.use([Navigation]);

import Loading from "../../../src/assets/images/gradient-5812_256.gif";
const Home = () => {
  const navigate = useNavigate();
  const filters = useSelector((state) => state.AllState);
  const dispatch = useDispatch();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const onSwiperInit = (swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  };

  const [visibleProducts, setVisibleProducts] = useState(12);
  const handleViewMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
  };
  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(setCategory("all"));
  };
  const handleSearchField = () => {
    navigate("/products");
  };

  const handleTypeChange = (type) => {
    dispatch(setCategory(type));
    dispatch(setSearch(""));
    navigate("/products");
  };

  const { data, isLoading, isError } = useGetProductQuery();

  const CollapseItem = [
    {
      key: 1,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginBottom: "0px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
    {
      key: 2,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginTop: "5px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
    {
      key: 3,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginTop: "5px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
    {
      key: 4,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginTop: "5px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
    {
      key: 5,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginTop: "5px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
    {
      key: 6,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginTop: "5px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
    {
      key: 7,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginTop: "5px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
    {
      key: 8,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginTop: "5px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
    {
      key: 9,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginTop: "5px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
    {
      key: 10,
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            marginTop: "5px",
          }}
        >
          Can i buy now?
        </span>
      ),
      description: (
        <span style={{ fontSize: "16px", fontWeight: "400" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book?
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{ height: "85vh" }}
        className="container d-flex flex-column w-100 align-items-center justify-content-center"
      >
        <img src={Loading} alt="" />
      </div>
    );
  }

  return (
    <>
      <div className="home-wrapper">
        <div className="hero-section">
          <div className="container hero-content">
            <div className="hero-content-wrapper">
              <div className="search-box">
                <div>
                  <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search for products..."
                  />

                  <IoSearchOutline
                    onClick={handleSearchField}
                    className="src-icon"
                  />
                </div>
              </div>
              <div className="ms-3">
                <p>Popular search</p>
                <div className="popular-item">
                  <button
                    onClick={() => handleTypeChange("mobile")}
                    className="item border-0"
                  >
                    <FaMobile className="icon" />
                    <span>Mobile</span>
                  </button>
                  <button
                    onClick={() => handleTypeChange("laptop")}
                    className="item border-0"
                  >
                    <FaLaptop className="icon" />
                    <span>Laptop</span>
                  </button>
                  <button
                    onClick={() => handleTypeChange("camera")}
                    className="item border-0"
                  >
                    <FaCamera className="icon" />
                    <span>Camera</span>
                  </button>
                  <button
                    onClick={() => handleTypeChange("all")}
                    className="item border-0"
                  >
                    <span>All</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="new-arrival">
          <div className="container">
            <div className="row">
              <div className="title">
                <h2>New Arrivals</h2>
                <p>Fixed and Auction items</p>
              </div>
            </div>
            <div className="row">
              {data?.length > 0 ? (
                data
                  .filter(
                    (item) =>
                      item?.status?.S !== "pending" &&
                      item?.mark?.S !== "sold" &&
                      (!item?.date || new Date(item?.date?.S) >= new Date())
                  )
                  .map((product, index) => {
                    return (
                      <div
                        key={index}
                        className="col-lg-3 col-md-4 col-sm-6 col-sm-12"
                      >
                        <Card
                          className="product-card border-0"
                          cover={
                            product?.images?.SS[0] ? (
                              <img alt="example" src={product?.images?.SS[0]} />
                            ) : (
                              <img
                                alt="example"
                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                              />
                            )
                          }
                        >
                          {product?.type?.S === "auction" && (
                            <button className="act-btn">Auction</button>
                          )}
                          {product?.type?.S === "auction" && (
                            <AuctionDetails id={product.productId?.S} />
                          )}
                          <div className="content">
                            <div className="product-name">
                              {product?.title?.S?.slice(0,20)}
                            </div>
                            <div className="short-desc">
                              {product?.title?.S?.slice(0,20)}
                            </div>
                            <b className="price">৳ {product?.price?.N}</b>
                            <Link
                              to={`/product-details/${product?.productId?.S}`}
                            >
                              <button>Details</button>
                            </Link>
                          </div>
                        </Card>
                      </div>
                    );
                  })
              ) : (
                <p className="text-center my-5 py-5">No Product available</p>
              )}
            </div>
          </div>
          {visibleProducts <
            data?.filter(
              (item) =>
                item?.status?.S !== "pending" &&
                item?.mark?.S !== "sold" &&
                (!item?.date || new Date(item?.date?.S) >= new Date())
            )?.length && (
            <div className="text-center mt-4">
              <button
                className="btn btn-light"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "16px 54px",
                  borderRadius: "50px",
                }}
                onClick={handleViewMore}
              >
                View More
              </button>
            </div>
          )}
        </div>

        <div className="customer-review">
          <div className="">
            <div className="container title">
              <h2>Our Happy Customer</h2>
              <div className="slider-btn">
                <button ref={prevRef}>
                  <GoArrowLeft size={24} />
                </button>
                <button ref={nextRef}>
                  <GoArrowRight size={24} />
                </button>
              </div>
            </div>

            <div className="reivew-slider">
              <Swiper
                onInit={onSwiperInit}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={5}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 400,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 100,
                  },
                }}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="review">
                    <div className="rating">
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                    </div>
                    <div className="name">
                      Sarah M.
                      <IoIosCheckmarkCircle
                        className="profile-check"
                        size={25}
                      />
                    </div>
                    <div className="text">
                      <p>
                        Im blown away by the quality and style of the clothes I
                        received from Shop.co. From casual wear to elegant
                        dresses, every piece Ive bought has exceeded my
                        expectations.”
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review">
                    <div className="rating">
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                    </div>
                    <div className="name">
                      Iam ONE M.
                      <IoIosCheckmarkCircle
                        className="profile-check"
                        size={25}
                      />
                    </div>
                    <div className="text">
                      <p>
                        Im blown away by the quality and style of the clothes I
                        received from Shop.co. From casual wear to elegant
                        dresses, every piece Ive bought has exceeded my
                        expectations.”
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review">
                    <div className="rating">
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                    </div>
                    <div className="name">
                      Sarah M.
                      <IoIosCheckmarkCircle
                        className="profile-check"
                        size={25}
                      />
                    </div>
                    <div className="text">
                      <p>
                        Im blown away by the quality and style of the clothes I
                        received from Shop.co. From casual wear to elegant
                        dresses, every piece Ive bought has exceeded my
                        expectations.”
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review">
                    <div className="rating">
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                    </div>
                    <div className="name">
                      Sarah M.
                      <IoIosCheckmarkCircle
                        className="profile-check"
                        size={25}
                      />
                    </div>
                    <div className="text">
                      <p>
                        Im blown away by the quality and style of the clothes I
                        received from Shop.co. From casual wear to elegant
                        dresses, every piece Ive bought has exceeded my
                        expectations.”
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review">
                    <div className="rating">
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                    </div>
                    <div className="name">
                      Sarah M.
                      <IoIosCheckmarkCircle
                        className="profile-check"
                        size={25}
                      />
                    </div>
                    <div className="text">
                      <p>
                        Im blown away by the quality and style of the clothes I
                        received from Shop.co. From casual wear to elegant
                        dresses, every piece Ive bought has exceeded my
                        expectations.”
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review">
                    <div className="rating">
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                    </div>
                    <div className="name">
                      Sarah M.
                      <IoIosCheckmarkCircle
                        className="profile-check"
                        size={25}
                      />
                    </div>
                    <div className="text">
                      <p>
                        Im blown away by the quality and style of the clothes I
                        received from Shop.co. From casual wear to elegant
                        dresses, every piece Ive bought has exceeded my
                        expectations.”
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review">
                    <div className="rating">
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                      <TiStar size={22} />
                    </div>
                    <div className="name">
                      Sarah M.
                      <IoIosCheckmarkCircle
                        className="profile-check"
                        size={25}
                      />
                    </div>
                    <div className="text">
                      <p>
                        Im blown away by the quality and style of the clothes I
                        received from Shop.co. From casual wear to elegant
                        dresses, every piece Ive bought has exceeded my
                        expectations.”
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <div className="container">
            <div className="title">
              <h2>FAQ</h2>
              <p>You may have these questions</p>
            </div>
            {CollapseItem.map((item, index) => {
              return (
                <div key={index} style={{ marginTop: "17px" }}>
                  <Collapse
                    items={[
                      {
                        key: item.key,
                        label: item?.label,
                        children: item?.description,
                      },
                    ]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
