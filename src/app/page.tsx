export default function Page() {
  return (
    <main className="flex p-4 flex-col items-center min-h-screen">
      <div className="py-10">
        <h1 className="text-4xl font-bold tracking-tighter">
          Welcome to Drizzle Library
        </h1>
      </div>
      <div className="w-full max-w-lg flex-1">
        <div className="collapse collapse-arrow border border-neutral">
          <input type="radio" name="my-accordion-1" defaultChecked />
          <div className="collapse-title font-semibold">
            What is this app about?
          </div>
          <div className="collapse-content  text-sm">
            A full-featured library management system that allows administrators
            to manage books and users efficiently. Built to streamline library
            operations with automated fine calculations and transparent
            reporting.
          </div>
        </div>
        <div className="collapse collapse-arrow border border-neutral">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title font-semibold">
            What features are included?
          </div>
          <div className="collapse-content  text-sm space-y-4">
            <p>
              ✅ CRUD Books --Add, edit, delete, and view all books in the
              library.
            </p>
            <p>
              ✅ CRUD Users --Manage library members with full control over
              their data.
            </p>
            <p>
              ✅ Borrowing System --Books can be borrowed for up to 10 days. A
              user may borrow a maximum of 4 books at a time and cannot borrow
              multiple copies of the same title simultaneously.
            </p>
            <p>
              ⚠️ Late Return Fine --Users will be fined Rp1,000 per day for
              returns made after 10 days.
            </p>
            <p>
              💰 Fine Accumulation --All fines are automatically added to the
              library&apos;s total balance.
            </p>
            <p>
              📊 Dashboard --Overview of current loans, due dates, and financial
              balance.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow border border-neutral">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title font-semibold">
            What tech stacks are used?
          </div>
          <div className="collapse-content  text-sm space-y-4">
            <p>
              ✅ Frontend/Backend : <span className="font-bold">NextJs</span>
            </p>
            <p>
              ✅ Database : <span className="font-bold">PostgreSQL</span>
            </p>
            <p>
              ✅ ORM : <span className="font-bold">Drizzle</span>
            </p>
            <p>
              ✅ Styling components : <span>Tailwind CSS and DaisyUI</span>
            </p>
          </div>
        </div>
      </div>
      <footer className="text-sm">
        &copy; {new Date().getFullYear()} Drizzle Library from Arridha Amrad
      </footer>
    </main>
  );
}
