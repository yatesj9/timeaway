import { url } from "../App";

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedRequestId: string | null;
  reload: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  closeModal,
  selectedRequestId,
  reload,
}) => {
  if (!isOpen) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(selectedRequestId);

    fetch(url.api + "requests/" + selectedRequestId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        reload();
        closeModal();
      })
      .catch((error) => console.log("Error", error));
  };

  return (
    <div className="fixed flex inset-0 bg-gray-600 bg-opacity-50 justify-center items-center z-50">
      <div className="dark:bg-gray-700 dark:text-white bg-white p-6 rounded-lg shadow-md dark:shadow-cyan-500/50 w-1/4">
        <div className="text-center m-3 text-2xl">
         Delete Request 
        </div>
        <form onSubmit={onSubmit}>
          <div className="container grid grid-cols-2">
            <button
              type="button"
              className="button-indigo-round mt-4 flex justify-center items-center"
              onClick={closeModal}
            >
              <span className="mr-2">CANCEL</span>
              <svg
                viewBox="0 0 840 1000"
                fill="currentColor"
                height="2em"
                width="2em"
              >
                <path d="M420 80c116 0 215 41 297 123s123 181 123 297-41 215-123 297-181 123-297 123-215-41-297-123S0 616 0 500s41-215 123-297S304 80 420 80m86 420l154-154-86-86-154 152-152-152-88 86 154 154-154 152 88 86 152-152 154 152 86-86-154-152" />
              </svg>
            </button>
            <button
              type="submit"
              className="button-confirm mt-4 flex justify-center items-center"
            >
              <span className="mr-2">CONFIRM</span>
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="2em"
                width="2em"
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
              </svg>{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
