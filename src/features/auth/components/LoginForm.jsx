import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { login, getMe } from "../../../api/tantachordApi"
import LoginInput from "./LoginInput";



export default function LoginForm() {

  const { setUser } = useAuth()

  const [input, setInput] = useState({
    username: "",
    password: "",
  })

  const hdlChangeInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      // validation
      const rs = await login(input);
      localStorage.setItem('token', rs.data.token);
      const token = localStorage.getItem('token');
      const user = await getMe(token);
      setUser(user.data);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  
  return (
    <div>
      <form className="max-w-lg mx-auto  border-4 p-10 border-color-2 rounded-2xl" onSubmit={hdlSubmit}>
        <LoginInput 
        type="text"
        placeholder="Username"
        name="username"
        onChange={hdlChangeInput}
        value={input.username}
        />
        <LoginInput 
        type="password"
        placeholder="Password"
        name="password"
        onChange={hdlChangeInput}
        value={input.password}
        />

        <button type="submit"
          className="btn btn-circle px-5 mt-3 py-3 w-full bg-color-2 border-color-2 border text-gray-700 font-bold text-[18pt] text-center rounded-xl hover:bg-color-3 active:scale-95 transition duration-75'"
        >
          Login
        </button>
      </form>

    </div>
  );
}