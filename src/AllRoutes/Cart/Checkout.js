import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SignUp from "../../AuthRoutes/SignUp";
import StripeModal from "../../Modal/StripeModal";
import { commonservices } from "../../Services/CommonServices";
import { userdataslice } from "../../ReduxToolkit/UserSlice";

const Checkout = () => {
  let dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const CartData = useSelector((state) => state.cartslicedata.CartDataSlice);
  let UserInfo = useSelector((state) => state.userslicedata.userdata);  
  const UserInfoMain = JSON.parse(localStorage.getItem("New_Users"));
  const [UserInfoMain1, setUserInfoMain1] = useState(UserInfoMain);

  const [StripeModalShow, setStripeModalShow] = useState(false);
  const [Address, setAddress] = useState({});
  // let UserInfo = commonservices.getLoginUserData();
  const address = useRef();

  address.current = UserInfo?.Address_Array?.[0];

  const [input, setInput] = useState({
    address: "",
    pincode: "",
    errors: {
      address: "",
      pincode: "",
      ValidationRules: [
        {
          FieldName: "address",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "pincode",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
      ],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = commonservices.fnCheckValidationOfObject(input);
    setInput({
      ...obj.obj,
    });
    if (obj.isValid) {
      let myObj = {
        id: commonservices.createGuid(),
        address: input.address,
        pincode: input.pincode,
      };
      if (!UserInfo?.Address_Array) {
        setAddress(myObj);
      }
      let UserInfo1 = {
        ...UserInfo,
        Address_Array: UserInfo?.Address_Array
          ? [...UserInfo.Address_Array, myObj]
          : [myObj],
      };
      dispatch(userdataslice(UserInfo1));
      // commonservices.setItem("Userdata", JSON.stringify(UserInfo1));

      toast.success("Succesfully Added New Address !");
      setInput({
        ...input,
        ["address"]: "",
        ["pincode"]: "",
      });
    } else {
      toast.error("Please add address !");
    }
  };

  const [ShowHide, setShowHide] = useState(false);
  const [KEY, setKEY] = useState(0);

  useEffect(() => {
    if (token !== "" && token !== null && token !== undefined) {
      setKEY(1);
    }
  }, [token, UserInfo]);

  useEffect(() => {
    if (
      address.current !== "" &&
      address.current !== null &&
      address.current !== undefined
    ) {
      setAddress(address.current);
      // setKEY(2);
    }
  }, [UserInfoMain1]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  let Price = 0;
  let DiscountPrice = 0;
  let cartCount = 0;
  if (CartData?.length > 0) {
    CartData?.forEach((element) => {
      Price = Price + parseInt(element?.price) * element?.qty;
      DiscountPrice = DiscountPrice + element?.discountPercentage * element?.qty;
      cartCount = cartCount + element?.qty;
    });
  }

  function fnOrder() {
    setKEY(2);
  }
  function fnOrder3(item) {
    setStripeModalShow(true);
    // dispatch(RemoveAll(item));
    setKEY(3);
  }

  return (
    <Container fluid>
      <div className="mt-5">
        <Row>
          <Col md="7">
            <Accordion defaultActiveKey="0" activeKey={`${KEY}`}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Login or Signup #1</Accordion.Header>
                <Accordion.Body>
                  <SignUp bindlist={setUserInfoMain1} setKEY={setKEY} />
                  {/* {FormSignINUP ? (
                    <SignUp bindlist={setUserInfoMain1} />
                  ) : (
                    <SignIn setKEY={setKEY} />
                  )} */}
                  {/* <div className="d-flex justify-content-between mt-4">
                    <Button
                      className="btn btn-btn btn-btn btn_get btn_get_two primary "
                      onClick={(e) => setFormSignINUP(true)}
                    >
                      Don't have account ?
                    </Button>
                    <Button
                      className="btn btn-btn btn-btn btn_get btn_get_two primary"
                      onClick={(e) => setFormSignINUP(false)}
                    >
                      Already have account ?
                    </Button>
                  </div> */}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Delivery Address #2</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col md="8">
                      <Button
                        className="btn mb-3 btn-btn btn-btn btn_get btn_get_two primary"
                        onClick={() => {
                          setShowHide(!ShowHide);
                        }}
                      >
                        Add New Address
                      </Button>
                    </Col>
                    {ShowHide ? (
                      <>
                        <Col md="12">
                          {/* <h4 className="p-2">ADD ADDRESS </h4> */}
                          <Form
                            onSubmit={(e) => {
                              handleSubmit(e);
                            }}
                          >
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Address"
                              className="mb-3"
                            >
                              <Form.Control
                                type="text"
                                value={input.address}
                                onChange={(e) =>
                                  setInput({
                                    ...input,
                                    ["address"]: e.target.value,
                                  })
                                }
                                isInvalid={input.errors.address}
                                placeholder="Address"
                              />
                              {input.errors.address && (
                                <Form.Control.Feedback type="invalid">
                                  {input.errors.address}
                                </Form.Control.Feedback>
                              )}
                            </FloatingLabel>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Pincode"
                              className="mb-3"
                            >
                              <Form.Control
                                type="text"
                                value={input.pincode}
                                onChange={(e) =>
                                  setInput({
                                    ...input,
                                    ["pincode"]: e.target.value,
                                  })
                                }
                                isInvalid={input.errors.pincode}
                                placeholder="Pincode"
                              />
                              {input.errors.pincode && (
                                <Form.Control.Feedback type="invalid">
                                  {input.errors.pincode}
                                </Form.Control.Feedback>
                              )}
                            </FloatingLabel>
                            <div className="text-end">
                              <Button
                                // onClick={(e) => fnMinus(item)}
                                variant="btn btn-btn btn-btn btn_get btn_get_two primary"
                                type="submit"
                              >
                                SAVE
                              </Button>
                            </div>
                          </Form>
                        </Col>
                      </>
                    ) : (
                      <></>
                    )}
                  </Row>
                  <Row>
                    {/* <h4 className="p-2">ADDRESS </h4> */}
                    <div className="d-flex mb-4">
                      <Table
                        striped
                        bordered
                        hover
                        size="sm"
                        className="m-0 mt-3"
                      >
                        <thead>
                          <tr>
                            <th style={{ width: "80px" }}></th>
                            <th>Address</th>
                            <th>Pincode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {UserInfo &&
                            UserInfo?.Address_Array?.length > 0 &&
                            UserInfo.Address_Array.map((item, index) => (
                              <tr key={index}>
                                <td className="text-center">
                                  <Form.Check
                                    type="radio"
                                    id={index}
                                    name="radio"
                                    aria-label={index}
                                    defaultChecked={index === 0 ? true : false}
                                    onChange={(e) => {
                                      address.current = item;
                                      setAddress(item);
                                    }}
                                  />
                                </td>
                                <td>{item.address}</td>
                                <td>{item.pincode}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                    {UserInfo && UserInfo?.Address_Array?.length > 0 && (
                      <div className="text-end">
                        <Button
                          onClick={(e) => fnOrder()}
                          variant="btn btn-btn btn-btn btn_get btn_get_two primary"
                          type="submit"
                        >
                          SAVE & CONTINUE
                        </Button>
                      </div>
                    )}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Order Summary #3</Accordion.Header>
                <Accordion.Body>
                  <div>
                    Deliver to :
                    <p className="m-0">
                      <b>
                        {UserInfo?.firstName} {UserInfo?.lastName}
                      </b>
                    </p>
                    <p className="m-0">{Address.address}</p>
                    <p className="m-0">
                      Phone : <b>{UserInfo?.mobile}</b>
                    </p>
                    <p>
                      Pincode : <b>{Address.pincode}</b>
                    </p>
                  </div>
                  <div>
                    <Row>
                      <Col>
                        <div className="view-cart-cards p-3">
                          <div className="text-end">
                            {/* <Button
                              style={{ width: "180px" }}
                              onClick={(e) => fnRemoveALLCart(CartData)}
                              variant="danger mt-3 mb-3"
                            >
                              REMOVE ALL
                            </Button> */}
                          </div>
                          {CartData?.length > 0 &&
                            CartData?.map((item, index) => (
                              <div className="cart-items">
                                <div className="cart-img">
                                  <Card.Img
                                    variant="top"
                                    src={item?.thumbnail}
                                  />
                                </div>
                                <Card.Body className="d-flex  p-3 justify-content-between align-items-center">
                                  <div className="cart-short">
                                    <h4 className="mb-3">{item?.title}</h4>
                                    <div className="d-flex mb-2 align-items-center">
                                      <Card.Title>${item?.price}</Card.Title>
                                      <Badge className="ms-2" bg="secondary">
                                        Discount {item?.discountPercentage}%
                                      </Badge>
                                    </div>
                                    <h6 className="mb-3">Quantity : {item?.qty}</h6>
                                    {/* <Button
                                      onClick={(e) => fnRemoveCart(item)}
                                      variant="danger mt-3"
                                    >
                                      REMOVE
                                    </Button> */}
                                  </div>
                                  {/* <div className="add-remove">
                                    {item.qty === 1 ? (
                                      <DeleteIcon
                                        onClick={(e) => fnRemoveCart(item)}
                                      />
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
                                  </div> */}
                                </Card.Body>
                              </div>
                            ))}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Col className="mt-4">
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
                          <h6
                            className="text-center"
                            style={{ color: "green" }}
                          >
                            You will save $
                            {((DiscountPrice * Price) / 100).toFixed(2)} on this
                            order
                          </h6>
                        </Card.Body>
                      </div>
                      <div className="text-end mt-4">
                        <Button
                          onClick={(e) => fnOrder3(CartData)}
                          variant="btn btn-btn btn-btn btn_get btn_get_two primary"
                          type="submit"
                        >
                          CONTINUE to PAYMENT
                        </Button>
                      </div>
                    </Col>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col md="5">
            <b>
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </b>
            <div className="mt-3">
              {UserInfoMain1?.map((uitem, uindex) => (
                <div key={uindex}>
                  <h5>
                    <Badge bg="success">User {uindex + 1}</Badge>
                  </h5>
                  <div>
                    <h6>User Name : {uitem.email}</h6>
                    <h6>Password : {uitem.password}</h6>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        {/* <Row>
        <Col md="8">
          <Button
            className="primary"
            onClick={() => {
              setShowHide(!ShowHide);
            }}
          >
            Add New Address
          </Button>
        </Col>
        {ShowHide ? (
          <>
            <Col md="8">
              <h4 className="p-2">ADD ADDRESS </h4>
              <Form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={input.address}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        ["address"]: e.target.value,
                      })
                    }
                    isInvalid={input.errors.address}
                    placeholder="Address"
                  />
                  {input.errors.address && (
                    <Form.Control.Feedback type="invalid">
                      {input.errors.address}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Pincode"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={input.pincode}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        ["pincode"]: e.target.value,
                      })
                    }
                    isInvalid={input.errors.pincode}
                    placeholder="Pincode"
                  />
                  {input.errors.pincode && (
                    <Form.Control.Feedback type="invalid">
                      {input.errors.pincode}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
                <div className="text-end">
                  <Button
                    // onClick={(e) => fnMinus(item)}
                    variant="primary"
                    type="submit"
                  >
                    SAVE & CONTINUE
                  </Button>
                </div>
              </Form>
            </Col>
            <Col md="4" className="make-Payments">
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </Col>
          </>
        ) : (
          <></>
        )}
      </Row>
      <Row>
        <h4 className="p-2">ADDRESS </h4>
        <div className="d-flex mb-4">
          <Table striped bordered hover size="sm" className="m-0 ms-3">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>Radio</th>
                <th>Address</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {UserInfo &&
                UserInfo?.Address_Array?.length > 0 &&
                UserInfo.Address_Array.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <Form.Check
                        type="radio"
                        id={index}
                        name="radio"
                        aria-label={index}
                      />
                    </td>
                    <td>{item.address}</td>
                    <td>{item.pincode}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Row> */}
      </div>
      {StripeModalShow && (
        <StripeModal
          show={StripeModalShow}
          onHide={() => setStripeModalShow(false)}
        />
      )}
    </Container>
  );
};

export default Checkout;
