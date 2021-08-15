import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../actions/ProductsAction";
import { Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DeleteCategory from "./DeleteCategory";

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <Button
          as={Link}
          to="/create-category"
          content="Create a Category"
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
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.categoriesValues.map((category) => {
              return (
                <Table.Row key={category.id}>
                  <Table.Cell>{category.id}</Table.Cell>
                  <Table.Cell>{category.title}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={category.Image.uri}
                      width="75"
                      height="75"
                      alt="cat_img"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      as={Link}
                      to={{
                        pathname: `/edit-category/${category.id}`,
                        title: category.title,
                      }}
                      icon="blue edit outline"
                      basic
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Button icon="red trash alternate outline" basic /> */}
                    <DeleteCategory title={category.title} id={category.id}/>
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

const mapStateToProps = (state) => {
  const { categoriesValues, redirectUrlValue } = state.ProductsReducer;
  return {
    categoriesValues,
    redirectUrlValue
  };
};

export default connect(mapStateToProps, { fetchCategories })(CategoryList);
