import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

function SaveData(jsonData) {
  const url = "http://localhost:8000/api/product/";
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: jsonData,
  }).catch((err) => console.log(err));
}

function App() {
  const [product, setProduct] = useState([]);
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data) => {
    let jsonData = JSON.stringify(data);
    SaveData(jsonData);
    handleClose();
    window.location.reload();
  };

  const getData = () => {
    fetch("http://localhost:8000/api/product/")
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 0) {
          setProduct(result);
        } else {
          setProduct(<></>);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <h2 className="text-success">Product</h2>
      <Table striped bordered hover>
        <thead>
          <tr className="table-primary text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item) => (
            <tr key={item.id}>
              <td className="text-center">{item.id}</td>
              <td>{item.name}</td>
              <td className="text-center">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                {...register("name")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                step=".01"
                {...register("price")}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;