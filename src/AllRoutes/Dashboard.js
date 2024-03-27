import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import StartIcon from "../Images/StartIcon";
import Loader from "../Components/Loader";

const Dashboard = () => {
  const CartSearchData = useSelector(
    (state) => state.cartslicedata.CartSearchSlice
  );
  const [value, setValue] = useState([0, 2000]);
  const [SmartphonesData, setSmartphonesData] = useState([]);
  const [LaptopsData, setLaptopsData] = useState([]);
  const [FragrancesData, setFragrancesData] = useState([]);
  const [SkincareData, setSkincareData] = useState([]);
  const [GroceryProductData, setGroceryProductData] = useState([]);
  const [Homedecoration, setHomedecoration] = useState([]);
  const [CheckValue, setCheckValue] = useState({
    smartphones: true,
    laptops: true,
    fragrances: true,
    skincare: true,
    groceries: true,
    homedecoration: true,
  });
  const [ALLDATA, setALLDATA] = useState([]);

  const UserTypeList = [
    { value: "smartphones", label: "smartphones" },
    { value: "laptops", label: "laptops" },
    { value: "fragrances", label: "fragrances" },
    { value: "skincare", label: "skincare" },
    { value: "groceries", label: "groceries" },
    { value: "homedecoration", label: "homedecoration" },
  ];

  const fetchProductData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    if (CartSearchData?.length > 0) {
      setALLDATA(CartSearchData);
      setSmartphonesData(
        CartSearchData.filter(
          (s) =>
            s.category === "smartphones" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
      setLaptopsData(
        CartSearchData.filter(
          (s) =>
            s.category === "laptops" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
      setFragrancesData(
        CartSearchData.filter(
          (s) =>
            s.category === "fragrances" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );

      setSkincareData(
        CartSearchData.filter(
          (s) =>
            s.category === "skincare" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
      setGroceryProductData(
        CartSearchData.filter(
          (s) =>
            s.category === "groceries" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
      setHomedecoration(
        CartSearchData.filter(
          (s) =>
            s.category === "home-decoration" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
    } else {
      setALLDATA(data.products);
      setLaptopsData(
        data.products.filter(
          (s) =>
            s.category === "laptops" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
      setSmartphonesData(
        data.products.filter(
          (s) =>
            s.category === "smartphones" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
      setFragrancesData(
        data.products.filter(
          (s) =>
            s.category === "fragrances" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );

      setSkincareData(
        data.products.filter(
          (s) =>
            s.category === "skincare" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
      setGroceryProductData(
        data.products.filter(
          (s) =>
            s.category === "groceries" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
      setHomedecoration(
        data.products.filter(
          (s) =>
            s.category === "home-decoration" &&
            s.price < parseInt(value[1]) &&
            s.price > parseInt(value[0])
        )
      );
    }
  };

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProductData();
    }, 200);
    return () => clearTimeout(timer);
    // fetchProductData();
  }, [value, CartSearchData]);

  function fnMinMaxValue(e, type) {
    if (e.target.value !== "" && type === "max") {
      setValue([value[0], e.target.value]);
    } else if (e.target.value !== "" && type === "min") {
      setValue([e.target.value, value[1]]);
    }
  }

  function clearAll(e) {
    setValue([0, 2000]);
    setCheckValue({
      smartphones: true,
      laptops: true,
      fragrances: true,
      skincare: true,
      groceries: true,
      "home-decoration": true,
    });
  }

  return (
    <>
      <Row className="">
        <div>
          <Slider className="dashboard-slider" {...settings}>
            {ALLDATA?.length > 0 &&
              ALLDATA?.map((items, indexs) => (
                <div className="d-flex slider-dash">
                  <Card.Img variant="top" src={items.thumbnail} />
                  <Card.Body className="ps-4">
                    <h3 className="product-name pt-2">
                      {items.title}{" "}
                      <span className="mb-3 mt-2">{items.description}</span>
                    </h3>

                    <h6 className="">Category : {items.category}</h6>
                    <div className="d-flex my-3 price">
                      <h3>
                        <Badge bg="secondary">Price : ${items.price}</Badge>
                      </h3>
                      <Card.Title className="rating m-0 justify-content-between align-items-center d-flex">
                        <StartIcon />
                        <span>{items.rating}</span>
                      </Card.Title>
                    </div>
                  </Card.Body>
                </div>
              ))}
          </Slider>
        </div>
      </Row>
      <Container fluid>
        <Row>
          <Col md={2} className="ps-4">
            <div className="d-flex justify-content-between mt-5">
              <h4>Filters</h4>
              <Button
                variant="btn btn_get btn_get_two"
                onClick={(e) => clearAll()}
              >
                CLEAR ALL
              </Button>
            </div>
            <hr className="mt-4" />
            <div className="d-flex justify-content-between mt-4">
              <div class="wrapper w-100">
                <header>
                  <h5>Price Range</h5>
                  <p>Use slider or enter min and max price</p>
                </header>
                <RangeSlider
                  min={1}
                  max={2000}
                  step={0}
                  value={value}
                  onInput={setValue}
                />
                <div className="d-flex justify-content-between mt-3">
                  <Form.Control
                    style={{ width: "100px" }}
                    type="text"
                    value={value[0]}
                    onChange={(e) => fnMinMaxValue(e, "min")}
                  />
                  <Form.Control
                    style={{ width: "100px" }}
                    type="text"
                    value={value[1]}
                    onChange={(e) => fnMinMaxValue(e, "max")}
                  />
                </div>
              </div>
            </div>
            <hr className="mt-4" />
            <div className="d-flex justify-content-between mt-4">
              <div class="wrapper w-100">
                <header>
                  <h5>Category</h5>
                </header>
                <div className="toggle-btn1">
                  {UserTypeList.map((item, index) => (
                    <>
                      <input
                        type="checkbox"
                        class="filled-in"
                        id={item.value}
                        name={item.value}
                        value={item.value}
                        checked={CheckValue[item.value]}
                        onChange={(e) => {
                          setCheckValue({
                            ...CheckValue,
                            [item.value]: !CheckValue[item.value],
                          });
                        }}
                      />
                      <label className=" ms-2" for={item.value}>
                        <h6 className="text-cate"> {item.value}</h6>
                      </label>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          <Col md={10}>
            {SmartphonesData?.length > 0 && CheckValue.smartphones && (
              <>
                <div class=" my-5 mb-4 ps-4">
                  <div class="card-header  border-0 d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">Top Deals on Smart Phones</h3>
                  </div>
                </div>
                <Row>
                  <Col className="d-flex  flex-wrap     ">
                    {SmartphonesData?.map(
                      (item, index) =>
                        item.category === "smartphones" && (
                          <Link
                            className={"remove-hover"}
                            to={{
                              pathname: "/product_details/" + item.id,
                            }}
                          >
                            <div className="">
                              <div className="prod-img">
                                <Card.Img variant="top" src={item.thumbnail} />
                              </div>
                              <Card.Body className="p-3">
                                <h5 className="product-name">
                                  {item.title} ({item.brand})
                                </h5>
                                <Badge bg="secondary mb-2">
                                  Discount {item.discountPercentage}%
                                </Badge>
                                <div className="d-flex  justify-content-between align-items-center">
                                  <Card.Title className="m-0">
                                    ${item.price}
                                  </Card.Title>
                                  <Card.Title className="rating m-0 justify-content-between align-items-center d-flex">
                                    <StartIcon />
                                    <span>{item.rating}</span>
                                  </Card.Title>
                                </div>
                              </Card.Body>
                            </div>
                          </Link>
                        )
                    )}
                  </Col>
                </Row>
              </>
            )}
            {LaptopsData.length > 0 && CheckValue.laptops && (
              <>
                <div class=" mt-5 mb-4 ps-4">
                  <div class="card-header  border-0 d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">Top Deals on Laptops</h3>
                  </div>
                </div>
                <Row>
                  <Col className="d-flex  flex-wrap ">
                    {LaptopsData.map((item, index) => (
                      <Link
                        className={"remove-hover"}
                        to={{
                          pathname: "/product_details/" + item.id,
                        }}
                      >
                        <div className="">
                          <div className="prod-img">
                            <Card.Img variant="top" src={item.thumbnail} />
                          </div>
                          <Card.Body className="p-3">
                            <h5 className="product-name">
                              {item.title} ({item.brand})
                            </h5>
                            <Badge bg="secondary mb-2">
                              Discount {item.discountPercentage}%
                            </Badge>
                            <div className="d-flex  justify-content-between align-items-center">
                              <Card.Title className="m-0">
                                ${item.price}
                              </Card.Title>
                              <Card.Title className="rating m-0 justify-content-between align-items-center d-flex">
                                <StartIcon />
                                <span>{item.rating}</span>
                              </Card.Title>
                            </div>
                          </Card.Body>
                        </div>
                      </Link>
                    ))}
                  </Col>
                </Row>
              </>
            )}
            {FragrancesData.length > 0 && CheckValue.fragrances && (
              <>
                <div class=" mt-5 mb-4 ps-4">
                  <div class="card-header  border-0 d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">Top Deals on Fragrances</h3>
                  </div>
                </div>
                <Row>
                  <Col className="d-flex  flex-wrap ">
                    {FragrancesData.map((item, index) => (
                      <Link
                        className={"remove-hover"}
                        to={{
                          pathname: "/product_details/" + item.id,
                        }}
                      >
                        <div className="">
                          <div className="prod-img">
                            <Card.Img variant="top" src={item.thumbnail} />
                          </div>
                          <Card.Body className="p-3">
                            <h5 className="product-name">
                              {item.title} ({item.brand})
                            </h5>
                            <Badge bg="secondary mb-2">
                              Discount {item.discountPercentage}%
                            </Badge>
                            <div className="d-flex  justify-content-between align-items-center">
                              <Card.Title className="m-0">
                                ${item.price}
                              </Card.Title>
                              <Card.Title className="rating m-0 justify-content-between align-items-center d-flex">
                                <StartIcon />
                                <span>{item.rating}</span>
                              </Card.Title>
                            </div>
                          </Card.Body>
                        </div>
                      </Link>
                    ))}
                  </Col>
                </Row>
              </>
            )}
            {SkincareData.length > 0 && CheckValue.skincare && (
              <>
                <div class=" mt-5 mb-4 ps-4">
                  <div class="card-header  border-0 d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">Top Deals on Skincare</h3>
                  </div>
                </div>
                <Row>
                  <Col className="d-flex  flex-wrap ">
                    {SkincareData.map((item, index) => (
                      <Link
                        className={"remove-hover"}
                        to={{
                          pathname: "/product_details/" + item.id,
                        }}
                      >
                        <div className="">
                          <div className="prod-img">
                            <Card.Img variant="top" src={item.thumbnail} />
                          </div>
                          <Card.Body className="p-3">
                            <h5 className="product-name">
                              {item.title} ({item.brand})
                            </h5>
                            <Badge bg="secondary mb-2">
                              Discount {item.discountPercentage}%
                            </Badge>
                            <div className="d-flex  justify-content-between align-items-center">
                              <Card.Title className="m-0">
                                ${item.price}
                              </Card.Title>
                              <Card.Title className="rating m-0 justify-content-between align-items-center d-flex">
                                <StartIcon />
                                <span>{item.rating}</span>
                              </Card.Title>
                            </div>
                          </Card.Body>
                        </div>
                      </Link>
                    ))}
                  </Col>
                </Row>
              </>
            )}
            {GroceryProductData.length > 0 && CheckValue.groceries && (
              <>
                <div class=" mt-5 mb-4 ps-4">
                  <div class="card-header  border-0 d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">Top Deals on Groceries</h3>
                  </div>
                </div>
                <Row>
                  <Col className="d-flex  flex-wrap ">
                    {GroceryProductData.map((item, index) => (
                      <Link
                        className={"remove-hover"}
                        to={{
                          pathname: "/product_details/" + item.id,
                        }}
                      >
                        <div className="">
                          <div className="prod-img">
                            <Card.Img variant="top" src={item.thumbnail} />
                          </div>
                          <Card.Body className="p-3">
                            <h5 className="product-name">
                              {item.title} ({item.brand})
                            </h5>
                            <Badge bg="secondary mb-2">
                              Discount {item.discountPercentage}%
                            </Badge>
                            <div className="d-flex  justify-content-between align-items-center">
                              <Card.Title className="m-0">
                                ${item.price}
                              </Card.Title>
                              <Card.Title className="rating m-0 justify-content-between align-items-center d-flex">
                                <StartIcon />
                                <span>{item.rating}</span>
                              </Card.Title>
                            </div>
                          </Card.Body>
                        </div>
                      </Link>
                    ))}
                  </Col>
                </Row>
              </>
            )}
            {Homedecoration.length > 0 && CheckValue.homedecoration && (
              <>
                <div class=" mt-5 mb-4 ps-4">
                  <div class="card-header  border-0 d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">Top Deals on Home Decoration</h3>
                  </div>
                </div>
                <Row>
                  <Col className="d-flex  flex-wrap ">
                    {Homedecoration.map((item, index) => (
                      <Link
                        className={"remove-hover"}
                        to={{
                          pathname: "/product_details/" + item.id,
                        }}
                      >
                        <div className="">
                          <div className="prod-img">
                            <Card.Img variant="top" src={item.thumbnail} />
                          </div>
                          <Card.Body className="p-3">
                            <h5 className="product-name">
                              {item.title} ({item.brand})
                            </h5>
                            <Badge bg="secondary mb-2">
                              Discount {item.discountPercentage}%
                            </Badge>
                            <div className="d-flex  justify-content-between align-items-center">
                              <Card.Title className="m-0">
                                ${item.price}
                              </Card.Title>
                              <Card.Title className="rating m-0 justify-content-between align-items-center d-flex">
                                <StartIcon />
                                <span>{item.rating}</span>
                              </Card.Title>
                            </div>
                          </Card.Body>
                        </div>
                      </Link>
                    ))}
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
