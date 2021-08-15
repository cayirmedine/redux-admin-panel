import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, Table } from "semantic-ui-react";

class ProductCheckListItems extends Component {

  state = {
    isProductChecked: this.props.campaignProducts.includes(this.props.product.id),
  }

  handleClick = async (e, { value, checked }) => {
    if (checked) {
      await this.setState({ isProductChecked: true });
      await this.props.campaignProducts.push(value);
      console.log(value);
      console.log(this.state.isProductChecked);
    } else {
      if (this.props.campaignProducts.includes(value)) {
        await this.setState({ isProductChecked: false });
        let index = this.props.campaignProducts.indexOf(value);
        await this.props.campaignProducts.splice(index, 1);
        console.log(this.state.isProductChecked);
      }
    }
  };

  render() {
    return (
      <Table.Row key={this.props.product.id}>
        <Table.Cell>
          <Checkbox
            onChange={this.handleClick}
            // onChange={this.toggle}
            checked={this.state.isProductChecked}
            value={this.props.product.id}
          />
        </Table.Cell>
        <Table.Cell>{this.props.product.id}</Table.Cell>
        <Table.Cell>{this.props.product.title}</Table.Cell>
      </Table.Row>
    );
  }
}

const mapStateToProps = (state) => {
  const { campaignProducts } = state.ProductsReducer;
  return {
    campaignProducts,
  };
};

export default connect(mapStateToProps)(ProductCheckListItems);
