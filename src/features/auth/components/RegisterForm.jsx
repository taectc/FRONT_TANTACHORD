import { useState } from "react";
import { register } from '../../../api/tantachordApi'
import RegisterInput from "./RegisterInput";

export default function RegisterForm({ onSuccess }) {

    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const hdlChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const hdlSubmit = async (e) => {
        const { username, password, confirmPassword } = input;
        e.preventDefault();

        // Validation
        if (password !== confirmPassword) {
            return alert('Password does not match, please recheck');
        }

        try {
            await register({
                username: username,
                password: password
            });
            onSuccess();
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <div>
            <form className="max-h-lg mx-auto  border-4 p-10  border-color-2 rounded-2xl" onSubmit={hdlSubmit}>
                <RegisterInput
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={hdlChangeInput}
                    value={input.username}
                />
                <RegisterInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={hdlChangeInput}
                    value={input.password}
                />
                <RegisterInput
                    type="password"
                    placeholder="ConfirmPassword"
                    name="confirmPassword"
                    onChange={hdlChangeInput}
                    value={input.confirmPassword}
                />



                <button type="submit"

                    className="btn btn-circle px-5 mt-3 py-3 w-full bg-color-2 border-color-2 border text-gray-700 font-bold text-[18pt] text-center rounded-xl hover:bg-color-3 active:scale-95 transition duration-75'"

                >
                    Register
                </button>
            </form>
        </div>
    );
}