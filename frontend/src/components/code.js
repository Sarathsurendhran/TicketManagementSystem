import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaTicketAlt } from "react-icons/fa";

const TicketManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState([
    { id: 1, title: "Server Down", priority: "High", status: "Open", assignee: "John Doe", created: "2024-01-15" },
    { id: 2, title: "UI Bug", priority: "Medium", status: "In Progress", assignee: "Jane Smith", created: "2024-01-14" },
    { id: 3, title: "Database Error", priority: "High", status: "Open", assignee: "Mike Johnson", created: "2024-01-13" },
    { id: 4, title: "Network Issue", priority: "Low", status: "Closed", assignee: "Sarah Wilson", created: "2024-01-12" },
    { id: 5, title: "Login Problem", priority: "Medium", status: "Open", assignee: "Tom Brown", created: "2024-01-11" },
    { id: 6, title: "API Integration", priority: "High", status: "In Progress", assignee: "Alice Cooper", created: "2024-01-10" },
    { id: 7, title: "Performance Issue", priority: "Medium", status: "Open", assignee: "Bob Martin", created: "2024-01-09" },
    { id: 8, title: "Security Patch", priority: "High", status: "Closed", assignee: "Eve Anderson", created: "2024-01-08" },
  ]);

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all">
          {children}
          <button
            onClick={onClose}
            className="mt-4 bg-destructive text-destructive-foreground px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-heading font-heading text-foreground flex items-center">
            <FaTicketAlt className="mr-3" /> Ticket Management
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center hover:bg-opacity-90 transition-colors"
            aria-label="Create new ticket"
          >
            <FaPlus className="mr-2" /> Create Ticket
          </button>
        </div>

        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-body font-body text-secondary-foreground">Title</th>
                  <th className="px-6 py-3 text-left text-body font-body text-secondary-foreground">Priority</th>
                  <th className="px-6 py-3 text-left text-body font-body text-secondary-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-body font-body text-secondary-foreground">Assignee</th>
                  <th className="px-6 py-3 text-left text-body font-body text-secondary-foreground">Created</th>
                  <th className="px-6 py-3 text-left text-body font-body text-secondary-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-border hover:bg-secondary/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-foreground">{ticket.title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${ticket.priority === "High" ? "bg-destructive text-destructive-foreground" : ticket.priority === "Medium" ? "bg-chart-4 text-foreground" : "bg-chart-2 text-foreground"}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${ticket.status === "Open" ? "bg-chart-3 text-foreground" : ticket.status === "In Progress" ? "bg-chart-4 text-foreground" : "bg-chart-2 text-foreground"}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground">{ticket.assignee}</td>
                    <td className="px-6 py-4 text-foreground">{ticket.created}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          className="text-primary hover:text-opacity-80 transition-colors"
                          aria-label="Edit ticket"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-destructive hover:text-opacity-80 transition-colors"
                          aria-label="Delete ticket"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex justify-between items-center bg-card border-t border-border">
            <div className="text-sm text-accent-foreground">
              Showing {indexOfFirstTicket + 1} to {Math.min(indexOfLastTicket, tickets.length)} of {tickets.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-secondary text-secondary-foreground disabled:opacity-50 hover:bg-opacity-80 transition-colors"
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
              <span className="px-4 py-2 rounded-md bg-primary text-primary-foreground">
                {currentPage}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-secondary text-secondary-foreground disabled:opacity-50 hover:bg-opacity-80 transition-colors"
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TicketManagement;