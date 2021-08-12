import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addProduct,
  fetchCategories,
  fetchCatsSubCats,
} from "../actions/ProductsAction";
import { Button, Form, Segment, Input, Label } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

let formData = new FormData();

class AddProduct extends Component {
  state = {
    productTitleValue: "",
    productUnitPrice: null,
    productDescription: "",
    productsCatID: null,
    productSubCatID: null,
    productImages: [],
    productOptionsCat: [],
    productOptionsSubCat: [],
  };

  fileArr = [];

  componentDidMount() {
    this.props.fetchCategories();
  }

  onProductTitleChange = (e, { value }) => {
    this.setState({ productTitleValue: value });
  };

  onProductUnitPriceChange = (e, { value }) => {
    this.setState({ productUnitPrice: value });
  };

  onProductDescriptionChange = (e, { value }) => {
    this.setState({ productDescription: value });
  };

  onProductsCatIDChange = async (e, { value }) => {
    console.log(e);
    await this.setState({ productsCatID: value });

    console.log(this.state.productsCatID);

    // await api()
    //   .get(`/sub-categories-cat/${this.state.productsCatID}`)
    //   .then((res) => {
    //     res.data.map((subCat) =>
    //       this.state.productOptionsSubCat.push({
    //         id: subCat.id,
    //         text: subCat.title,
    //         value: subCat.id,
    //       })
    //     );
    //   });

    await this.props.fetchCatsSubCats(this.state.productsCatID);
  };

  onProductsSubCatIDChange = async (e, { value }) => {
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
    await formData.set("title", this.state.productTitleValue);
    await formData.set("unitPrice", this.state.productUnitPrice);
    await formData.set("description", this.state.productDescription);
    await formData.set("cat_id", this.state.productsCatID);
    await formData.set("subCat_id", this.state.productSubCatID);
    await this.fileArr.map((file) => formData.append("images", file));

    console.log("State:", this.state);

    event.preventDefault();

    await this.props.addProduct(formData);

    await formData.set("images", null);
  };

  render() {
    const { productSpinnerValue, redirectUrlValue, catSubCategoriesValues } =
      this.props;

    if (redirectUrlValue) {
      return <Redirect to={redirectUrlValue} />;
    }

    if (catSubCategoriesValues) {
      this.props.catSubCategoriesValues.map((subCat) =>
        this.state.productOptionsSubCat.push({
          id: subCat.id,
          text: subCat.title,
          value: subCat.id,
        })
      );
    }
    
    this.props.categoriesValues.map((cat) =>
      this.state.productOptionsCat.push({
        id: cat.id,
        text: cat.title,
        value: cat.id,
      })
    );

    return (
      <div
        style={{ marginTop: "1.5em", marginLeft: "1.5em", marginRight: "10em" }}
      >
        <Segment raised>
          <Form loading={productSpinnerValue}>
            <Form.Field
              label="Title"
              placeholder="Title"
              onChange={this.onProductTitleChange}
              control={Input}
            ></Form.Field>
            <Form.Field>
              <label>Unit Price</label>
              <Input
                labelPosition="right"
                type="text"
                placeholder="Unit Price"
                onChange={this.onProductUnitPriceChange}
              >
                <input />
                <Label>₺</Label>
              </Input>
            </Form.Field>
            <Form.Field
              label="Description"
              placeholder="Description"
              onChange={this.onProductDescriptionChange}
              control={Input}
            ></Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                name="cat_id"
                label="Category"
                options={this.state.productOptionsCat}
                placeholder="Category"
                onChange={this.onProductsCatIDChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                name="subCat_id"
                label="SubCategory"
                options={this.state.productOptionsSubCat}
                placeholder="SubCategory"
                onChange={this.onProductsSubCatIDChange}
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
  const {
    productSpinnerValue,
    redirectUrlValue,
    categoriesValues,
    catSubCategoriesValues,
  } = state.ProductsReducer;

  return {
    productSpinnerValue,
    redirectUrlValue,
    categoriesValues,
    catSubCategoriesValues,
  };
};

export default connect(mapStateToProps, {
  addProduct,
  fetchCategories,
  fetchCatsSubCats,
})(AddProduct);
