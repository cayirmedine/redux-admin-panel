import { api } from "../api";
import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
const FormData = require("form-data");

const CategoryForm = (props) => {
  var formData = new FormData();
  formData.append("title", props.category?.title);

  const onInputChange = async (e) => {
    await formData.delete("title");
    await formData.append("title", e.target.value);
  };

  const handleFile = async (e) => {
    await formData.delete("image");
    if (e.target && e.target.files[0]) {
      await formData.append("image", e.target.files[0]);
    }
    console.log(e.target.files[0]);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (props.category?.title) {
      api()
        .put(`/categories/${props.match.params.id}`,
        formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((res) => console.log(res.data));
    } else {
      api()
        .post("/categories", formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  };

  return (
    <React.Fragment>
      <Segment
        raised
        style={{ marginTop: "1.5em", marginLeft: "1.5em", marginRight: "10em" }}
      >
        <Form>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder={formData.get("title") || "Title"}
              name="title"
              onChange={onInputChange}
            />
          </Form.Field>

          <Form.Field>
            <input type="file" name="image" onChange={handleFile} />
          </Form.Field>

          <Button type="submit" onClick={onFormSubmit}>
            Submit
          </Button>
        </Form>
      </Segment>
    </React.Fragment>
  );
};

export default CategoryForm;
