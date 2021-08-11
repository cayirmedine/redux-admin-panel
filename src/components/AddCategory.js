import React, { Component } from "react";
import { connect } from "react-redux";
import { addCategory } from "../actions/ProductsAction";
import { Button, Form, Segment, Input } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class AddCategory extends Component {
  state = {
    categoryTitleValue: "",
    categoryImage: null,
  };

  onCategoryTitleChange = (e, { value }) => {
    this.setState({ categoryTitleValue: value });
  };

  handleCategoryImage = (e) => {
    if (e.target && e.target.files[0]) {
      this.setState({ categoryImage: e.target.files[0] });
    }
    console.log(e.target.files[0]);
  };

  onFormSubmit = (event) => {
    let formData = new FormData();
    formData.append("title", this.state.categoryTitleValue);
    formData.append("image", this.state.categoryImage);
    this.props.addCategory(formData);
  };

  render() {
    const {
      productCategoriesSpinnerValue,
      redirectUrlValue,
    } = this.props;
    if (redirectUrlValue) {
      return <Redirect to={redirectUrlValue} />;
    }

    return (
      <div>
        <Segment
          raised
          style={{
            marginTop: "1.5em",
            marginLeft: "1.5em",
            marginRight: "10em",
          }}
        >
          <Form loading={productCategoriesSpinnerValue}>

            <Form.Field
              placeholder="Title"
              id="cat-title"
              label="Title"
              onChange={this.onCategoryTitleChange}
              control={Input}
            ></Form.Field>

            <Form.Field>
              <label>Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={this.handleCategoryImage}
              />
            </Form.Field>

            <Button type="submit" onClick={this.onFormSubmit}>
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
    productCategoriesSpinnerValue,
    redirectUrlValue,
    // productCategoryTitleErrorValue,
    // productCategoryImageErrorValue,
  } = state.ProductsReducer;
  return {
    productCategoriesSpinnerValue,
    redirectUrlValue,
    // productCategoryTitleErrorValue,
    // productCategoryImageErrorValue,
  };
};

export default connect(mapStateToProps, { addCategory })(AddCategory);
