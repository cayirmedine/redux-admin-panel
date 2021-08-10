import React, { Component } from "react";
import { api } from "../api";
import { Button, Form, Segment } from "semantic-ui-react";

let formData = new FormData();

class EditCategory extends Component {

  state = {
    title: this.props.location.title,
    image: null
  }

  componentDidMount() {
    console.log(this.props);
  }

  onInputChange = (e) => {
    this.setState({ title: e.target.value })
  };

  handleImage = (e) => {
    if (e.target && e.target.files[0]) {
      this.setState({ image: e.target.files[0] })
    }
    console.log(e.target.files[0]);
  };

  onFormSubmit = (event) => {
    formData.set("title", this.state.title);
    formData.set("image", this.state.image);
    api()
      .put(`/category/${this.props.match.params.id}`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
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
                placeholder={this.props.location.title}
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

export default EditCategory;
