import RegisterForm from "@/components/RegisterUserForm";

export default function Page() {
  return (
    <dialog id="add-user-modal" className="modal modal-open">
      <RegisterForm />
    </dialog>
  );
}
