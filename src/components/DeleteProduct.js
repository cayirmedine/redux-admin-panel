import React, { Component } from "react";
import { Button, Modal, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteProduct } from "../actions/ProductsAction";

class DeleteProduct extends Component {
  state = {
    isProductDeleteModalOpen: false,
  };

  deleteProduct = async () => {
    await this.setState({ isProductDeleteModalOpen: false })
    await this.props.deleteProduct(this.props.id);
  };

  render() {
    return (
      <div>
        <Modal
          onClose={() => this.setState({ isProductDeleteModalOpen: false })}
          onOpen={() => this.setState({ isProductDeleteModalOpen: true })}
          open={this.state.isProductDeleteModalOpen}
          size="tiny"
          trigger={<Button icon="red trash alternate outline" basic />}
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete Product
          </Header>
          <Modal.Content>
            <p align="center">
              Are you sure you want to delete {this.props.title}?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="red"
              onClick={() =>
                this.setState({ isProductDeleteModalOpen: false })
              }
            >
              <Icon name="remove" /> No
            </Button>
            <Button color="green" onClick={this.deleteProduct}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { productsValues } = state.ProductsReducer;
    return {
        productsValues
    }
}

export default connect(mapStateToProps, { deleteProduct })(DeleteProduct);
