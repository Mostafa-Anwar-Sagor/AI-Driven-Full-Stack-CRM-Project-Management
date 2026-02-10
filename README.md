# AI-Driven Full-Stack CRM Project Management

A powerful, AI-driven SaaS CRM and Project Management platform designed to streamline business operations, enhance team collaboration, and provide actionable insights through advanced analytics.

## 🚀 Features

- **AI-Powered Insights**: Get intelligent recommendations and analytics to drive decision-making.
- **Project Management**: Comprehensive tools for task tracking, sprints, and milestones.
- **CRM Integration**: Manage customer relationships, leads, and sales pipelines effectively.
- **Real-time Collaboration**: Team communication and updates in real-time.
- **Interactive Dashboards**: Visual data representation using Chart.js.
- **Secure & Scalable**: Built with a robust Django backend and modern React frontend.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern UI library for building interactive interfaces.
- **Vite**: Next-generation frontend tooling for fast builds.
- **Chart.js**: For dynamic data visualization.
- **Axios**: HTTP client for API communication.

### Backend
- **Python & Django**: High-level Python web framework for rapid development.
- **Celery & Redis**: Asynchronous task queue for background processing.
- **PostgreSQL**: Robust relational database management system.
- **Django REST Framework**: For building powerful Web APIs.

## 📸 Screenshots

<!-- Add your screenshots here -->
<div align="center">
  <img src="screenshots/dashboard.png" alt="Dashboard" width="800"/>
  <br/>
  <em>Dashboard View</em>
</div>

<br/>

<div align="center">
  <img src="screenshots/kanban.png" alt="Kanban Board" width="800"/>
  <br/>
  <em>Project Kanban Board</em>
</div>

## 🔧 Installation & Setup

### Prerequisites
- Node.js & npm
- Python 3.8+
- PostgreSQL
- Redis

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Mostafa-Anwar-Sagor/AI-Driven-Full-Stack-CRM-Project-Management.git
   cd AI-Driven-Full-Stack-CRM-Project-Management
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables (create a `.env` file).

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
