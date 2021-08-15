import React, { Component } from "react";
import { connect } from "react-redux";
import {
  editCampaign,
  fetchProducts,
  fetchCampaignsProducts,
} from "../actions/ProductsAction";
import { Button, Form, Segment, Checkbox, Table } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import ProductCheckListItems from "./ProductCheckListItems";
import { Redirect } from "react-router-dom";

var formData = new FormData();
const moment = require("moment");

class EditCampaign extends Component {
  state = {
    campaignTitle: this.props.location.title,
    campaignDescription: this.props.location.description,
    campaignEndDate: this.props.location.endDate,
    isCampaignActive: this.props.location.isActive,
    isCampaignInSlider: this.props.location.isInSlider,
    campaignImage: null,
  };

  componentDidMount() {
    this.props.fetchProducts();

    this.props.fetchCampaignsProducts(this.props.match.params.id);
  }

  onCampaignTitleChange = (e) => {
    this.setState({ campaignTitle: e.target.value });
  };

  onCampaignDescriptionChange = (e) => {
    this.setState({ campaignDescription: e.target.value });
  };

  onCampaignActiveChange = async () => {
    await this.setState({ isCampaignActive: !this.state.isCampaignActive });
    console.log("Is active checked?", this.state.isCampaignActive);
  };

  onCampaignInSliderChange = async () => {
    await this.setState({ isCampaignInSlider: !this.state.isCampaignInSlider });
    console.log("Is in slider checked?", this.state.isCampaignInSlider);
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

  handleProductClick = (e, { checked, value }) => {
    if (checked) {
      console.log(value);
      this.props.campaignProducts.push(value);
    } else {
      if (this.state.products.includes(value)) {
        let index = this.props.campaignProducts.indexOf(value);
        this.props.campaignProducts.splice(index, 1);
      }
    }
  };

  onCampaignFormSubmit = async (event) => {
    formData.set("title", this.state.campaignTitle);
    formData.set("description", this.state.campaignDescription);
    formData.set(
      "endDate",
      moment(this.state.campaigEndDate).format("YYYY-MM-DD")
    );
    formData.set("isActive", this.state.isCampaignActive);
    formData.set("isInSlider", this.state.isCampaignInSlider);
    formData.set("image", this.state.campaignImage);
    this.props.campaignProducts.map((product) =>
      formData.append("products", product)
    );

    console.log("Title", formData.get("title"));
    console.log("Description", formData.get("description"));
    console.log("endDate", formData.get("endDate"));
    console.log("isActive", formData.get("isActive"));
    console.log("isInSlider", formData.get("isInSlider"));
    console.log("Image", formData.get("image"));
    console.log("Products", formData.getAll("products"));

    await this.props.editCampaign(this.props.match.params.id, formData);

    await formData.delete("products");
  };

  render() {
    const { productCampaignSpinnerValue, redirectUrlValue } = this.props;
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
          <Form loading={productCampaignSpinnerValue}>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder={this.props.location.title}
                name="title"
                onChange={this.onCampaignTitleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <input
                placeholder={this.props.location.description}
                name="description"
                onChange={this.onCampaignDescriptionChange}
              />
            </Form.Field>

            <Form.Field>
              <label>End Date</label>
              <SemanticDatepicker
                minDate="2021-08-05"
                placeholder={this.props.location.endDate}
                onChange={this.handleCampaignDateChange}
              />
            </Form.Field>

            <Form.Group
              widths="equal"
              style={{ marginTop: "2em", marginBottom: "2em" }}
            >
              <Checkbox
                slider
                checked={this.state.isCampaignActive}
                label="Active"
                style={{ marginLeft: "2.5em", marginRight: "10em" }}
                onChange={this.onCampaignActiveChange}
              />
              <Checkbox
                slider
                checked={this.state.isCampaignInSlider}
                label="In Slider"
                onChange={this.onCampaignInSliderChange}
              />
            </Form.Group>

            <Form.Field>
              <label>Image</label>
              <input
                type="file"
                name="image"
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
                      <ProductCheckListItems
                        product={product}
                        campaignProduct={this.props.campaignProducts}
                      />
                    );
                  })}
                </Table.Body>
              </Table>
            </Form.Field>

            <Button type="submit" onClick={this.onCampaignFormSubmit}>
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
    productCampaignSpinnerValue,
    redirectUrlValue,
    productsValues,
    campaignProducts,
  } = state.ProductsReducer;

  return {
    productCampaignSpinnerValue,
    redirectUrlValue,
    productsValues,
    campaignProducts,
  };
};

export default connect(mapStateToProps, {
  editCampaign,
  fetchProducts,
  fetchCampaignsProducts,
})(EditCampaign);
