import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { commonservices } from "../Services/CommonServices";
import { useDispatch, useSelector } from "react-redux";
import { userdataslice } from "../ReduxToolkit/UserSlice";

const SignIn = ({ setKEY }) => {
  let Userdata = useSelector((state) => state.userslicedata.userdata);
  let dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
      ValidationRules: [
        {
          FieldName: "email",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "email",
          ValidationType: "email",
          ValidationMessage: "Please enter valid email address",
        },
        {
          FieldName: "password",
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
    let body = {
      email: input.email,
      password: input.password,
    };
    let loginUserData = Userdata?.find(
      (x) => x.email === body.email && x.password === body.password
    );
    if (obj.isValid) {
      if (loginUserData) {
        toast.success("You are Succesfully Login !!!");
        localStorage.setItem("Token", commonservices.createGuid());
        dispatch(userdataslice(loginUserData));
        setKEY(1);
      } else {
        toast.error("Email or passowrd is incorrect !!!");
      }
    } else {
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="body-form mt-2">
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address/Mobile No.</Form.Label>
              <Form.Control
                type="text"
                value={input.email}
                onChange={(e) =>
                  setInput({
                    ...input,
                    ["email"]: e.target.value,
                  })
                }
                placeholder="Enter email or mobile no."
                isInvalid={input.errors.email}
              />
              {input.errors.email && (
                <Form.Control.Feedback type="invalid">
                  {input.errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                value={input.password}
                onChange={(e) =>
                  setInput({
                    ...input,
                    ["password"]: e.target.value,
                  })
                }
                placeholder="Enter password"
                isInvalid={input.errors.password}
              />
              {input.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {input.errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button variant="primary btn-bg w mt-3" type="submit">
              Sign In
            </Button>
          </Form>
          <div className="social">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
