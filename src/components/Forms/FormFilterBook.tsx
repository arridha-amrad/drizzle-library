import Form from "next/form";

export default function FormFilterBook() {
  return (
    <Form className="flex flex-col gap-3 w-full" action="">
      <input
        name="title"
        type="text"
        placeholder="Title"
        className="input input-neutral w-full"
      />
      <input
        name="author"
        type="text"
        placeholder="Author"
        className="input input-neutral w-full"
      />
      <input
        name="categories"
        type="text"
        placeholder="Categories"
        className="input input-neutral w-full"
      />
      <div className="w-max mr-0 space-x-3 self-end">
        <button className="btn btn-soft btn-primary">Filter Books</button>
      </div>
    </Form>
  );
}
