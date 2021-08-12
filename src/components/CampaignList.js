import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampaigns } from "../actions/ProductsAction";
import { Button, Icon, Table } from "semantic-ui-react";
import { Link } from 'react-router-dom';

class CampaignList extends Component {

  componentDidMount() {
    this.props.fetchCampaigns();
  }

  render() {
    return (
      <div>
        <Button
          as={Link}
          to="/create-campaign"
          content="Create a Campaign"
          icon="plus"
          labelPosition="left"
          floated="right"
          basic
        />
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Active</Table.HeaderCell>
              <Table.HeaderCell>In Slider</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.campaignsValues.map((campaign) => {
              return (
                <Table.Row key={campaign.id}>
                  <Table.Cell>{campaign.id}</Table.Cell>
                  <Table.Cell>{campaign.title}</Table.Cell>
                  <Table.Cell>{campaign.endDate}</Table.Cell>
                  <Table.Cell>
                    {campaign.isActive ? (
                      <Icon color="green" name="check circle outline" />
                    ) : (
                      <Icon color="red" name="times circle outline" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {campaign.isInSlider ? (
                      <Icon color="green" name="check circle outline" />
                    ) : (
                      <Icon color="red" name="times circle outline" />
                    )}
                  </Table.Cell>
                  <Table.Cell>{campaign.description}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={campaign.Image.uri}
                      alt="campaign_img"
                      width="75"
                      height="75"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                    as={Link}
                    to={{
                      pathname: `/edit-campaign/${campaign.id}`,
                      title: campaign.title,
                      endDate: campaign.endDate,
                      isActive: campaign.isActive,
                      isInSlider: campaign.isInSlider,
                      description: campaign.description,
                    }} icon="blue edit outline" basic />
                  </Table.Cell>
                  <Table.Cell>
                    <Button icon="red trash alternate outline" basic />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { campaignsValues, redirectUrlValue } = state.ProductsReducer;

  return {
    campaignsValues,
    redirectUrlValue
  }
}

export default connect(mapStateToProps, { fetchCampaigns })(CampaignList);
