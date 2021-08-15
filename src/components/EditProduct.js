import React, { Component } from "react";
import { connect } from "react-redux";
import {
  editProduct,
  fetchCategories,
  fetchCatsSubCats,
} from "../actions/ProductsAction";
import { Button, Form, Segment, Input, Label } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

let formData = new FormData();

class EditProduct extends Component {
  state = {
    productTitle: this.props.location.title,
    productUnitPrice: this.props.location.unitPrice,
    productDescription: this.props.location.description,
    productCatID: this.props.location.cat_id,
    productSubCatID: this.props.location.subCat_id,
  };

  fileArr = [];

  componentDidMount() {
    // api()
    //   .get("/categories")
    //   .then((res) => {
    //     res.data.map((cat) =>
    //       this.state.optionsCat.push({
    //         id: cat.id,
    //         text: cat.title,
    //         value: cat.id,
    //       })
    //     );
    //   });
    this.props.fetchCategories();
  }

  onProductTitleChange = (e, { value }) => {
    this.setState({ productTitle: value });
  };

  onProductUnitPriceChange = (e, { value }) => {
    this.setState({ productUnitPrice: value });
  };

  onProductDescriptionChange = (e, { value }) => {
    this.setState({ productDescription: value });
  };

  onProductCatIDChange = async (e, { value }) => {
    console.log(e);
    await this.setState({ productCatID: value });

    console.log(this.state.productCatID);

    // await api()
    //   .get(`/sub-categories-cat/${this.state.productCatID}`)
    //   .then((res) => {
    //     res.data.map((subCat) =>
    //       this.state.optionsSubCat.push({
    //         id: subCat.id,
    //         text: subCat.title,
    //         value: subCat.id,
    //       })
    //     );
    //   });

    this.props.fetchCatsSubCats(this.state.productCatID);
  };

  onProductSubCatIDChange = async (e, { value }) => {
    console.log(e);
    await this.setState({ productSubCatID: value });
    await console.log(this.state.productSubCatID);
  };

  handleProductImages = async (e) => {
    if (e.target && e.target.files) {
      this.fileArr = [...e.target.files];
      console.log("File Array:", this.fileArr);
    }
  };

  onProductFormSubmit = async (event) => {
    await formData.set("title", this.state.productTitle);
    await formData.set("unitPrice", this.state.productUnitPrice);
    await formData.set("description", this.state.productDescription);
    await formData.set("cat_id", this.state.productCatID);
    await formData.set("subCat_id", this.state.productSubCatID);
    await this.fileArr.map((file) => formData.append("images", file));

    console.log("State:", this.state);

    event.preventDefault();
    // await api()
    //   .put(`/products/${this.props.match.params.id}`, formData, {
    //     headers: { "content-type": "multipart/form-data" },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    await this.props.editProduct(this.props.match.params.id, formData);

    await formData.set("images", null);
  };

  render() {
    const { productSpinnerValue, redirectUrlValue } = this.props;

    if (redirectUrlValue) {
      return <Redirect to={redirectUrlValue} />;
    }
    return (
      <div
        style={{ marginTop: "1.5em", marginLeft: "1.5em", marginRight: "10em" }}
      >
        <Segment raised>
          <Form loading={productSpinnerValue}>
            <Form.Field>
              <label>Title</label>
              <Input
                placeholder={this.props.location.title}
                name="title"
                onChange={this.onProductTitleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Unit Price</label>
              <Input
                labelPosition="right"
                type="text"
                placeholder={this.props.location.unitPrice}
                onChange={this.onProductUnitPriceChange}
              >
                <input />
                <Label>₺</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <Input
                placeholder={this.props.location.description}
                name="description"
                onChange={this.onProductDescriptionChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                name="cat_id"
                label="Category"
                options={this.props.productOptionsCat}
                placeholder="Category"
                onChange={this.onProductCatIDChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                name="subCat_id"
                label="SubCategory"
                options={this.props.productOptionsSubCat}
                placeholder="SubCategory"
                onChange={this.onProductSubCatIDChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Images</label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={this.handleProductImages}
              />
            </Form.Field>
            <Button type="submit" onClick={this.onProductFormSubmit}>
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  var _ = require("lodash");
  const {
    productSpinnerValue,
    redirectUrlValue,
    categoriesValues,
    catSubCategoriesValues,
  } = state.ProductsReducer;

  let productOptionsCat = _.map(
    state.ProductsReducer.categoriesValues,
    (val) => ({
      id: val.id,
      text: val.title,
      value: val.id,
    })
  );

  let productOptionsSubCat = _.map(
    state.ProductsReducer.catSubCategoriesValues,
    (val) => ({
      id: val.id,
      text: val.title,
      value: val.id,
    })
  );

  return {
    productSpinnerValue,
    redirectUrlValue,
    categoriesValues,
    catSubCategoriesValues,
    productOptionsCat,
    productOptionsSubCat,
  };
};

export default connect(mapStateToProps, {
  editProduct,
  fetchCategories,
  fetchCatsSubCats,
})(EditProduct);
