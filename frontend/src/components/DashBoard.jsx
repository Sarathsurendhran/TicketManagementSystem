import { useState } from "react";
import Header from "./Header";
import {
  FaSearch,
  FaPlus,
  FaTimes,
  FaSignOutAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import CreateTicketModal from "./CreateTicketModal";

const TicketManagement = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Server Down Issue",
      description: "Main production server is not responding",
      priority: "High",
      status: "Open",
      createdDate: "2024-01-20",
    },
    {
      id: 2,
      title: "UI Bug in Dashboard",
      description: "Charts not rendering properly in Firefox",
      priority: "Medium",
      status: "In-Progress",
      createdDate: "2024-01-19",
    },
    {
      id: 3,
      title: "Update Documentation",
      description: "Need to update API documentation",
      priority: "Low",
      status: "Resolved",
      createdDate: "2024-01-18",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });
  const [errors, setErrors] = useState({});

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;
    const matchesSearch = ticket.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleCreateTicket = () => {
    const newErrors = {};
    if (!newTicket.title) newErrors.title = "Title is required";
    if (!newTicket.description)
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const ticket = {
      id: tickets.length + 1,
      ...newTicket,
      status: "Open",
      createdDate: new Date().toISOString().split("T")[0],
    };

    setTickets([...tickets, ticket]);
    setShowCreateModal(false);
    setNewTicket({ title: "", description: "", priority: "Medium" });
    setErrors({});
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-destructive";
      case "Medium":
        return "text-chart-3";
      case "Low":
        return "text-chart-2";
      default:
        return "text-accent";
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-full bg-gray-50 p-6">
        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-6 ">
          <div className="flex-1 min-w-[200px]">
            <div className="relative ">
              <FaSearch className=" absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="bg-gray-50 w-full pl-10 pr-4 py-2 border-2 border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-ring bg-card text-body"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <select
            className=" bg-gray-50 border-2 px-4 py-2  border-input rounded-sm bg-card text-body focus:outline-none focus:ring-1 focus:ring-ring"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In-Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            className=" bg-gray-50 px-4 py-2 border-2  border-input rounded-sm bg-card text-body focus:outline-none focus:ring-1 focus:ring-ring"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <CreateTicketModal />
        </div>

        {/* Ticket List */}
        <div className="bg-card rounded-sm shadow-sm ">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-body font-body text-accent">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-body font-body text-accent">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-body font-body text-accent">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-body font-body text-accent">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-t border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setShowDetailModal(true);
                  }}
                >
                  <td className="px-6 py-4 text-body text-foreground">
                    {ticket.title}
                  </td>
                  <td
                    className={`px-6 py-4 text-body ${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority}
                  </td>
                  <td className="px-6 py-4 text-body text-foreground">
                    {ticket.status}
                  </td>
                  <td className="px-6 py-4 text-body text-foreground">
                    {ticket.createdDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Ticket Modal */}

        {/* Ticket Detail Modal */}
        {showDetailModal && selectedTicket && (
          <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-sm w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-heading font-heading text-foreground">
                  Ticket Details
                </h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-accent hover:text-destructive transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-body font-body text-accent">Title</h3>
                  <p className="text-body text-foreground">
                    {selectedTicket.title}
                  </p>
                </div>
                <div>
                  <h3 className="text-body font-body text-accent">
                    Description
                  </h3>
                  <p className="text-body text-foreground">
                    {selectedTicket.description}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <h3 className="text-body font-body text-accent">
                      Priority
                    </h3>
                    <p
                      className={`text-body ${getPriorityColor(
                        selectedTicket.priority
                      )}`}
                    >
                      {selectedTicket.priority}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-body font-body text-accent">Status</h3>
                    <p className="text-body text-foreground">
                      {selectedTicket.status}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-body font-body text-accent">
                      Created Date
                    </h3>
                    <p className="text-body text-foreground">
                      {selectedTicket.createdDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 text-body text-accent hover:text-primary transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketManagement;
