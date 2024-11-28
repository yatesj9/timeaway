import { useState, useEffect } from "react";
import { url } from "../App";
import PendingRequests from "./PendingRequests";
import ProcessedRequests from "./ProcessedRequests";
import ApprovedRequests from "./ApprovedRequests";
import CompletedRequests from "./CompletedRequests";

interface RequestsProps {
  reloadRequests: boolean;
  handleReloadRequests: () => void; 
}

export interface RequestsType {
  _id: { $oid: string };
  name: string;
  email: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  charge_against: string;
  manager: string;
  status: string;
}

function filter_requests(requests: RequestsType[], request_filter: string) {
  return requests.filter((request) =>
    request.status.toLowerCase().includes(request_filter.toLowerCase()),
  );
}

const Requests: React.FC<RequestsProps> = ({ reloadRequests,handleReloadRequests }) => {
  const [open, setOpen] = useState<number | null>(null);
  const [requests, setRequests] = useState<RequestsType[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch(url.api + "requests");
      const data = await response.json();
      setRequests(data);
    };

    fetchRequests();
  }, [reloadRequests]);

  const filteredPending = filter_requests(requests, "pending");
  const filterApproved = filter_requests(requests, "approved");
  const filterProcessed = filter_requests(requests, "processed");
  const filterCompleted = filter_requests(requests, "completed");

  return (
    <div className="flex space-x-4 pt-4">
      <div className="flex-none basis-30 p-4"> </div>
      <div className="flex-grow p-4">
        <PendingRequests
          isOpen={open}
          setIsOpen={setOpen}
          requests={filteredPending}
          reload={handleReloadRequests}
        />
        <ApprovedRequests
          isOpen={open}
          setIsOpen={setOpen}
          requests={filterApproved}
          reload={handleReloadRequests}
        />
        <ProcessedRequests
          isOpen={open}
          setIsOpen={setOpen}
          requests={filterProcessed}
        />
        <CompletedRequests
          isOpen={open}
          setIsOpen={setOpen}
          requests={filterCompleted}
        />
      </div>
      <div className="flex-none basis-30 p-4"></div>
    </div>
  );
};

export default Requests;
