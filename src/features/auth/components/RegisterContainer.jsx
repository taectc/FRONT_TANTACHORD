import {useState} from "react"
import Modal from "../../../components/Modal"
import RegisterForm from "./RegisterForm";

export default function RegisterContainer() {
    const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="px-5 text-red-400 hover:bg-color-1 py-2 transition-transform hover:scale-105 rounded-xl"
        onClick={() => setOpen(true)}
      >
        Register
      </button>
      <Modal title="Sign up" open={open} onClose={() => setOpen(false)}>
        <RegisterForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  )
}
