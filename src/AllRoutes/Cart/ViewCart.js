import React from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../Images/DeleteIcon";
import {
  decreasecartdataslice,
  increasecartdataslice,
  removeallcartdataslice,
  removecartdataslice,
} from "../../ReduxToolkit/CartSlice";

const ViewCart = () => {
  const CartData = useSelector((state) => state.cartslicedata.CartDataSlice);
  let navigate = useNavigate();
  let dispatch = new useDispatch();
  let Price = 0;
  let DiscountPrice = 0;
  let cartCount = 0;
  if (CartData?.length > 0) {
    CartData?.forEach((element) => {
      Price = Price + parseInt(element.price) * element.qty;
      DiscountPrice = DiscountPrice + element.discountPercentage * element.qty;
      cartCount = cartCount + element.qty;
    });
  }
  function fnPlus(item) {
    dispatch(increasecartdataslice(item));
  }
  function fnMinus(item) {
    dispatch(decreasecartdataslice(item));
  }
  function fnRemoveCart(item) {
    dispatch(removecartdataslice(item));
  }
  function fnRemoveALLCart(item) {
    dispatch(removeallcartdataslice(item));
  }

  return (
    <>
      <Container>
        {CartData?.length === 0 ? (
          <div className="text-center my-5 mt-custom">
            <h5 className="m-0">Cart is Empty</h5>
          </div>
        ) : (
          <>
            <div class="  my-4">
              <div class="card-header  border-0 d-flex justify-content-between align-items-center">
                <h3 class="0">Cart Details</h3>
              </div>
            </div>
            <Row>
              <Col md="8">
                <div className="view-cart-cards p-3">
                  {CartData?.length > 0 && (
                    <div className="text-end">
                      <Button
                        style={{ width: "180px" }}
                        onClick={(e) => fnRemoveALLCart(CartData)}
                        variant="danger mt-3 mb-3"
                      >
                        REMOVE ALL
                      </Button>
                    </div>
                  )}
                  {CartData.length > 0 &&
                    CartData.map((item, index) => (
                      <div className="cart-items">
                        <div className="cart-img">
                          <Card.Img variant="top" src={item.thumbnail} />
                        </div>
                        <Card.Body className="d-flex  p-3 justify-content-between align-items-center">
                          <div className="cart-short">
                            <h4 className="mb-3">{item.title}</h4>
                            <div className="d-flex mb-2 align-items-center">
                              <Card.Title>${item.price}</Card.Title>
                              <Badge className="ms-2" bg="secondary">
                                Discount {item.discountPercentage}%
                              </Badge>
                            </div>
                            <Button
                              onClick={(e) => fnRemoveCart(item)}
                              variant="danger mt-3"
                            >
                              REMOVE
                            </Button>
                          </div>
                          <div className="add-remove">
                            {item.qty === 1 ? (
                              <DeleteIcon onClick={(e) => fnRemoveCart(item)} />
                            ) : (
                              <Button
                                onClick={(e) => fnMinus(item)}
                                variant="btn btn-btn btn_get btn_get_two"
                              >
                                -
                              </Button>
                            )}
                            <input type="number" value={item.qty} />
                            <Button
                              onClick={(e) => fnPlus(item)}
                              variant="btn btn-btn btn_get btn_get_two"
                            >
                              +
                            </Button>
                          </div>
                        </Card.Body>
                      </div>
                    ))}
                  {CartData?.length > 0 && (
                    <div className="text-end">
                      <Button
                        style={{ width: "180px" }}
                        onClick={(e) => navigate("/checkout")}
                        variant="btn btn-btn btn_get btn_get_two mt-3 mb-3"
                      >
                        PLACE ORDER
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
              <Col md="4">
                <div className="view-cart-cards ">
                  <h4 className="p-3 m-0 pb-0">PRICE DETAILS</h4>
                  <hr />
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between">
                      <Card.Text>Price({cartCount} items) :</Card.Text>
                      <Card.Title>${Price}</Card.Title>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Card.Text>Discount :</Card.Text>
                      <h6>{DiscountPrice.toFixed(2)}%</h6>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Text>Total Amount :</Card.Text>
                      <Card.Title>${Price}</Card.Title>
                    </div>
                    <hr />
                    <h6 className="text-center" style={{ color: "green" }}>
                      You will save $
                      {((DiscountPrice * Price) / 100).toFixed(2)} on this order
                    </h6>
                  </Card.Body>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default ViewCart;
