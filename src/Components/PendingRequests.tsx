import { RequestsType } from "./Requests";

interface PendingRequestsProps {
  isOpen: number | null;
  setIsOpen: (value: number | null) => void;
  requests: RequestsType[];
}

const PendingRequests: React.FC<PendingRequestsProps> = ({
  isOpen,
  setIsOpen,
  requests,
}) => {
  return (
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
                    className="dark:bg-stone-800 mt-3 p-2 shadow dark:shadow-cyan-500/50 shadow-gray-500/50 "
                  >
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
                        <button className="button-approve">Approve</button>
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
  );
};

export default PendingRequests;