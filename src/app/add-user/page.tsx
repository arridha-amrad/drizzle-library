import RegisterUserForm from "@/app/add-user/FormAddUser";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="p-8 border w-[400px] rounded-lg border-base-content/10">
        <RegisterUserForm />
      </div>
    </section>
  );
}
