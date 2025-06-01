import { Container } from "react-bootstrap"

const Parallax = () => {
  return (
    <div className="parallax mb-5">
        <Container className="text-center px-5 py-5 justify-content-center">
            <div className="animated-texts bounceIn">
                <h1>
                    간편한 <span className="hotel-color">Hotel-Booking</span>
                </h1>
                <h3>최고의 서비스를 제공하겠습니다.</h3>
            </div>
        </Container>
    </div>
  )
}

export default Parallax