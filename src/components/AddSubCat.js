import React, { Component } from "react";
import { connect } from "react-redux";
import { addSubCategory, fetchCategories } from "../actions/ProductsAction";
import { Button, Form, Segment, Input } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class AddSubCat extends Component {
  state = {
    title: "",
    cat_id: null,
  };

  categoryOptions = [];

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
    this.props.addSubCategory(this.state);
  };

  render() {
    const { productSubCategoriesSpinnerValue, redirectUrlValue } = this.props;

    if (redirectUrlValue) {
      return <Redirect to={redirectUrlValue} />;
    }

    this.props.categoriesValues.map((cat) =>
      this.categoryOptions.push({
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
          <Form loading={productSubCategoriesSpinnerValue}>
            <Form.Field
            placeholder="Title"
            label="Title"
            onChange={this.onSubCatTitleChange}
            control={Input}>
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                name="cat_id"
                label="Category"
                options={this.categoryOptions}
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

const mapStateToProps = (state) => {
  const { productSubCategoriesSpinnerValue, redirectUrlValue, categoriesValues } =
    state.ProductsReducer;
  return {
    productSubCategoriesSpinnerValue,
    redirectUrlValue,
    categoriesValues
  };
};

export default connect(mapStateToProps, { addSubCategory, fetchCategories })(
  AddSubCat
);
