import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaExclamationTriangle, FaPlus } from "react-icons/fa";


const CreateTicketModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
    setNewTicket({ title: "", description: "", priority: "low" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!newTicket.title) newErrors.title = "Title is required";
    if (!newTicket.description)
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await 
a
    } catch (error) {
      
    }

    closeModal();
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
      >
        <FaPlus /> Create Ticket
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-accent hover:text-destructive"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-heading font-heading mb-6 text-lg font-bold text-card-foreground">
              Create New Ticket
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-body font-body text-card-foreground mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTicket.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.title ? "border-destructive" : "border-input"
                  }`}
                />
                {errors.title && (
                  <div className="flex items-center text-red-700 mt-1 text-destructive text-sm">
                    <FaExclamationTriangle className="mr-1" />
                    <span>{errors.title}</span>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-body font-body text-card-foreground mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newTicket.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.description ? "border-destructive" : "border-input"
                  }`}
                />
                {errors.description && (
                  <div className="flex items-center mt-1 text-red-700 text-destructive text-sm">
                    <FaExclamationTriangle className="mr-1" />
                    <span>{errors.description}</span>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block text-body font-body text-card-foreground mb-1"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={newTicket.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity duration-200"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTicketModal;
