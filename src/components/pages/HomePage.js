import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

const HomePage = () => (
  <React.Fragment>
    <section className="home-area">
      <Container >
        <Row
          className="align-items-center "
          style={{
            height: "70vh",
            color: "white",
          }}
        >
          <Col xs={10} sm={6}>
            <h2>
              The key to your college application success
    is making it your own.
        </h2>
            <h5>Real application examples and insights from students like you who carved their own path.
Discover and showcase the best version of you.</h5>
            <br />
          </Col>
          <Col xs={10} sm={6}>
            <div className="text-center">
              <img className="img-fluid rounded" src={require('../../assets/lindsay-henwood-47743-unsplash.jpg')} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <Container >
      <Row className="align-items-center justify-content-center text-center">
        <Col xs={10} sm={10}>
          <div className="text-center">
            <img className="img-fluid" src={require('../../assets/demo2.jpg')} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default HomePage;
