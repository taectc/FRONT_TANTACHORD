import {useState} from "react"
import Modal from "../../../components/Modal"
import LoginForm from "./LoginForm"

export default function LoginContainer() {
    const [open, setOpen] = useState(false);
  return (
    <div>
    <button
      className="px-5 text-red-400 hover:bg-color-1 py-2 transition-transform hover:scale-105 rounded-xl"
      onClick={() => setOpen(true)}
    >
      Login
    </button>
    <Modal title="Sign in" open={open} onClose={() => setOpen(false)}>
      <LoginForm onSuccess={() => setOpen(false)} />
    </Modal>
  </div>
  )
}
