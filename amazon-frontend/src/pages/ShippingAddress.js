import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/CartAction';
import CheckoutSteps from '../components/CheckoutSteps'
import "../styles/ShippingAddress.css"

const ShippingAddress = (props) => {

    const userSignin = useSelector( (state) => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector( (state) => state.cart);
    const {shippingAddress} = cart;
    console.log('=== shippingAddress ShippingAddress.js [13] ===', Object.keys(shippingAddress).length===0 );
    
    if(!userInfo) {
        props.history.push('/signin');
    }
    // grab the revious shipping address or initialize it
    const [fullName, setFullName] = useState([shippingAddress.fullName, ""].filter(arg => arg !== undefined)[0]);
    const [address, setAddress] = useState([shippingAddress.address, ""].filter(arg => arg !== undefined)[0]);
    const [city, setCity] = useState([shippingAddress.city, ""].filter(arg => arg !== undefined)[0]);
    const [postalcode, setPostalCode] = useState([shippingAddress.postalcode, 0].filter(arg => arg !== undefined)[0]);
    const [country, setCountry] = useState([shippingAddress.country, ""].filter(arg => arg !== undefined)[0]);


    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();

        dispatch(saveShippingAddress({
            fullName,
            address,
            city,
            postalcode,
            country
        }));

        props.history.push('/payment');
    }

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>

            <div className="shipping-form-container">
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <h1>Shipping Address</h1>
                    </div>

                    <div className="form-ip-sec">
                        <label htmlFor="fullName">Full name:</label>
                        <input type="text" id="fullName" placeholder="Enter full name"
                        value={fullName} onChange={(e) => setFullName(e.target.value)}
                        required>
                        </input>
                    </div>

                    <div className="form-ip-sec">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" placeholder="Enter address"
                        value={address} onChange={(e) => setAddress(e.target.value)}
                        required>
                        </input>
                    </div>

                    <div className="form-ip-sec">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" placeholder="Enter city"
                        value={city} onChange={(e) => setCity(e.target.value)}
                        required>
                        </input>
                    </div>

                    <div className="form-ip-sec">
                        <label htmlFor="postalcode">Postal Code:</label>
                        <input type="text" id="postalcode" placeholder="Enter postalcode"
                        value={postalcode} onChange={(e) => setPostalCode(e.target.value)}
                        required>
                        </input>
                    </div>

                    <div className="form-ip-sec">
                        <label htmlFor="country">Country:</label>
                        <input type="text" id="country" placeholder="Enter country"
                        value={country} onChange={(e) => setCountry(e.target.value)}
                        required>
                        </input>
                    </div>

                    <div>
                        <label/>
                        <button type="submit" className="continue-btn">
                            Continue
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ShippingAddress
