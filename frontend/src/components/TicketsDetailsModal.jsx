import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import moment from "moment";
import toast from "react-hot-toast";

const TicketDetailsModal = ({ isOpen, ticketId, onClose, fetchTickets }) => {
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    priority: "",
  });

  // Fetch ticket details when the modal opens
  useEffect(() => {
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
            setFormValues({
              status: response.data.status,
              title: response.data.title,
              description: response.data.description,
              priority: response.data.priority,
            });
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

    if (isOpen) {
      fetchTicketDetails();
    }
  }, [isOpen, ticketId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleUpdate = async () => {
    const { status, ...updatedPayload } = formValues;
    if (
      !updatedPayload.title ||
      !updatedPayload.description ||
      !updatedPayload.priority
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `ticket/update-ticket/${ticketId}/`,
        updatedPayload
      );
      if (response.status === 200) {
        toast.success("Ticket updated successfully!");
        setTicket(response.data);
        setIsEditing(false);
        fetchTickets()
      } else {
        toast.error("Failed to update ticket.");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("An error occurred while updating the ticket.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `ticket/delete-ticket/${ticketId}/`
      );
      if (response.status === 204) {
        toast.success("Ticket deleted successfully!");
        onClose();
        fetchTickets()
      } else {
        toast.error("Failed to delete ticket.");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error("An error occurred while deleting the ticket.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Ticket Details</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div>
            <p>Failed to load ticket details.</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {ticket.status === "pending" && isEditing ? (
              <>
                <label className="block mb-2">
                  <strong>Title:</strong>
                  <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleInputChange}
                    className="block w-full p-2 border rounded"
                  />
                </label>
                <label className="block mb-2">
                  <strong>Description:</strong>
                  <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    className="block w-full p-2 border rounded"
                    rows="4"
                  />
                </label>
                <label className="block mb-2">
                  <strong>Priority:</strong>
                  <select
                    name="priority"
                    value={formValues.priority}
                    onChange={handleInputChange}
                    className="block w-full p-2 border rounded"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
              </>
            ) : (
              <>
                <p>
                  <strong>Title:</strong> {ticket.title}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  <span className="block max-h-[200px] overflow-y-auto p-2 border rounded">
                    {ticket.description}
                  </span>
                </p>
                <p>
                  <strong>Priority:</strong> {ticket.priority}
                </p>
                <p>
                  <strong>Status:</strong> {ticket.status}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {moment(ticket.created_at).format("YYYY-MM-DD HH:mm")}
                </p>
              </>
            )}
            <div className="flex justify-end mt-4 gap-2">
              {ticket.status === "pending" && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              )}
              {ticket.status === "pending" && isEditing && (
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              )}
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded"
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

export default TicketDetailsModal;
