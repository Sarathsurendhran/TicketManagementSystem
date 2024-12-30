import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { FaSearch, FaPlus } from "react-icons/fa";
import axiosInstance from "../../utils/axiosConfig";
import moment from "moment";
import AdminTicketDetailsModal from "./AdminTaskDetailsModal";

const AdminTicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);


  // Fetch tickets data
  const fetchTickets = async (url = "admin-side/get-tickets/") => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        console.log("response.data", response.data)
        setTickets(response.data.results);
        setPagination({
          next: response.data.next,
          previous: response.data.previous,
        });
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(tickets)

  // Initial fetch
  useEffect(() => {
    fetchTickets();
  }, []);

  // Handle next and previous page navigation
  const handleNextPage = () => {
    if (pagination.next) fetchTickets(pagination.next);
  };

  const handlePreviousPage = () => {
    if (pagination.previous) fetchTickets(pagination.previous);
  };

  // Filter tickets
  // const filteredTickets = tickets.filter((ticket) => {
  //   const matchesStatus =
  //     statusFilter === "All" || ticket.status === statusFilter;
  //   const matchesPriority =
  //     priorityFilter === "All" || ticket.priority === priorityFilter;
  //   const matchesSearch = ticket.title
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());
  //   return matchesStatus && matchesPriority && matchesSearch;
  // });

  const filteredTickets = Array.isArray(tickets)
    ? tickets.filter((ticket) => {
        const matchesStatus =
          statusFilter === "All" || ticket.status === statusFilter;
        const matchesPriority =
          priorityFilter === "All" || ticket.priority === priorityFilter;
        const matchesSearch = ticket.title
          ? ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
          : false;
        return matchesStatus && matchesPriority && matchesSearch;
      })
    : [];

  // Priority color helper
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  // Open modal with ticket ID
  const openDetailsModal = (ticketId) => {
    setSelectedTicketId(ticketId);
    setIsDetailsModalOpen(true);
  };

  // Close modal
  const closeDetailsModal = () => {
    setSelectedTicketId(null);
    setIsDetailsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-full bg-gray-50 p-6">
        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <select
            className="border px-4 py-2 rounded focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            className="border px-4 py-2 rounded focus:outline-none"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Ticket List */}
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredTickets.length > 0 ? (
          <div className="bg-white rounded shadow">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left">No</th>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Priority</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Created At</th>
                  <th className="px-6 py-3 text-left">Username</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-t">
                    <td className="px-6 py-4">{ticket.id}</td>
                    <td className="px-6 py-4">{ticket.title}</td>
                    <td
                      className={`px-6 py-4 ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </td>
                    <td className="px-6 py-4">{ticket.status}</td>
                    <td className="px-6 py-4">
                      {moment(ticket.created_at).format("YYYY-MM-DD HH:mm")}
                    </td>
                    <td className="px-6 py-4">{ticket.username}</td>
                    <td className="px-6 py-4">{ticket.email}</td>
                    <td className="px-6 py-4">
                      {" "}
                      <button
                        onClick={() => openDetailsModal(ticket.id)}
                        className="p-1 bg-blue-500 text-white rounded"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No tickets found.</p>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={!pagination.previous}
            className={`px-4 py-2 rounded ${
              !pagination.previous ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!pagination.next}
            className={`px-4 py-2 rounded ${
              !pagination.next ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Ticket Details Modal */}
      <AdminTicketDetailsModal
        fetchTickets={fetchTickets}
        isOpen={isDetailsModalOpen}
        ticketId={selectedTicketId}
        onClose={closeDetailsModal}
      />
    </>
  );
};

export default AdminTicketManagement;
