import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import Home from "./components/home/Home"
import AddRoom from './components/room/AddRoom'
import ExistingRooms from "./components/room/ExistingRooms"
import EditRoom from "./components/room/EditRoom"
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import Footer from "./components/layout/Footer"
import NavBar from "./components/layout/NavBar"
import RoomListing from "./components/room/RoomListing"
import Admin from "./components/adimin/Admin"
import Checkout from "./components/booking/Checkout"
import BookingSuccess from "./components/booking/BookingSuccess"
import Bookings from "./components/booking/Bookings"
import FindBooking from "./components/booking/FindBooking"
import Login from "./components/auth/Login"
import Registeration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import Logout from "./components/auth/Logout"


function App() {
  return (
    <>
    <main>
      <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/book-room/:roomId" element={<Checkout />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking-success" element ={<BookingSuccess />} />
            <Route path="/existing-bookings" element ={<Bookings />} />
            <Route path="/find-booking" element ={<FindBooking />} />

            <Route path="/login" element ={<Login />} />
            <Route path="/register" element ={<Registeration />} />
            <Route path="/profile" element ={<Profile />} />
            <Route path="/logout" element ={<Logout />} />

          </Routes>
      </Router>
      <Footer />
    </main>
    </>
  )
}

export default App
