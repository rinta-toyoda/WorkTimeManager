import Modal from "../Modal.tsx";

export default function NewTodo({
  onDone,
}: {
  onDone: (title: string) => void;
}) {
  return (
    <Modal title="New Todo" onClose={onDone}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const title = formData.get("title") as string;
          onDone(title);
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter new todo"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Add Todo
        </button>
      </form>
    </Modal>
  );
}
