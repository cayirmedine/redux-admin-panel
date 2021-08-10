import { api } from "../api";
import React, { Component } from "react";
import { Button, Form, Segment, Input, Label } from "semantic-ui-react";
// import Select from "react-select";
let formData = new FormData();

class AddProduct extends Component {
  state = {
    title: "",
    unitPrice: null,
    description: "",
    cat_id: null,
    subCat_id: null,
    images: [],
    optionsCat: [],
    optionsSubCat: [],
  };

  fileArr = [];

  componentDidMount() {
    api()
      .get("/categories")
      .then((res) => {
        res.data.map((cat) =>
          this.state.optionsCat.push({
            id: cat.id,
            text: cat.title,
            value: cat.id,
          })
        );
      });
  }

  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  onUnitPriceChange = (e) => {
    this.setState({ unitPrice: e.target.value });
  };

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  onCatIDChange = async (e, { value }) => {
    console.log(e);
    await this.setState({ cat_id: value });

    console.log(this.state.cat_id);

    await api()
      .get(`/sub-categories-cat/${this.state.cat_id}`)
      .then((res) => {
        res.data.map((subCat) =>
          this.state.optionsSubCat.push({
            id: subCat.id,
            text: subCat.title,
            value: subCat.id,
          })
        );
      });
  };

  onSubCatIDChange = async (e, { value }) => {
    console.log(e);
    await this.setState({ subCat_id: value });
    await console.log(this.state.subCat_id);
  };

  handleImages = async (e) => {
    if (e.target && e.target.files) {
      this.fileArr = [...e.target.files];
      console.log("File Array:", this.fileArr);
    }
  };

  onFormSubmit = async (event) => {
    await formData.set("title", this.state.title);
    await formData.set("unitPrice", this.state.unitPrice);
    await formData.set("description", this.state.description);
    await formData.set("cat_id", this.state.cat_id);
    await formData.set("subCat_id", this.state.subCat_id);
    await this.fileArr.map((file) => formData.append("images", file));

    console.log("State:", this.state);

    event.preventDefault();
    await api()
      .post("/products", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await formData.set("images", null);
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
              <label>Unit Price</label>
              <Input labelPosition="right" type="text" placeholder="Unit Price" onChange={this.onUnitPriceChange}>
                <input />
                <Label>₺</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                placeholder="Description"
                name="description"
                onChange={this.onDescriptionChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                name="cat_id"
                label="Category"
                options={this.state.optionsCat}
                placeholder="Category"
                onChange={this.onCatIDChange}
              />
              {/* <label>Category</label>
              <select>
                {this.state.optionsCat.map((cat) => {
                  console.log("test");
                  return <option value={cat.id}>{cat.text}</option>;
                })}
              </select> */}
            </Form.Field>
            <Form.Field>
              <Form.Select
                fluid
                name="subCat_id"
                label="SubCategory"
                options={this.state.optionsSubCat}
                placeholder="SubCategory"
                onChange={this.onSubCatIDChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Images</label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={this.handleImages}
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

export default AddProduct;
