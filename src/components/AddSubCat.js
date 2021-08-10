import { api } from "../api";
import React, { Component } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
// import Select from "react-select";
// let formData = new FormData();

class AddSubCat extends Component {
  state = {
    title: "",
    cat_id: null,
  };

  options = [];

  componentDidMount() {
    api()
      .get("/categories")
      .then((res) => {
        res.data.map((cat) =>
          this.options.push({
            id: cat.id,
            text: cat.title,
            value: cat.id,
          })
        );
      });
  }

  // onTitleChange = (e, { value }) => {
  //   this.setState({ subCategoryTitleValue: value }) }

  // onCatIDChange = (e, { id }) => {
  //   console.log(e);
  //   this.setState({ subCategoryCatIDValue: id })
  // }

  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  onCatIDChange = (e, { value }) => {
    console.log(e);
    console.log(e.target.id);
    this.setState({ cat_id: value });
  };

  onFormSubmit = (event) => {

    // console.log("Title:", formData.get("title"));
    // console.log("Cat ID:", formData.get("cat_id"));
    console.log("State:", this.state);

    event.preventDefault();
    api()
      .post("/sub-categories", this.state)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div
        style={{ marginTop: "1.5em", marginLeft: "1.5em", marginRight: "10em" }}
      >
        <Segment raised>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Title"
                name="title"
                onChange={this.onTitleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                name="cat_id"
                label="Category"
                options={this.options}
                placeholder="Category"
                onChange={this.onCatIDChange}
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

export default AddSubCat;
