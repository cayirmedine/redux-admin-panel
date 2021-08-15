import React, { Component } from "react";
import { Button, Modal, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteCategory } from "../actions/ProductsAction";

class DeleteCategory extends Component {
  state = {
    isCategoryDeleteModalOpen: false,
  };

  deleteCategory = async () => {
    await this.setState({ isCategoryDeleteModalOpen: false })
    await this.props.deleteCategory(this.props.id);
  };

  render() {
    return (
      <div>
        <Modal
          onClose={() => this.setState({ isCategoryDeleteModalOpen: false })}
          onOpen={() => this.setState({ isCategoryDeleteModalOpen: true })}
          open={this.state.isCategoryDeleteModalOpen}
          size="tiny"
          trigger={<Button icon="red trash alternate outline" basic />}
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete Category
          </Header>
          <Modal.Content>
            <p align="center">
              Are you sure you want to delete {this.props.title}?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="red"
              inverted
              onClick={() =>
                this.setState({ isCategoryDeleteModalOpen: false })
              }
            >
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={this.deleteCategory}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { categoriesValues } = state.ProductsReducer;
    return {
        categoriesValues
    }
}

export default connect(mapStateToProps, { deleteCategory })(DeleteCategory);
