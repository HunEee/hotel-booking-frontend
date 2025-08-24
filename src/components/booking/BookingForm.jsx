import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { bookRoom, getRoomById } from "../utils/ApiFunctions"
import moment from "moment"
import BookingSummary from "./BookingSummary"
import { Button, Form, FormControl} from "react-bootstrap"

const BookingForm = () => {
    const [validated, setValidated] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [roomPrice, setRoomPrice] = useState(0)

	const currentUser = localStorage.getItem("userId")

	const [booking, setBooking] = useState({
		guestFullName: "",
		guestEmail: currentUser,
		checkInDate: "",
		checkOutDate: "",
		numOfAdults: "",
		numOfChildren: ""
	})

	const { roomId } = useParams()
	const navigate = useNavigate()

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setBooking({ ...booking, [name]: value })
		setErrorMessage("")
	}

	const getRoomPriceById = async (roomId) => {
		try {
			const response = await getRoomById(roomId)
			setRoomPrice(response.roomPrice)
		} catch (error) {
			throw new Error(error)
		}
	}

	useEffect(() => {
		getRoomPriceById(roomId)
	}, [roomId])

	const calculatePayment = () => {
		const checkInDate = moment(booking.checkInDate)
		const checkOutDate = moment(booking.checkOutDate)
		const diffInDays = checkOutDate.diff(checkInDate, "days")
		const paymentPerDay = roomPrice ? roomPrice : 0
		return diffInDays * paymentPerDay
	}

	const isGuestCountValid = () => {
		const adultCount = parseInt(booking.numOfAdults)
		const childrenCount = parseInt(booking.numOfChildren)
		const totalCount = adultCount + childrenCount
		return totalCount >= 1 && adultCount >= 1
	}

	const isCheckOutDateValid = () => {
		if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
			setErrorMessage("체크아웃 날짜는 체크인날짜보다 늦어야 합니다.")
			return false
		} else {
			setErrorMessage("")
			return true
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
			e.stopPropagation()
		} else {
			setIsSubmitted(true)
		}
		setValidated(true)
	}

	const handleFormSubmit = async () => {
		try {
			const confirmationCode = await bookRoom(roomId, booking)
			setIsSubmitted(true)
			navigate("/booking-success", { state: { message: confirmationCode } })
		} catch (error) {
			const errorMessage = error.message
			console.log(errorMessage)
			navigate("/booking-success", { state: { error: errorMessage } })
		}
	}



    return (
        <>
			<div className="container mb-5">
				<div className="row">
					<div className="col-md-6">
						<div className="card card-body mt-5">
							<h4 className="card-title">객실 예약</h4>

							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group>
									<Form.Label htmlFor="guestFullName" className="hotel-color">
										성명
									</Form.Label>
									<FormControl
										required
										type="text"
										id="guestFullName"
										name="guestFullName"
										value={booking.guestFullName}
										placeholder="Enter your fullname"
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										성명을 입력하세요.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="guestEmail" className="hotel-color">
										Email
									</Form.Label>
									<FormControl
										required
										type="email"
										id="guestEmail"
										name="guestEmail"
										value={booking.guestEmail}
										placeholder="Enter your email"
										onChange={handleInputChange}
										// disabled
									/>
									<Form.Control.Feedback type="invalid">
										유효한 이메일을 입력하세요.
									</Form.Control.Feedback>
								</Form.Group>

								<fieldset style={{ border: "2px" }}>
									<legend>Lodging Period</legend>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="checkInDate" className="hotel-color">
												Check-in date
											</Form.Label>
											<FormControl
												required
												type="date"
												id="checkInDate"
												name="checkInDate"
												value={booking.checkInDate}
												placeholder="check-in-date"
												min={moment().format("MMM Do, YYYY")}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												체크인 날짜를 선택하세요.
											</Form.Control.Feedback>
										</div>

										<div className="col-6">
											<Form.Label htmlFor="checkOutDate" className="hotel-color">
												Check-out date
											</Form.Label>
											<FormControl
												required
												type="date"
												id="checkOutDate"
												name="checkOutDate"
												value={booking.checkOutDate}
												placeholder="check-out-date"
												min={moment().format("MMM Do, YYYY")}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												체크아웃 날짜를 선택하세요.
											</Form.Control.Feedback>
										</div>
										{errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
									</div>
								</fieldset>

								<fieldset style={{ border: "2px" }}>
									<legend>Number of Guest</legend>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="numOfAdults" className="hotel-color">
												Adults
											</Form.Label>
											<FormControl
												required
												type="number"
												id="numOfAdults"
												name="numOfAdults"
												value={booking.numOfAdults}
												min={1}
												placeholder="0"
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												적어도 어른 1명을 선택하세요.
											</Form.Control.Feedback>
										</div>
										<div className="col-6">
											<Form.Label htmlFor="numOfChildren" className="hotel-color">
												Children
											</Form.Label>
											<FormControl
												required
												type="number"
												id="numOfChildren"
												name="numOfChildren"
												value={booking.numOfChildren}
												placeholder="0"
												min={0}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												아이가 없다면 0을 입력하세요.
											</Form.Control.Feedback>
										</div>
									</div>
								</fieldset>

								<div className="fom-group mt-2 mb-2">
									<Button type="submit" className="btn btn-hotel">
										Continue
									</Button>
								</div>
							</Form>
						</div>
					</div>

					<div className="col-md-4">
						{isSubmitted && (
							<BookingSummary
								booking={booking}
								payment={calculatePayment()}
								onConfirm={handleFormSubmit}
								isFormValid={validated}
							/>
						)}
					</div>
				</div>
			</div>
		</>
    )
}

export default BookingForm