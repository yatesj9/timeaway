import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { RequestsType } from "./Requests";
import ConfirmationModal from "./ConfirmationModal";
import DeleteModal from "./DeleteModal";

interface PendingRequestsProps {
  isOpen: number | null;
  setIsOpen: (value: number | null) => void;
  requests: RequestsType[];
  reload: () => void;
}

const PendingRequests: React.FC<PendingRequestsProps> = ({
  isOpen,
  setIsOpen,
  requests,
  reload,
}) => {
  useEffect(() => {
    setIsOpen(1);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );

  const openModal = (requestId: string) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const closeDelete = () => setDeleteModalOpen(false);

  const openDeleteModal = (requestId: string) => {
    setSelectedRequestId(requestId);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div className="w-full mx-auto">
        <div className="mb-4">
          <button
            onClick={() => setIsOpen(isOpen === 1 ? null : 1)}
            className="w-full text-left dark:shadow-md dark:shadow-cyan-500/50 shadow-md shadow-gray-500/50 dark:text-white text-black bg-stone-400 hover:bg-stone-300 dark:bg-stone-800 p-4 rounded-lg hover:dark:bg-stone-600 transition-colors"
          >
            PENDING - {requests.length}
          </button>
          {isOpen === 1 && (
            <div className="p-4 mt-1 dark:text-white text-black rounded-b">
              <div>
                <ul>
                  {requests.map((request) => (
                    <li
                      key={request._id.$oid}
                      className="dark:bg-stone-800 mt-3 p-2 shadow dark:shadow-cyan-500/50 shadow-gray-500/50 relative"
                    >
                      <button
                        onClick={() => openDeleteModal(request._id.$oid)}
                        className="absolute bottom-2 right-4 text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt size={20} />
                      </button>

                      <div className="grid grid-cols-6 gap-3">
                        <p>Name: {request.name}</p>
                        <p>Start Date: {request.start_date}</p>
                        <p>End Date: {request.end_date}</p>
                        <p>Start Time: {request.start_time}</p>
                        <p>End Time: {request.end_time}</p>
                        <p>Charge Against: {request.charge_against}</p>
                        <p className="col-start-5 pt-3 dark:text-rose-500 text-rose-500">
                          Status: {request.status}
                        </p>
                        <p>
                          <button
                            className="button-approve"
                            onClick={() => openModal(request._id.$oid)}
                          >
                            Approve Request
                          </button>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        selectedRequestId={selectedRequestId}
        reload={reload}
        status="Approved"
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        closeModal={closeDelete}
        selectedRequestId={selectedRequestId}
        reload={reload}
      />
    </>
  );
};

export default PendingRequests;
