import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, Table } from "semantic-ui-react";

class ProductCheckListItems extends Component {
//   constructor(props) {
//     super();
//     console.log(props);
//   }

  state = {
    isProductChecked: false,
  };

  handleClick = (e, { checked, value }) => {
    if (checked) {
      this.props.campaignProducts.push(value);
      console.log(value);
    } else {
      if (this.props.campaignProducts.includes(value)) {
        let index = this.props.campaignProducts.indexOf(value);
        this.props.campaignProducts.splice(index, 1);
      }
    }
  };

//   toggle = () =>
//     this.setState((prevState) => ({ isProductChecked: !prevState.isProductChecked }));

  render() {
    return (
      <Table.Row key={this.props.product.id}>
        <Table.Cell>
          <Checkbox
            onClick={this.handleClick}
            // onChange={this.toggle}
            // checked={this.state.isProductChecked}
            value={this.props.product.id}
          />
        </Table.Cell>
        <Table.Cell>{this.props.product.id}</Table.Cell>
        <Table.Cell>{this.props.product.title}</Table.Cell>
      </Table.Row>
    );
  }
}

const mapStateToProps = state => {
    const { campaignProducts } = state.ProductsReducer;
    return {
        campaignProducts
    }
}

export default connect(mapStateToProps)(ProductCheckListItems);
