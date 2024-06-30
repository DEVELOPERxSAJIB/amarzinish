// Products.js
import "./Products.scss";
import { ImEqualizer2 } from "react-icons/im";
import { Card, Checkbox, Divider, Slider, Pagination } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../../app/ProductApi";
import { useDispatch, useSelector } from "react-redux";

import AuctionDetails from './../../components/Timer/AuctionDetails';
import {
  setType,
  setPriceRange,
  setCategory,
  setSearch,
  setSortBy,
} from "../../app/AllSlice";

const Products = () => {
  const { data } = useGetProductQuery();
  const filters = useSelector((state) => state.AllState);
  const dispatch = useDispatch();
  const filteredData = data
    ?.filter(
      (product) => product?.mark?.S !== "sold"&&(!product.date || new Date(product?.date?.S) >= new Date())
    )
    .filter((item) => item?.status?.S === "complete")
    .filter(
      (item) => filters?.type === "all" || item?.type?.S === filters?.type
    )
    .filter((item) => {
      const price = parseFloat(item?.price?.N);
      return price >= filters?.priceRange[0] && price <= filters?.priceRange[1];
    })
    .filter(
      (item) =>
        filters?.category === "all" || item?.category?.S === filters?.category
    )
    .filter((item) =>
      item?.title?.S.toLowerCase().includes(filters?.search.toLowerCase())
    )
    .sort((a, b) => {
      if (filters?.sortBy === "priceLowToHigh") {
        return parseFloat(a.price.N) - parseFloat(b.price.N);
      } else if (filters?.sortBy === "priceHighToLow") {
        return parseFloat(b.price.N) - parseFloat(a.price.N);
      }
      return 0;
    });

  const handleTypeChange = (e) => {
    dispatch(setType(e.target.value));
  };

  const handlePriceChange = (value) => {
    dispatch(setPriceRange(value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const truncateDetails = (details, maxLength) => {
    if (details.length <= maxLength) return details;
    return `${details.substring(0, maxLength)}...`;
  };

  const handleClearFilter = () => {
    dispatch(setType("all"));
    dispatch(setPriceRange([0, Number.POSITIVE_INFINITY]));
    dispatch(setCategory("all"));
    dispatch(setSearch(""));
    dispatch(setSortBy("default"));
  };

  return (
    <div className="products-main">
      <section id="products" className="container">
        <div className="row g-5 mt-0 mb-5">
          <div className="filter-area col-md-3 col-sm-12">
            <div className="filter-title d-flex justify-content-between align-items-center">
              <h4>Filters</h4>
              <div className="icon">
                <ImEqualizer2 size="22" color="#00000066" />
              </div>
            </div>
            <Divider />
            <form onSubmit={handleSubmit}>
              <div className="product-type">
                <h4>Type</h4>
                <div className="d-flex gap-2 flex-column mt-3 checkbox-item">
                  <Checkbox
                    value="all"
                    checked={filters?.type === "all"}
                    onChange={handleTypeChange}
                  >
                    All
                  </Checkbox>
                  <Checkbox
                    value="auction"
                    checked={filters?.type === "auction"}
                    onChange={handleTypeChange}
                  >
                    Auction
                  </Checkbox>
                  <Checkbox
                    value="fixed"
                    checked={filters?.type === "fixed"}
                    onChange={handleTypeChange}
                  >
                    Fixed Price
                  </Checkbox>
                </div>
              </div>
              <Divider />

              <div className="product-price-range">
                <h4>Pricing</h4>
                <div className="d-flex gap-2 flex-column mt-3">
                  <Slider
                    range
                    max={100000}
                    defaultValue={filters?.priceRange}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
              <Divider />

              <div className="categories">
                <h4>Categories</h4>
                <div className="d-flex gap-2 flex-column mt-3 checkbox-item">
                  <Checkbox
                    value="all"
                    checked={filters?.category === "all"}
                    onChange={handleCategoryChange}
                  >
                    All
                  </Checkbox>
                  <Checkbox
                    value="mobile"
                    checked={filters?.category === "mobile"}
                    onChange={handleCategoryChange}
                  >
                    Mobile
                  </Checkbox>
                  <Checkbox
                    value="laptop"
                    checked={filters?.category === "laptop"}
                    onChange={handleCategoryChange}
                  >
                    Laptop
                  </Checkbox>
                </div>
              </div>

              <div className="filter-btn">
                <button onClick={handleClearFilter} type="submit">
                  Clear Filter
                </button>
              </div>
            </form>
          </div>

          <div className="product-area col-sm-12 col-md-9">
            <div className="row">
              <div className="card">
                <div className="card-header all-products">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search for products..."
                        value={filters?.search}
                        onChange={handleSearchChange}
                      />
                      <IoSearchOutline className="src-icon" />
                    </div>
                    <div className="short-by">
                      <p className="d-block mr-3">Sort:</p>
                      <select
                        onChange={handleSortChange}
                        value={filters?.sortBy}
                        name="orderby"
                        className="form-control"
                      >
                        <option value="default">Default</option>
                        <option value="date">Sort by latest</option>
                        <option value="priceLowToHigh">
                          Price: (Low to high)
                        </option>
                        <option value="priceHighToLow">
                          Price: (High to Low)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="products">
                    <div className="row">
                      {filteredData?.length > 0?filteredData?.map((item) => (
                        <div
                          className="col-lg-4 col-md-4 col-sm-12"
                          key={item?.productId?.S}
                        >
                          <Card
                            className="product-card border-0"
                            
                            cover={
                              <img alt="example" src={item?.images?.SS[0]} />
                            }
                          >
                            {item?.type?.S === "auction" && (
                              <button className="act-btn">Auction</button>
                            )}
                             { item?.type?.S==="auction" &&
                              <AuctionDetails id={item.productId?.S} />}
                            <div className="content">
                              <div className="product-name">
                                {item?.title?.S}
                              </div>
                              <div className="short-desc">
                                {truncateDetails(item?.title?.S, 20)}
                              </div>
                              <b className="price">৳{item?.price?.N}</b>
                              <Link
                                to={`/product-details/${item?.productId?.S}`}
                              >
                                <button>Details</button>
                              </Link>
                            </div>
                          </Card>
                        </div>
                      )):<p className="text-center">No product available</p>}
                    </div>
                  </div>
                  {filteredData?.length > 0 && (
                    <div className="text-center my-2">
                      <Pagination
                        defaultCurrent={1}
                        total={
                          (filteredData?.length > 0
                            ? filteredData
                            : data?.filter(
                                (item) =>
                                  item.status === "complete" &&
                                  item.status !== "sold" &&
                                  item.status !== "bided"
                              ) || []
                          ).length
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
