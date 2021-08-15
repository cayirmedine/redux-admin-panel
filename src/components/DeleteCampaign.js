import React, { Component } from "react";
import { Button, Modal, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteCampaign } from "../actions/ProductsAction";

class DeleteCampaign extends Component {
  state = {
    isCampaignDeleteModalOpen: false,
  };

  deleteCampaign = async () => {
    await this.setState({ isCampaignDeleteModalOpen: false })
    await this.props.deleteCampaign(this.props.id);
  };

  render() {
    return (
      <div>
        <Modal
          onClose={() => this.setState({ isCampaignDeleteModalOpen: false })}
          onOpen={() => this.setState({ isCampaignDeleteModalOpen: true })}
          open={this.state.isCampaignDeleteModalOpen}
          size="tiny"
          trigger={<Button icon="red trash alternate outline" basic />}
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete Campaign
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
                this.setState({ isCampaignDeleteModalOpen: false })
              }
            >
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={this.deleteCampaign}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { campaignsValues } = state.ProductsReducer;
    return {
        campaignsValues
    }
}

export default connect(mapStateToProps, { deleteCampaign })(DeleteCampaign);
