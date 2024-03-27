import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import StartIcon from "../../Images/StartIcon";
import { cartdataslice } from "../../ReduxToolkit/CartSlice";
// import { CartData } from "../../Redux/Action";

const ProductDetails = (props) => {
  let dispatch = new useDispatch();
  let navigate = new useNavigate();
  const CartData1 = useSelector((state) => state.cartslicedata.CartDataSlice);
  const [ALLDATA, setALLDATA] = useState([]);
  let param = useParams();
  const [ProductData, setProductData] = useState({});

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProductData(data.products.find((s) => s.id === parseInt(param.id)));
    setALLDATA(data.products);
  };

  function fnAddtoCart(item) {
    item.qty = 1;
    dispatch(cartdataslice(item));
  }
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <div class=" mt-3 my-4">
            <div class="card-header  border-0 d-flex justify-content-between align-items-center">
              <h3 class="0">Product Details</h3>
            </div>
          </div>
        </Row>
        <Row className="product-details">
          <Col md="5">
            <div>
              <Card.Img
                variant="top img-details"
                src={ProductData?.thumbnail}
              />
            </div>
          </Col>
          <Col md="7">
            <div className="prod-details p-4">
              <Card.Body>
                <h5>
                  <b>{ProductData?.title}</b>
                </h5>
                <Card.Title className="rating m-0">
                  <StartIcon />
                  <span>{ProductData.rating}</span>
                </Card.Title>
                <div className="mb-3">
                  <div className="">
                    <Card.Title className="mt-3">Price </Card.Title>
                    <h3>
                      <b> ${ProductData?.price}</b>
                    </h3>
                    <Badge className="mb-3" bg="secondary">
                      Discount {ProductData.discountPercentage}%
                    </Badge>
                    <p>{ProductData.description}</p>
                  </div>
                </div>

                {CartData1?.filter(
                  (x) => parseInt(x?.id) === parseInt(param.id)
                )?.length > 0 ? (
                  <Button onClick={()=>navigate('/viewcart')} variant="btn btn_get btn_get_two">
                    Go To Cart
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      fnAddtoCart(ProductData);
                    }}
                    variant="btn btn_get btn_get_two"
                  >
                    Add To Cart
                  </Button>
                )}
              </Card.Body>
            </div>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col>
          <div>
            <div class=" mt-5 my-3">
              <div class="card-header  border-0 d-flex justify-content-between align-items-center">
                <h3 class="ps-3">All Product</h3>
              </div>
            </div>
            <Row>
              <Col className="d-flex  flex-wrap ">
                <Slider className="productdetails-slider" {...settings}>
                  {ALLDATA?.length > 0 &&
                    ALLDATA.map((item, index) => (
                      <div className={"remove-hover"}>
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
                      </div>
                    ))}
                </Slider>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
