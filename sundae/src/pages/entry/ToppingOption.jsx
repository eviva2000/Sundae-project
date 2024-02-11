import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ToppingOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    setIsChecked(!isChecked);
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
  };
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
