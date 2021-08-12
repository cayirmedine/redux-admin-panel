import React, { Component } from "react";
import { connect } from "react-redux";
import { addCampaign, fetchProducts } from "../actions/ProductsAction";
import { Button, Form, Segment, Checkbox, Table } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Redirect } from "react-router-dom";

var formData = new FormData();
const moment = require('moment');

class AddCampaign extends Component {
  state = {
    campaignTitle: "",
    campaignDescription: "",
    campaignEndDate: "",
    isCampaignActive: false,
    isCampaignInSlider: false,
    campaignImage: null,
    campaignProducts: [],
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  onCampaignTitleChange = (e) => {
    this.setState({ campaignTitle: e.target.value });
  };

  onCampaignDescriptionChange = (e) => {
    this.setState({ campaignDescription: e.target.value });
  };

  onCampaignActiveChange = (e, { checked }) => {
    // console.log(e);
    if (checked) this.setState({ isCampaignActive: true });
    console.log("Is active checked?", checked);
  };

  onCampaignInSliderChange = (e, { checked }) => {
    if (checked) this.setState({ isCampaignInSlider: true });
    console.log("Is in slider checked?", checked)
  };

  handleCampaignDateChange = (e, data) => {
    this.setState({ campaignEndDate: data.value });
  };

  handleCampaignImage = (e) => {
    if (e.target && e.target.files[0]) {
      this.setState({ campaignImage: e.target.files[0] });
    }
    console.log(e.target.files[0]);
  };

  handleClick = (e, { checked, value }) => {
    if (checked) {
      this.state.campaignProducts.push(value);
      console.log(value);
    } else {
      if(this.state.campaignProducts.includes(value)) {
        let index = this.state.campaignProducts.indexOf(value);
        this.state.campaignProducts.splice(index, 1);
      }
    }
  };

  onFormSubmit = async (event) => {
    formData.set("title", this.state.campaignTitle);
    formData.set("description", this.state.campaignDescription);
    formData.set("endDate", moment(this.state.campaignEndDate).format("YYYY-MM-DD"));
    formData.set("isActive", this.state.isCampaignActive);
    formData.set("isInSlider", this.state.isCampaignInSlider);
    formData.set("image", this.state.campaignImage);
    this.state.campaignProducts.map(product => formData.append("products", product));

    console.log("Title", formData.get("title"));
    console.log("Description", formData.get("description"));
    console.log("endDate", formData.get("endDate"));
    console.log("isActive", formData.get("isActive"));
    console.log("isInSlider", formData.get("isInSlider"));
    console.log("Image", formData.get("image"));
    console.log("State Products", this.state.campaignProducts);
    console.log("Products", formData.getAll("products"));

    // await api()
    //   .post("/campaigns", formData, {
    //     headers: { "content-type": "multipart/form-data" },
    //   })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));

    await this.props.addCampaign(formData);

    await formData.delete("products");
  };

  render() {
    const { productSpinnerValue, redirectUrlValue } =
      this.props;

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
          <Form loading={productSpinnerValue}>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Title"
                onChange={this.onCampaignTitleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <input
                placeholder="Description"
                onChange={this.onCampaignDescriptionChange}
              />
            </Form.Field>

            <Form.Field>
              <label>End Date</label>
              <SemanticDatepicker minDate='2021-08-05' onChange={this.handleCampaignDateChange} />
            </Form.Field>

            <Form.Group
              widths="equal"
              style={{ marginTop: "2em", marginBottom: "2em" }}
            >
              <Checkbox
                slider
                label="Active"
                style={{ marginLeft: "2.5em", marginRight: "10em" }}
                onChange={this.onCampaignActiveChange}
              />
              <Checkbox
                slider
                label="In Slider"
                onChange={this.onCampaignInSliderChange}
              />
            </Form.Group>

            <Form.Field>
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={this.handleCampaignImage}
              />
            </Form.Field>

            <Form.Field>
              <label>Products</label>
              <Table>
                <Table.Body>
                  {this.props.productsValues.map((product) => {
                    return (
                      <Table.Row key={product.id}>
                        <Table.Cell>
                          <Checkbox
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

const mapStateToProps = state => {
  const {
    productCampaignSpinnerValue,
    redirectUrlValue,
    productsValues
  } = state.ProductsReducer;

  return {
    productCampaignSpinnerValue,
    redirectUrlValue,
    productsValues
  }
}

export default connect(mapStateToProps, { addCampaign, fetchProducts })(AddCampaign);
