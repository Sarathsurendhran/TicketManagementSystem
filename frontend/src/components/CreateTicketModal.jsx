    {showCreateModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-sm w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-heading font-heading text-foreground">
                Create New Ticket
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setErrors({});
                }}
                className="text-accent hover:text-destructive transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-body text-foreground mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    errors.title ? "border-destructive" : "border-input"
                  } rounded-sm focus:outline-none focus:ring-1 focus:ring-ring`}
                  value={newTicket.title}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, title: e.target.value })
                  }
                />
                {errors.title && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <FaExclamationCircle /> {errors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-body text-foreground mb-1">
                  Description
                </label>
                <textarea
                  className={`w-full px-4 py-2 border ${
                    errors.description ? "border-destructive" : "border-input"
                  } rounded-sm focus:outline-none focus:ring-1 focus:ring-ring`}
                  rows="4"
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, description: e.target.value })
                  }
                />
                {errors.description && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <FaExclamationCircle /> {errors.description}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-body text-foreground mb-1">
                  Priority
                </label>
                <select
                  className="w-full px-4 py-2 border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  value={newTicket.priority}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, priority: e.target.value })
                  }
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setErrors({});
                }}
                className="px-4 py-2 text-body text-accent hover:text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTicket}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}
