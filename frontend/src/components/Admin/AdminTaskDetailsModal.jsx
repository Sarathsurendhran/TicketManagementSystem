import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import moment from "moment";
import toast from "react-hot-toast";

const AdminTicketDetailsModal = ({
  isOpen,
  ticketId,
  onClose,
  fetchTickets,
}) => {
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const fetchTicketDetails = async () => {
    if (ticketId) {
      setIsLoading(true);
      setError(false);
      try {
        const response = await axiosInstance.get(
          `ticket/get-ticket-details/${ticketId}/`
        );
        if (response.status === 200) {
          setTicket(response.data);
          setNewStatus(response.data.status);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fetch ticket details when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchTicketDetails();
    }
  }, [isOpen, ticketId]);

  const handleStatusChange = async () => {
    try {
      const response = await axiosInstance.patch(
        `admin-side/update-ticket-status/${ticketId}/`,
        { status: newStatus }
      );
      if (response.status === 200) {
        toast.success("Ticket status updated successfully!");
        setTicket(response.data);
        setIsChangingStatus(false);
        fetchTicketDetails();
        fetchTickets()
        onClose()
      } else {
        toast.error("Failed to update ticket status.");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error("An error occurred while updating the ticket status.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Ticket Details
        </h2>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <div>
            <p className="text-red-500">Failed to load ticket details.</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-2">
              <strong>Title:</strong> {ticket.title}
            </p>
            <p className="mb-2">
              <strong>Description:</strong>{" "}
              <span className="block max-h-[200px] overflow-y-auto p-2 border rounded bg-gray-100">
                {ticket.description}
              </span>
            </p>
            <p className="mb-2">
              <strong>Priority:</strong> {ticket.priority}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              {isChangingStatus ? (
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="p-2 border rounded w-full bg-gray-100"
                >
                  <option value="open">Open</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              ) : (
                <span className="text-blue-600 font-semibold">
                  {ticket.status}
                </span>
              )}
            </p>
            <p className="mb-2">
              <strong>Created At:</strong>{" "}
              {moment(ticket.created_at).format("YYYY-MM-DD HH:mm")}
            </p>
            <p className="mb-2">
              <strong>Username:</strong> {ticket.username}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {ticket.email}
            </p>
            <div className="flex justify-end mt-4 gap-2">
              {isChangingStatus ? (
                <button
                  onClick={handleStatusChange}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save Status
                </button>
              ) : (
                <button
                  onClick={() => setIsChangingStatus(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Change Status
                </button>
              )}
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTicketDetailsModal;
