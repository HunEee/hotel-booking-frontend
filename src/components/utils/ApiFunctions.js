import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:9192"
})

//DB에 객실 등록
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)

    if(response.status === 201){
        return true
    }else{
        return false
    }

}


// DB에서 객실타입을 불러옴
export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/room/types")
        
		return response.data
	} catch (error) {
		throw new Error("Error fetching room types")
	}
}

// DB에서 모든 객실을 불러옴
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}

// ID를 통해 객실 삭제
export async function deleteRoom(roomId){
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

// 객실 정보 수정
export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
	const response = await api.put(`/rooms/update/${roomId}`, formData)
	return response
}

// 객실 정보 가져옴
export async function getRoomById(roomId) {
	try {
		const result = await api.get(`/rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

// 예약관련 API
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}

// 모든 예약 조회 API
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings")
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

// 예약확인 코드 조회 API
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

//예약 취소 API
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}

// 이용가능한 방 조회 API
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}



