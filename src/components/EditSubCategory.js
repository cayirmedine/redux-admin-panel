import React, { Component } from "react";
import { connect } from "react-redux";
import { editSubCategory, fetchCategories } from "../actions/ProductsAction";
import { Button, Form, Segment, Input } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class EditSubCat extends Component {
  state = {
    title: this.props.location.title,
    cat_id: this.props.location.cat_id
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  onSubCatTitleChange = (e, { value }) => {
    this.setState({ title: value });
  };

  onSubCatsCatIDChange = (e, { value }) => {
    console.log(e);
    console.log(e.target.id);
    this.setState({ cat_id: value });
  };

  onSubCatFormSubmit = (event) => {
    console.log("State:", this.state);

    event.preventDefault();
    this.props.editSubCategory(this.props.match.params.id, this.state);
  };

  render() {
    const { productSubCategoriesSpinnerValue, redirectUrlValue } = this.props;

    if (redirectUrlValue) {
      return <Redirect to={redirectUrlValue} />;
    }
    return (
      <div
        style={{ marginTop: "1.5em", marginLeft: "1.5em", marginRight: "10em" }}
      >
        <Segment raised>
          <Form loading= {productSubCategoriesSpinnerValue}>
            <Form.Field>
              <label>Title</label>
              <Input
                placeholder={this.props.location.title}
                name="title"
                onChange={this.onSubCatTitleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                name="cat_id"
                label="Category"
                options={this.props.categoryOptions}
                placeholder="Category"
                onChange={this.onSubCatsCatIDChange}
              />
            </Form.Field>
            <Button type="submit" onClick={this.onSubCatFormSubmit}>
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  var _ = require("lodash");

  let categoryOptions = _.map(
    state.ProductsReducer.categoriesValues,
    (val) => ({
      id: val.id,
      text: val.title,
      value: val.id,
    })
  );

  const {
    productSubCategoriesSpinnerValue,
    redirectUrlValue,
    categoriesValues,
  } = state.ProductsReducer;

  return {
    productSubCategoriesSpinnerValue,
    redirectUrlValue,
    categoriesValues,
    categoryOptions
  };
}

export default connect(mapStateToProps, { fetchCategories, editSubCategory })(EditSubCat);
