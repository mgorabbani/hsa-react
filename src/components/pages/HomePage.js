import React from "react";
import { Container, Row, Col } from "reactstrap";
import StudentMaps from './StudentMaps';
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
          <Col xs={10} sm={4}>
            <h2>
              The key to your college application success
    is making it your own.
        </h2>
            <h5>Real application examples and insights from students like you who carved their own path.
Discover and showcase the best version of you.</h5>
            <br />
          </Col>
          <Col xs={10} sm={8}>
            <div className="text-center">
              <StudentMaps />
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
