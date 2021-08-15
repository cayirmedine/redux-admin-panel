import React, { Component } from "react";
// import { api } from "../api";
import { connect } from "react-redux";
import { editCategory } from "../actions/ProductsAction";
import { Button, Form, Segment, Input } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

let formData = new FormData();

class EditCategory extends Component {

  state = {
    categoryTitleValue: this.props.location.title,
    categoryImage: null
  }

  onCategoryTitleChange = (e, { value }) => {
    this.setState({ categoryTitleValue: value })
  };

  handleCategoryImage = (e) => {
    if (e.target && e.target.files[0]) {
      this.setState({ categoryImage: e.target.files[0] })
    }
    console.log(e.target.files[0]);
  };

  onCategoryFormSubmit = (event) => {
    formData.set("title", this.state.categoryTitleValue);
    formData.set("image", this.state.categoryImage);
    console.log(formData.get("title"));
    console.log(formData.get("image"));
    // api()
    //   .put(`/category/${this.props.match.params.id}`, formData, {
    //     headers: { "content-type": "multipart/form-data" },
    //   })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
    this.props.editCategory(this.props.match.params.id, formData);
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
            <Form.Field>
              <label>Title</label>
              <Input
                placeholder={this.props.location.title}
                onChange={this.onCategoryTitleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Image</label>
              <input type="file" onChange={this.handleCategoryImage} />
            </Form.Field>

            <Button type="submit" onClick={this.onCategoryFormSubmit}>
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    productCategoriesSpinnerValue,
    redirectUrlValue,
  } = state.ProductsReducer;
  return {
    productCategoriesSpinnerValue,
    redirectUrlValue,
  };
}

export default connect(mapStateToProps, { editCategory })(EditCategory);
