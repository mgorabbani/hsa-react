import React from "react";
import { Container, Row, Col } from "reactstrap";
import StudentMaps from './StudentMaps';
const HomePage = () => (
  <React.Fragment>
    <section >
      <Container >
        <Row
          className="align-items-center "
          style={{
            height: "70vh",
            color: "white",
          }}
        >
          <Col xs={10} sm={4}>
            <h3>
              TARGETING NEXT FALL? GET EARLY ACCESS:
        </h3>
            <h5> The key to your US university application success
    is to choose the right one. Get instant university recommendation and insights from students like you who carved their own path.
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

    {/* <Container >
      <Row className="align-items-center justify-content-center text-center">
        <Col xs={10} sm={10}>
          <div className="text-center">

          </div>
        </Col>
      </Row>
    </Container> */}
  </React.Fragment>
);

export default HomePage;
