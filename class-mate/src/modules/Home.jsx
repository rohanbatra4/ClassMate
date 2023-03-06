import React, { useEffect } from "react";
import banner from "../assets/images/banner.jpg";
import extra from '../assets/images/extra.jpg'
import gt from '../assets/images/gt.jpg'
import Select from "react-select";
import {Country, State} from 'country-state-city';
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";


function Home() {
    const addressFromik = useFormik({
        initialValues: {
          country: null,
          state: null,
          college: null
        },
        onSubmit: (values) => console.log(JSON.stringify(values))});
    
    const countries = Country.getAllCountries();

    const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
    }));
    const updatedStates = (countryId) =>
    State
        .getStatesOfCountry(countryId)
        .map((state) => ({ label: state.name, value: state.id, ...state }));

    var { values, handleSubmit, setFieldValue, setValues } = addressFromik;
    const college = [
        { label: "Georgia Tech", value: "Georgia Tech" },
    ];
    useEffect(() => {}, [values]);

    return (
        <div className="home">
            <div class="container">
                <div class="row align-items-center my-5">
                    <div class="col-lg-7">
                        <img
                            class="img-fluid rounded mb-4 mb-lg-0"
                            src={banner}
                            alt="banner"
                        />
                    </div>
                    <div class="col-lg-5">
                        <h3><marquee><img src={extra} width="50px" height="50px" alt="extra" /><i>
                            <b> Join all class groups now! </b></i><img src={extra} width="50px" height="50px" alt="extraright" /></marquee></h3>

                        <h1 class="font-weight-light">Select your college</h1>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <label>
                                    <p>Choose your country</p>
                                    <Select
                                        id="country"
                                        name="country"
                                        label="country"
                                        options={updatedCountries}
                                        value={values.country}
                                        onChange={(value) => {
                                          setValues({ country: value, state: null, college: null }, false);
                                        }}
                                    />
                                </label>
                                </fieldset>
                                <fieldset>
                                <label>
                                    <p>Choose your state</p>
                                    <Select
                                        id="state"
                                        name="state"
                                        options={updatedStates(values.country ? values.country.isoCode : null)}
                                        value={values.state}
                                        onChange={(value) => {
                                          setValues({country: values.country, state: value, college: null }, false);
                                        }}
                                    />
                                </label>
                                </fieldset>
                            <fieldset>
                                <label>
                                    <p>Choose your college</p>
                                    
                                    <Select
                                        id="college"
                                        name="college"
                                        options={college}
                                        value={values.college}
                                        onChange={(value) => {
                                            setValues({country: values.country, state: values.state, college: value }, false);
                                        }}
                                    />
                                </label>
                            </fieldset>
                            <fieldset>
                                <label>
                                    <p>Recent selection:</p>
                                    <NavLink className="connect" to="/info">
                                    <img
                                        src={gt}
                                        alt="gt"
                                        width = "100px"
                                        height = "100px"
                                    />
                                    </NavLink>
                                </label>
                            </fieldset>
                            <br></br>
                            <NavLink className="connect" to="/info" onClick={
                                (e) => {
                                    if (values.country == null || values.state == null || values.college == null) {
                                        e.preventDefault();
                                        alert("Please select all the fields");
                                    }
                                }
                            }>
                                <button type="submit">Submit</button>
                            </NavLink>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Home;
