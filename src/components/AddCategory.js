import React, { Component } from "react";
import { connect } from "react-redux";
import { addCategory } from "../actions/ProductsAction";
import { Button, Form, Segment } from "semantic-ui-react";

var formData = new FormData();

class AddCategory extends Component {

  onInputChange = (e) => {
    this.props.categoryInfo.title = e.target.value;
  };

  handleImage = (e) => {
    if (e.target && e.target.files[0]) {
      this.props.categoryInfo.image = e.target.files[0];
    }
    console.log(e.target.files[0]);
  };

  onFormSubmit = (event) => {
    formData.set("title", this.props.categoryInfo.title);
    formData.set("image", this.props.categoryInfo.image);
    this.props.addCategory(formData);
  };

  render() {
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
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Title"
                name="title"
                onChange={this.onInputChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Image</label>
              <input type="file" name="image" onChange={this.handleImage} />
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

const mapStateToProps = state => {
  const { categoryInfo } = state.ProductsReducer;
  return {
    categoryInfo
  }
}

export default connect(mapStateToProps, { addCategory })(AddCategory);
