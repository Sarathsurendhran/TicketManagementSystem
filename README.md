# Ticket Management System

The **Ticket Management System** is a full-stack application designed to manage support tickets efficiently. It includes a Django REST API backend and a React frontend for seamless ticket management.

---

## Features

### Backend (Django)
- **Ticket Operations**:
  1. **Create Tickets**: Users can create support tickets with fields like title, description, priority, and status.
  2. **Retrieve Tickets**: List all tickets with filters for status, priority, and user.
  3. **Update Tickets**: Modify ticket details, including status and reassignment.
  4. **Delete Tickets**: Remove tickets by their ID.
  5. **View Ticket Details**: Fetch details of a specific ticket.
- **Authentication and Permissions**:
  - Implemented using Django's built-in authentication system.
  - Users can view and edit their own tickets.
  - Administrators have full access.
- **Custom Pagination**: Configure page size and limits.

### Frontend (React)
- **Pages**:
  1. **Login Page**: User authentication interface.
  2. **Dashboard**: Display a list of tickets with filtering options. Includes a form for creating tickets.
  3. **Ticket Detail Page**: View details of a ticket and perform updates or deletion.
  4. **Admin Page**: Accessible to administrators for managing all tickets.
- **Responsive Design**:
  - Styled  Tailwind CSS for a professional look.
- **Error Handling**:
  - Clear feedback for API errors and invalid inputs.
- **Loading Indicators**:
  - Smooth user experience during API calls.

---

## Installation

### Prerequisites
- Python 3.10+
- Node.js and npm
- Django 5.0+
- React 18

### Steps

#### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/Sarathsurendhran/TicketManagementSystem.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```
6. Run the server:
   ```bash
   python manage.py runserver
   ```

#### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Create a `.env` file and add the following content:
   ```env
   VITE_API_URL="http://127.0.0.1:8000/"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the React development server:
   ```bash
   npm run dev
   ```

## Contact

For inquiries or support, contact https://www.linkedin.com/in/sarath-s-834053249.

