import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Rating from "../components/Rating";
import "../styles/ProductPage.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct, updateArticle } from "../actions/ProductActions";

const UpdateProductPage = (props) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const dispatch = useDispatch();
  const productID = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productID));
  }, [dispatch, productID]);


  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  // console.log(product);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData={name, price, stock, description}

    dispatch(updateArticle(
      formData,
      setUploadPercentage,
      `${process.env.REACT_APP_BACKEND_URL}/api/products/update/${productID}`)
    );
    console.log(`${process.env.REACT_APP_BACKEND_URL}/api/products/update/${productID}`)
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState("");
  useEffect(() => {
    if(product && product.name){
      setName(product.name)
      setPrice(product.price)
      setStock(product.stock)
      setDescription(product.description)
    }
  }, [product]);

  return (
    <>
      <button>
        <Link to={`/product/${productID}`} className="back-res">
          Cancel
        </Link>
      </button>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="prod-upd-container">
          <form className="form" onSubmit={onSubmit}>
            <h1>Article Update Page</h1>

            <div className="form-ip-sec">
              <label htmlFor="name">Product name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name||""}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div className="form-ip-sec">
              <label htmlFor="email">Unit price:</label>
              <input
                type="number"
                id="price"
                placeholder="Enter a unit price"
                value={price||0}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>

            <div className="form-ip-sec">
              <label htmlFor="stock">In Stock:</label>
              <input
                type="number"
                id="stock"
                placeholder="Enter available stock"
                value={stock||0}
                onChange={(e) => setStock(e.target.value)}
              ></input>
            </div>

            <div className="form-ip-sec">
              <label htmlFor="description">Set a description:</label>
              <input
                type="text"
                id="description"
                placeholder="Enter description"
                value={description||""}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>

            <div>
              <label />
              <button className="update-btn" type="submit">
                Update Product Detail
              </button>
            </div>
          </form>
        </div>
      )}
      {/* <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="picture"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="picture">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Save"
          className="btn btn-primary btn-block mt-4"
        />
      </form> */}
    </>
  );
};

const Progress = ({ percentage }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default UpdateProductPage;
