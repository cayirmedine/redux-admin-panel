import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, Icon, Button, Grid, Segment } from "semantic-ui-react";

import CategoryList from "./CategoryList";
import SubCatList from "./SubCatList";
import ProductList from "./ProductList";
import CampaignList from "./CampaignList";
import AddCategory from "./AddCategory";
import AddSubCat from "./AddSubCat";
import EditCategory from "./EditCategory";
import AddProduct from "./AddProduct";
import AddCampaign from "./AddCampaign";
import EditSubCat from "./EditSubCategory";
import EditProduct from "./EditProduct";
import EditCampaign from "./EditCampaign";

class Dashboard extends Component {
  state = { activeItem: "Categories" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Router>
          <div>
            <Menu size="large" borderless>
              <Menu.Item header as={Link} to="/">
                <Icon name="cart" />
                BirTakım Market
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item>
                  <Button circular icon="sun outline" basic />
                </Menu.Item>
                <Menu.Item>
                  <Button animated basic href="http://localhost:3000">
                    <Button.Content visible>Log Out</Button.Content>
                    <Button.Content hidden>
                      <Icon name="log out" />
                    </Button.Content>
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>

            <Grid columns="equal">
              <Grid.Column style={{ marginLeft: "1em", marginRight: "1em" }}>
                <Segment vertical padded>
                  <Menu fluid pointing vertical size="large">
                    <Menu.Item
                      as={Link}
                      to="/categories"
                      name="Categories"
                      active={activeItem === "Categories"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      as={Link}
                      to="/sub-categories"
                      name="SubCategories"
                      active={activeItem === "SubCategories"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      as={Link}
                      to="/products"
                      name="Products"
                      active={activeItem === "Products"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      as={Link}
                      to="/campaigns"
                      name="Campaigns"
                      active={activeItem === "Campaigns"}
                      onClick={this.handleItemClick}
                    />
                  </Menu>
                </Segment>
              </Grid.Column>
              <Grid.Column width={12} style={{ marginRight: "2.5em" }}>
                <Route path="/dashboard" exact component={CategoryList} />
                <Route path="/categories" exact component={CategoryList} />
                <Route path="/create-category" exact component={AddCategory} />
                <Route
                  path="/edit-category/:id"
                  exact
                  component={EditCategory}
                />
                <Route path="/sub-categories" exact component={SubCatList} />
                <Route path="/create-subcategory" exact component={AddSubCat} />
                <Route path="/edit-subcat/:id" exact component={EditSubCat} />
                <Route path="/products" exact component={ProductList} />
                <Route path="/create-product" exact component={AddProduct} />
                <Route path="/edit-product/:id" exact component={EditProduct} />
                <Route path="/campaigns" exact component={CampaignList} />
                <Route path="/create-campaign" exact component={AddCampaign} />
                <Route
                  path="/edit-campaign/:id"
                  exact
                  component={EditCampaign}
                />
              </Grid.Column>
            </Grid>
          </div>
        </Router>
      </div>
    );
  }
}

export default Dashboard;
