import { Card, Col, Container, Row } from "react-bootstrap"
import Header from "./Header"
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa"

const HotelService = () => {
  return (
    <>
        <Container>
            <Header title={"Our Services"} />

            <Row className="mt-4">
                <h4 className="text-center">
                    Services at <span className="hotel-color"> Hotel - </span>Booking
                    <span className="gap-2">
                        <FaClock className="ml-5" /> 24-Hour Front Desk
                    </span>
                </h4>
            </Row>
            <hr />

            <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaWifi /> WiFi
                            </Card.Title>
                            <Card.Text>빠른 인터넷 서비스</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaUtensils /> Breakfast
                            </Card.Title>
                            <Card.Text> 맛있는 조식 뷔페 </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaTshirt /> Laundry
                            </Card.Title>
                            <Card.Text>세탁 서비스</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaCocktail /> Mini-bar
                            </Card.Title>
                            <Card.Text>음료와 스낵바 제공</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaParking /> Parking
                            </Card.Title>
                            <Card.Text>편리한 주차 공간 제공</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaSnowflake /> Air conditioning
                            </Card.Title>
                            <Card.Text>공기청정시스템</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    </>
  )
}

export default HotelService