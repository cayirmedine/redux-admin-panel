import { api } from "../api";
import React, { Component } from "react";
import { Button, Form, Segment, Checkbox, Table } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

var formData = new FormData();
const moment = require("moment");

class EditCampaign extends Component {
  state = {
    title: this.props.location.title,
    description: this.props.location.description,
    endDate: this.props.location.endDate,
    isActive: this.props.location.isActive,
    isInSlider: this.props.location.isInSlider,
    image: null,
    products: [],
    checkedProduct: [],
  };

  componentDidMount() {
    api()
      .get("/products")
      .then((res) => this.setState({ products: res.data }))
      .catch((err) => {
        console.log(err);
      });

    api()
      .get(`/campaign-product/${this.props.match.params.id}`)
      .then((res) =>
        res.data.map((data) => this.state.checkedProduct.push(data.product_id))
      )
      .catch((err) => console.log(err));
  }

  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  onActiveChange = (e, { checked }) => {
    if (checked) this.setState({ isActive: true });
    console.log("Is active checked?", checked);
  };

  onInSliderChange = (e, { checked }) => {
    if (checked) this.setState({ isInSlider: true });
    console.log("Is in slider checked?", checked);
  };

  handleDateChange = (e, data) => {
    this.setState({ endDate: data.value });
  };

  handleImage = (e) => {
    if (e.target && e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
    }
    console.log(e.target.files[0]);
  };

  handleClick = (e, { checked, value }) => {
    if (checked) {
      console.log(value)
      this.state.products.push(value);
    } else {
      if (this.state.products.includes(value)) {
        let index = this.state.products.indexOf(value);
        this.state.products.splice(index, 1);
      }
    }
  };

  onFormSubmit = async (event) => {
    formData.set("title", this.state.title);
    formData.set("description", this.state.description);
    formData.set("endDate", moment(this.state.endDate).format("YYYY-MM-DD"));
    formData.set("isActive", this.state.isActive);
    formData.set("isInSlider", this.state.isInSlider);
    formData.set("image", this.state.image);

    console.log("Title", formData.get("title"));
    console.log("Description", formData.get("description"));
    console.log("endDate", formData.get("endDate"));
    console.log("isActive", formData.get("isActive"));
    console.log("isInSlider", formData.get("isInSlider"));
    console.log("Image", formData.get("image"));
    console.log("Products", formData.getAll("products"));
    console.log(formData.entries().length);

    await api()
      .put(`/campaigns/${this.props.match.params.id}`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    await formData.delete("products");
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
                onChange={this.onTitleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <input
                placeholder={this.props.location.description}
                name="description"
                onChange={this.onDescriptionChange}
              />
            </Form.Field>

            <Form.Field>
              <label>End Date</label>
              <SemanticDatepicker
                minDate="2021-08-05"
                placeholder={this.props.location.endDate}
                onChange={this.handleDateChange}
              />
            </Form.Field>

            <Form.Group
              widths="equal"
              style={{ marginTop: "2em", marginBottom: "2em" }}
            >
              <Checkbox
                slider
                checked={this.props.location.isActive}
                label="Active"
                style={{ marginLeft: "2.5em", marginRight: "10em" }}
                onChange={this.onActiveChange}
              />
              <Checkbox
                slider
                checked={this.props.location.isInSlider}
                label="In Slider"
                onChange={this.onInSliderChange}
              />
            </Form.Group>

            <Form.Field>
              <label>Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={this.handleImage}
              />
            </Form.Field>

            <Form.Field>
              <label>Products</label>
              <Table>
                <Table.Body>
                  {this.state.products.map((product) => {
                    return (
                      <Table.Row key={product.id}>
                        <Table.Cell>
                          <Checkbox
                            checked={this.state.checkedProduct.includes(
                              product.id
                            )}
                            onClick={this.handleClick}
                            value={product.id}
                          />
                        </Table.Cell>
                        <Table.Cell>{product.id}</Table.Cell>
                        <Table.Cell>{product.title}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
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

export default EditCampaign;
