# Wenknot Assignment - Event Management System

## Project Overview
The **Wenknot Assignment** is an event management system designed to handle the creation, management, and organization of events, tasks, and attendees. The backend is built using **Express.js** with **MongoDB** for database management, while the frontend leverages **React** to create a dynamic and interactive user interface for managing attendees and tasks.

### Technologies Used:
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Other**: Mongoose (for MongoDB interactions), React Popup (for managing tasks and attendees)

## Features
- **Event Management**: 
  - Users can create, update, delete, and view events.
  - Each event has associated details such as event name, description, date, time, and location.
  
- **Attendee Management**: 
  - Users can add, remove, and update attendees for each event.
  - Each attendee has details like name, contact information, and their role in the event.

- **Task Management**:
  - Users can create tasks related to specific events.
  - Each task includes a title, description, deadline, and a list of attendees assigned to the task.

- **User Interface**:
  - A React-based frontend with a **Popup component** that allows users to manage events, attendees, and tasks with ease.
  - Interactive forms to create and update event details, attendee information, and task lists.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Backend environment)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [MongoDB](https://www.mongodb.com/) (Database for storing event data)

### Installation Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/wenknot-assignment.git
    cd wenknot-assignment
    ```

2. **Backend Setup**:
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install the required backend dependencies:
     ```bash
     npm install
     ```
   - Set up a MongoDB database (either locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).
   - Update the MongoDB connection string in the `config.js` or environment variables.

3. **Frontend Setup**:
   - Navigate to the `frontend` directory:
     ```bash
     cd ../client
     ```
   - Install the required frontend dependencies:
     ```bash
     npm install
     ```

4. **Running the Backend**:
   - Start the backend server:
     ```bash
     cd backend
     npm run dev
     ```
   - The backend will be running on `http://localhost:5000`.

5. **Running the Frontend**:
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```
   - The frontend will be available at `http://localhost:3000`.

## Application Flow
1. **Backend**:
   - The backend handles API requests for managing events, attendees, and tasks. It communicates with the MongoDB database to fetch and store data.

2. **Frontend**:
   - The React-based frontend makes HTTP requests to the backend APIs to display and interact with event data. It allows users to add, update, and delete events, tasks, and attendees.

## API Endpoints

- `POST /api/events` - Create a new event
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event by ID
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

- `POST /api/attendees` - Add a new attendee
- `GET /api/attendees` - Get all attendees
- `GET /api/attendees/:id` - Get a specific attendee
- `PUT /api/attendees/:id` - Update attendee information
- `DELETE /api/attendees/:id` - Remove an attendee

- `POST /api/tasks` - Add a new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Remove a task

## Future Enhancements
- **Email Notifications**: Send notifications to attendees for upcoming events and task deadlines.

## Contributing
Contributions are welcome! If you want to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push the changes to your forked repository (`git push origin feature-branch`).
5. Create a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

