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