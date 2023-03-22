import React, { Fragment, useState, useEffect } from "react";
import { detailsProduct } from "../actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";


const FileForm = (props) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const dispatch = useDispatch();
  // const productID = props.match.params.id;
  // useEffect(() => {
  //   dispatch(detailsProduct(productID));
  // }, [dispatch, productID]);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const onSubmit = (e) => {
    e.preventDefault();
    if (file !== "" && file !== undefined) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append(
        "alt",
        `Book cover o`
      );
      // updateBook(
      //   formData,
      //   setUploadPercentage,
      //   `${endpoint}/bookimages/${book.pictureid}/update/`,
      //   history,
      //   book
      // );
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit} encType="multipart/form-data">
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
      </form>
    </Fragment>
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
export default FileForm;
