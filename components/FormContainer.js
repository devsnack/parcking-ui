import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function FormContainer({ title = "add employee", children }) {
  return (
    <Row className="justify-content-md-center">
      <Col md={9}>
        <Container>
          <Card>
            <Card.Header>{title}</Card.Header>
            <Card.Body>{children}</Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  );
}

export default FormContainer;
