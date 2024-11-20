import { useState } from "react";
import DatePicker from "react-datepicker";
import { url } from "../App";

import "react-datepicker/dist/react-datepicker.css";

interface RequestModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleReloadRequests: () => void;
}

interface localRequest {
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

function format_time(date: Date | null) {
  const hours = date ? date.getHours() : 0;
  const minutes = date ? date.getMinutes() : 0;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function format_date(date: Date | null) {
  const month = date ? date.getMonth() : 0;
  const day = date ? date.getDay() : 0;
  const year = date ? date.getFullYear() : 0;
  return `${month}/${day}/${year}`;
}

const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  closeModal,
  handleReloadRequests,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());

  const [requestData, setRequestData] = useState<localRequest>({
    name: "",
    email: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    charge_against: "",
    manager: "",
    status: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formatTime = format_time(startTime);
    const formatEndTime = format_time(endTime);
    const formatStartDate = format_date(startDate);
    const formatEndDate = format_date(endDate);

    setRequestData({
      ...requestData,
      [name]: value,
      start_date: formatStartDate,
      end_date: formatEndDate,
      start_time: formatTime,
      end_time: formatEndTime,
      status: "Pending",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(url.api + "requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} = ${errorBody}`,
        );
      }

      handleReloadRequests();

      setRequestData({
        name: "",
        email: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        charge_against: "",
        manager: "",
        status: "",
      });

      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed flex inset-0 bg-gray-600 bg-opacity-50 justify-center items-center z-50">
        <div className="dark:bg-gray-500 bg-white p-6 rounded shadow-lg w-3/5">
          <h1 className="text-black">New Request Modal</h1>
          <div className="container grid grid-cols-2">
            <p className="dark:text-white text-black">
              Name:
              <input
                className="p-2 mr-2 w-full border-2 dark:text-black border-gray-300 shadow-lg rounded-lg forus:outline-none focus:border-blue-500"
                name="name"
                onChange={handleChange}
                value={requestData.name}
                type="text"
                placeholder="Full Name"
              />
            </p>
            <p className="dark:text-white text-black">
              Email:
              <input
                className="p-2 ml-2 w-full border-2 dark:text-black border-gray-300 shadow-lg rounded-lg forus:outline-none focus:border-blue-500"
                name="email"
                onChange={handleChange}
                value={requestData.email}
                type="text"
                placeholder="Email"
              />
            </p>
            <div className="pt-3 dark:text-white text-black">
              Start Date:
              <DatePicker
                className="ml-4 dark:text-black bg-gray-300"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="pt-3 dark:text-white text-black">
              End Date:
              <DatePicker
                className="ml-4 dark:text-black bg-gray-300"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="pt-3 dark:text-white text-black">
              Start Time:
              <DatePicker
                className="ml-4 dark:text-black bg-gray-300"
                showTimeSelect
                showTimeSelectOnly
                dateFormat="p"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
              />
            </div>
            <div className="pt-3 dark:text-white text-black">
              End Time:
              <DatePicker
                className="ml-4 dark:text-black bg-gray-300"
                showTimeSelect
                showTimeSelectOnly
                dateFormat="p"
                selected={endTime}
                onChange={(date) => setEndTime(date)}
              />
            </div>
            <p className="dark:text-white text-black">
              Charge Against:
              <input
                className="p-2 mr-2 w-full border-2 dark:text-black border-gray-300 shadow-lg rounded-lg forus:outline-none focus:border-blue-500"
                name="charge_against"
                value={requestData.charge_against}
                onChange={handleChange}
                type="text"
                placeholder="Charge Against"
              />
            </p>
            <p className="dark:text-white text-black">
              Manager:
              <input
                className="p-2 ml-2 w-full border-2 dark:text-black border-gray-300 shadow-lg rounded-lg forus:outline-none focus:border-blue-500"
                name="manager"
                value={requestData.manager}
                onChange={handleChange}
                type="text"
                placeholder="Manager"
              />
            </p>
            <button
              className="button-cyan mr-4 mt-4 flex justify-center items-center"
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
              </svg>{" "}
            </button>
            <button
              type="submit"
              className="button-cyan mt-4 flex justify-center items-center"
            >
              <span className="mr-2">SAVE</span>
              <svg
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="2em"
                focusable="false"
                className="ml-2"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2" />
                  <path d="M17 21v-8H7v8M7 3v5h8" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RequestModal;
