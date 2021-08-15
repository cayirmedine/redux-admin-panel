import React, { Component } from "react";
import { Button, Modal, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteSubCategory } from "../actions/ProductsAction";

class DeleteSubCategory extends Component {
  state = {
    isSubCategoryDeleteModalOpen: false,
  };

  deleteSubCategory = async () => {
    await this.setState({ isSubCategoryDeleteModalOpen: false })
    await this.props.deleteSubCategory(this.props.id);
  };

  render() {
    return (
      <div>
        <Modal
          onClose={() => this.setState({ isSubCategoryDeleteModalOpen: false })}
          onOpen={() => this.setState({ isSubCategoryDeleteModalOpen: true })}
          open={this.state.isSubCategoryDeleteModalOpen}
          size="tiny"
          trigger={<Button icon="red trash alternate outline" basic />}
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete SubCategory
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
                this.setState({ isSubCategoryDeleteModalOpen: false })
              }
            >
              <Icon name="remove" /> No
            </Button>
            <Button color="green" onClick={this.deleteSubCategory}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { subcategoriesValues } = state.ProductsReducer;
    return {
        subcategoriesValues
    }
}

export default connect(mapStateToProps, { deleteSubCategory })(DeleteSubCategory);
