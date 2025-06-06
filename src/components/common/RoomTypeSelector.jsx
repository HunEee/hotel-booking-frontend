import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false)
    const[newRoomType, setNewRoomType] = useState("")
    
    useEffect(()=>{
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes,newRoomType])
            setNewRoomType("")
            setShowNewRoomTypesInput(false)
        }
    }


    return(
        <>
            {roomTypes.length > 0 &&(
                    <div>
                        <select
                            id="roomType"
                            name="roomType"
                            required
                            className="form-select"
                            value={newRoom.roomType}
                            onChange={(e)=>{
                                if(e.target.value === "Add New"){
                                    setShowNewRoomTypesInput(true)
                                }else{
                                    handleRoomInputChange(e)
                                }
                            }}
                        >
                            <option value={""}>select a room type</option>
                            <option value={"Add New"}>Add New</option>
                            {roomTypes.map((type,index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {showNewRoomTypeInput &&(
                            <div className="mt-2">
                                <div className="input-group">
                                    <input 
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter a new room type"
                                        value={newRoomType}
                                        onChange={handleNewRoomTypeInputChange}
                                    />
                                    <button className="btn btn-primary" type="button" onClick={handleAddNewRoomType}>
                                        Add
                                    </button>

                                </div>
                            </div>
                        )}

                    </div>
                
                
                )}

        </>
    )
}

export default RoomTypeSelector