import { useState, useEffect } from "react"
import DateSlider from "../common/DateSlider"


const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {

    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

	const filterBookings = (startDate, endDate) => {
		let filtered = bookingInfo
		if (startDate && endDate) {
			filtered = bookingInfo.filter((booking) => {
				const checkIn = new Date(booking.checkInDate)
				const checkOut = new Date(booking.checkOutDate)

				if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) return false

				return checkIn >= startDate && checkOut <= endDate && checkOut > startDate
			})
		}
		setFilteredBookings(filtered);
	}


	useEffect(() => {
		setFilteredBookings(bookingInfo)
	}, [bookingInfo])

    return (
       		<section className="p-4">
			<DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr>
						<th>S/N</th>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Check-In Date</th>
						<th>Check-Out Date</th>
						<th>Guest Name</th>
						<th>Guest Email</th>
						<th>Adults</th>
						<th>Children</th>
						<th>Total Guest</th>
						<th>Confirmation Code</th>
						<th colSpan={2}>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{filteredBookings.map((booking, index) => (
						<tr key={booking.id}>
							<td>{index + 1}</td>
							<td>{booking.id}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{booking.checkInDate}</td>
							<td>{booking.checkOutDate}</td>
							<td>{booking.guestName}</td>
							<td>{booking.guestEmail}</td>
							<td>{booking.numOfAdults}</td>
							<td>{booking.numOfChildren}</td>
							<td>{booking.totalNumOfGuests}</td>
							<td>{booking.bookingConfirmationCode}</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleBookingCancellation(booking.id)}>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{filteredBookings.length === 0 && <p> No booking found for the selected dates</p>}
		</section>
    )
}

export default BookingsTable