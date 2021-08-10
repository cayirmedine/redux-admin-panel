import React, { Component } from "react";
import { api } from "../api";
import { Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

class SubCatList extends Component {
  // const [subcategories, setSubCategories] = useState([]);
  state = {
    subcategories: [],
  };

  // useEffect(() => {
  //   api()
  //     .get("/sub-categories")
  //     .then((response) => {
  //       setSubCategories(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  componentDidMount() {
    api()
      .get("/sub-categories")
      .then((response) => {
        this.setState({ subcategories: response.data });
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
          to="/create-subcategory"
          content="Create a Subcategory"
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
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.subcategories.map((subcategory) => {
              return (
                <Table.Row key={subcategory.id}>
                  <Table.Cell>{subcategory.id}</Table.Cell>
                  <Table.Cell>{subcategory.title}</Table.Cell>
                  <Table.Cell>
                    <Button
                    as={Link}
                    to={{
                      pathname: `/edit-subcat/${subcategory.id}`,
                      title: subcategory.title,
                      cat_id: subcategory.cat_id
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

export default SubCatList;
