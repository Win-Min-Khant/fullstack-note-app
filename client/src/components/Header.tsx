import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import type { RootState } from "../store"
import { useLogoutMutation } from "../slices/userApi";
import { clearUserInfo } from "../slices/auth";

function Header() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ logout, {isLoading} ] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout({});
      dispatch(clearUserInfo());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to={'/'} className="text-2xl font-bold text-gray-800">
          NoteApp
        </Link>
        
        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {userInfo ? <>
            <Link to={'/profile'} className="bg-yellow-500 cursor-pointer hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Profile
          </Link>
            <button disabled={isLoading} onClick={logoutHandler} className="bg-red-500 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
          </> : <>
            <Link to={'/register'} className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </Link>
          <Link to={'/login'} className="bg-green-500 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
          </>}
          
        </div>
      </div>
    </header>
  )
}

export default Header
