import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginContainer from "../features/auth/components/LoginContainer";
import RegisterContainer from "../features/auth/components/RegisterContainer";



export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-center w-full">

      <nav className="flex gap-3 justify-between p-5 bg-color-2 shadow-lg align-middle items-center px-5 mt-5 rounded-xl w-[60%] ]">

        <div className="flex gap-3 cursor-pointer" onClick={() => { navigate("/") }} >
          <div className=" h-14 w-14 ">
            <div className=" bg-[url('/src/assets/eye.png')] h-fit w-fit flex bg-cover bg-center ">
              <div className="flex-1 h-fit w-fit animate-spin">
                <img src="src/assets/reacticon.png" alt="" className="scale-50" />
              </div>
            </div>

          </div>
          <p className="w-[200px] text-color-4 text-[14pt] font-['Cairo', sans-serif] flex items-center">TANTACHORD</p>
        </div>



        <div className=" flex gap-3 font-bold ">

          {user ? (
            <>
              {user.isAdmin ?
                <NavLink className="navlink" to="/admin">
                  <p className="px-5 text-red-400 hover:bg-color-1 py-2 transition-transform hover:scale-105 rounded-xl">
                    Admin
                    </p>
                </NavLink>
                :
                ""
              }

              <NavLink className="navlink" to="/createplaylist">
                <p className="px-5 text-red-400 hover:bg-color-1 py-2 transition-transform hover:scale-105 rounded-xl" >
                  Add Song
                </p>
              </NavLink>
              <div className="navlink cursor-pointer px-5 text-red-400 hover:bg-color-1 py-2 transition-transform hover:scale-105 rounded-xl" onClick={() => {
                logout();
                navigate("/");
              }}>
                Logout
              </div>
            </>
          ) : (
            <>
              <LoginContainer />
              <RegisterContainer />
            </>
          )}

          <p className="px-5 text-gray-600 py-2 h-fill  border-l-2" >
            {user?.username || 'Guest'}
          </p>



        </div>

      </nav>
    </div>
  );
}
