import React, { useEffect } from "react";
import banner from "../assets/images/banner.jpg";
import extra from "../assets/images/extra.jpg";
import gt from "../assets/images/gt.jpg";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
export var email = "";
function Home() {
  // Home component

  const addressFromik = useFormik({
    initialValues: {
      country: null,
      state: null,
      college: null,
    },
    onSubmit: (values) => console.log(JSON.stringify(values)),
  }); // Formik for the address form

  const countries = Country.getAllCountries(); // Get all countries

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  })); // Update the countries to be used in the select component

  const updatedStates = (countryId) =>
    State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.id,
      ...state,
    })); // Get all states of a country

  var { values, handleSubmit, setFieldValue, setValues } = addressFromik; // Get the values from the formik
  const college = [{ label: "Georgia Tech", value: "Georgia Tech" }]; // College options (Currently only Georgia Tech)
  useEffect(() => {}, [values]); // Use effect to update the values when they change

  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src={banner}
              alt="banner"
            />
          </div>
          <div className="col-lg-5">
            <h3>
              <marquee>
                <img src={extra} width="50px" height="50px" alt="extra" />
                <i>
                  <b> Join all class groups now! </b>
                </i>
                <img src={extra} width="50px" height="50px" alt="extraright" />
              </marquee>
            </h3>

            <h1 className="font-weight-light">Select your college</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <label>
                  <p>Enter your email id</p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example123@gmail.com"
                    onChange={(e) => {
                      email = e.target.value;
                    }}
                  />
                </label>
                <br />
              </fieldset>
              <fieldset>
                <label className="country" id="country">
                  <p>Choose your country</p>
                  <Select
                    id="country"
                    name="country"
                    label="country"
                    options={updatedCountries}
                    value={values.country}
                    onChange={(value) => {
                      setValues(
                        { country: value, state: null, college: null },
                        false
                      );
                    }}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label id="state">
                  <p>Choose your state</p>
                  <Select
                    id="state"
                    name="state"
                    options={updatedStates(
                      values.country ? values.country.isoCode : null
                    )}
                    value={values.state}
                    onChange={(value) => {
                      setValues(
                        {
                          country: values.country,
                          state: value,
                          college: null,
                        },
                        false
                      );
                    }}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label id="college">
                  <p>Choose your college</p>

                  <Select
                    id="college"
                    name="college"
                    options={college}
                    value={values.college}
                    onChange={(value) => {
                      setValues(
                        {
                          country: values.country,
                          state: values.state,
                          college: value,
                        },
                        false
                      );
                    }}
                  />
                </label>
              </fieldset>
              <fieldset>
                <label>
                  <p>Recent selection:</p>
                  <NavLink
                    className="connect"
                    to="/Enter"
                    onClick={(e) => {
                      if (email === "") {
                        e.preventDefault();
                        alert("Please enter your email id");
                      }
                    }}
                  >
                    <img src={gt} alt="gt" width="100px" height="100px" />
                  </NavLink>
                </label>
              </fieldset>
              <br></br>
              <NavLink
                className="connect"
                to="/Enter"
                onClick={(e) => {
                  if (
                    values.country == null ||
                    values.state == null ||
                    values.college == null ||
                    email === ""
                  ) {
                    e.preventDefault();
                    alert("Please select all the fields");
                  } else if (
                    !email
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      )
                  ) {
                    e.preventDefault();
                    alert("Please enter a valid email id");
                  }
                }}
              >
                <button type="submit" className="btn btn-primary" id="submit">
                  Submit
                </button>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
