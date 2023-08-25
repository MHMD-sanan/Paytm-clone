import { Button, Col, Container, Row } from "react-bootstrap";
import img2 from "../assets/images/im2.webp";

const Home = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="text-center mt-5">
          <h1 className="fw-bold mt-5">
            India's Most-loved <br /> Payments App
          </h1>
          <p className="lh-base">
            Recharge & pay bills, book flights & movie tickets,
            <br /> open a savings account, invest in stocks & mutual <br />{" "}
            funds, and do a lot more.
          </p>
          <Button variant="dark">Download Paytm App</Button>
        </Col>
        <Col md={6}>
          <img src={img2} alt="paytm" width={500} className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
