import React, { Component } from "react";
import { api } from "../api";
import { Button, Table, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ProductList extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    api()
      .get("/products")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Button
          as={Link}
          to="/create-product"
          content="Create a Product"
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
              <Table.HeaderCell>Unit Price</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Images</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.products.map((product) => {
              return (
                <Table.Row key={product.id}>
                  <Table.Cell>{product.id}</Table.Cell>
                  <Table.Cell>{product.title}</Table.Cell>
                  <Table.Cell>{product.unitPrice}</Table.Cell>
                  <Table.Cell>{product.description}</Table.Cell>
                  <Table.Cell>
                    <Segment vertical>
                      {product.Images.map((image) => {
                        return (
                          <div key={image.id}>
                            <img
                              src={image.uri}
                              alt="product_img"
                              width="75"
                              height="75"
                              style={{ marginRight: ".5em" }}
                            />
                          </div>
                        );
                      })}
                    </Segment>
                  </Table.Cell>
                  <Table.Cell>
                    <Button 
                    as={Link}
                    to={{
                      pathname: `/edit-product/${product.id}`,
                      title: product.title,
                      unitPrice: product.unitPrice,
                      description: product.description,
                      cat_id: product.cat_id,
                      subCat_id: product.subCat_id
                    }}
                    icon="blue edit outline" basic />
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

export default ProductList;
