import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import MainHeader from "../layout/MainHeader";
import RoomSearch from "../common/RoomSearch"
import { useLocation } from "react-router-dom"

const Home = () => {
    const location = useLocation()

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")

    return (
        <section>
            {message && <p className="text-warning px-5">{message}</p>}

			{currentUser && (
				<h6 className="text-success text-center"> {currentUser} 로그인 하셨습니다.</h6>
			)}

            <MainHeader />

            <section className="container">
                <RoomSearch />
                <RoomCarousel />
                <Parallax />
                <RoomCarousel />
                <HotelService />
                <Parallax />
                <RoomCarousel />

            </section>

        </section>
    )

}

export default Home