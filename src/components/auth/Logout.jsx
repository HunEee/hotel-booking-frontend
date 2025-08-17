import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: " 로그아웃 되었습니다." } })
	}

	return (
		<>
			<li>
				<Link className="dropdown-item" to={"/profile"}>
					프로필
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="dropdown-item" onClick={handleLogout}>
				Logout
			</button>
		</>
	)
}

export default Logout