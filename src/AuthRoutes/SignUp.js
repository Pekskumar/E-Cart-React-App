import moment from "moment";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userdataslice } from "../ReduxToolkit/UserSlice";
import { commonservices } from "../Services/CommonServices";

const SignUp = (props) => {
  let Userdata = useSelector((state) => state.userslicedata.userdata);
  let dispatch = useDispatch();
  const [SelectedUserRole, setSelectedUserRole] = useState();
  const [DateOfBirth, setDateOfBirth] = useState(new Date());
  const [GenderValidation, setGenderValidation] = useState(false);
  const [DOBValidation, setDOBValidation] = useState(false);
  const [UserRoleValidation, setUserRoleValidation] = useState(false);

  const [input, setInput] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    password: "",
    mobile: "",
    userRole: "",
    date_of_birth: "",
    errors: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      password: "",
      mobile: "",
      userRole: "",
      date_of_birth: "",
      ValidationRules: [
        {
          FieldName: "firstName",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "lastName",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "email",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "password",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "mobile",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
      ],
    },
  });

  const handleDateOfBirth = (date) => {
    setDateOfBirth(new Date(date));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.gender !== "") {
      setGenderValidation(false);
    } else {
      setGenderValidation(true);
    }

    if (SelectedUserRole !== undefined && SelectedUserRole !== "") {
      setUserRoleValidation(false);
    } else {
      setUserRoleValidation(true);
    }

    if (DateOfBirth !== undefined && DateOfBirth !== "") {
      setDOBValidation(false);
    } else {
      setDOBValidation(true);
    }

    let obj = commonservices.fnCheckValidationOfObject(input);
    setInput({
      ...obj.obj,
    });
    if (obj.isValid) {
      let body = {
        id: commonservices.createGuid(),
        email: input.email.trim(),
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        gender: input.gender,
        password: input.password.trim(),
        mobile: input.mobile.trim(),
        createdOn: moment().format(),
        date_of_birth: moment(DateOfBirth).format(),
      };
      dispatch(userdataslice(body));
      props.setKEY(1);
      localStorage.setItem("Token", commonservices.createGuid());
      // let UserInfo = "";
      // if (Userdata !== null) {
      //   UserInfo = [...Userdata, body];

      //   localStorage.setItem("New_Users", JSON.stringify(UserInfo));
      //   dispatch(userdataslice(UserInfo));

      //   props.bindlist(UserInfo);
      // } else {
      //   UserInfo = [body];
      //   // localStorage.setItem("New_Users", JSON.stringify(UserInfo));
      //   dispatch(userdataslice(UserInfo));
      //   props.bindlist(UserInfo);
      // }
      toast.success("Succesfully Created New User Account!");
      setInput({
        ...input,
        ["id"]: "",
        ["email"]: "",
        ["firstName"]: "",
        ["lastName"]: "",
        ["gender"]: "",
        ["password"]: "",
        ["mobile"]: "",
      });
    } else {
      toast.error("Something went Wrong !!!");
    }
  };

  // const fetchUserData = async () => {
  //   const res = await fetch("http://localhost:3005/276_Users");
  //   const data = await res.json();
  //   setUserdata(data);
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  return (
    <div className="">
      <div className="">
        <div className="body-form mt-2">
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Control
              type="hidden"
              value={input.id}
              placeholder="Enter email"
            />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={input.firstName}
                onChange={(e) =>
                  setInput({
                    ...input,
                    ["firstName"]: e.target.value,
                  })
                }
                placeholder="Enter firstName"
                isInvalid={input.errors.firstName}
              />
              {input.errors.firstName && (
                <Form.Control.Feedback type="invalid">
                  {input.errors.firstName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={input.lastName}
                onChange={(e) =>
                  setInput({
                    ...input,
                    ["lastName"]: e.target.value,
                  })
                }
                placeholder="Enter lastName"
                isInvalid={input.errors.lastName}
              />
              {input.errors.lastName && (
                <Form.Control.Feedback type="invalid">
                  {input.errors.lastName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type="text"
                value={input.mobile}
                onChange={(e) =>
                  setInput({
                    ...input,
                    ["mobile"]: e.target.value,
                  })
                }
                placeholder="Enter mobile"
                isInvalid={input.errors.mobile}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              {input.errors.mobile && (
                <Form.Control.Feedback type="invalid">
                  {input.errors.mobile}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <p>Date Of Birth</p>
              <div className="is-invalid">
                <DatePicker
                  className=""
                  value={DateOfBirth}
                  onChange={handleDateOfBirth}
                  format="DD-MM-YYYY"
                  maxDate={new Date()}
                />
              </div>
              {DOBValidation ? (
                <div class="invalid-feedback">
                  Please select your Date of Birth
                </div>
              ) : (
                <></>
              )}
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Role</Form.Label>
              <Select
                isSearchable={false}
                onChange={handleUser}
                options={UserroleList}
                classNamePrefix="select"
                placeholder="User Role..."
                className="react-select is-invalid"
                styles={{
                  menu: (base) => ({
                    color: "#333",
                    ...base,
                  }),
                }}
              />
              {UserRoleValidation ? (
                <div class="invalid-feedback">Please select your User Role</div>
              ) : (
                <></>
              )}
            </Form.Group> */}
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
            {/* <div>
              <Form.Label>Gender</Form.Label>
            </div>
            <input
              className="mb-3"
              type="radio"
              id="Male"
              name="fav_language"
              value="Male"
              onChange={handleGender}
              isInvalid={input.errors.gender}
            />
              <label for="Male">Male</label> {" "}
            <input
              type="radio"
              id="FeMale"
              name="fav_language"
              value="FeMale"
              onChange={handleGender}
              isInvalid={input.errors.gender}
            />
             {" "}
            <label class="is-invalid" for="FeMale">
              FeMale
            </label>
            {GenderValidation ? (
              <div class="invalid-feedback">Please select your Gender</div>
            ) : (
              <></>
            )} */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
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
            <div className="text-end">
            <Button variant="btn btn_get btn_get_two " type="submit">
              Sign Up & Login
            </Button>
            </div>
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

export default SignUp;
