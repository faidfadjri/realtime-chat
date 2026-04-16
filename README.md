# 💬 Real-Time Chatroom Challenge

A modern, real-time chat application built to demonstrate proficiency in full-stack web development. This project utilizes a **Ruby on Rails** backend with **ActionCable** for WebSockets, coupled with a highly responsive, modern **React** frontend leveraging **Inertia.js** and **Vite**.

## 🌟 Live Demo
**[Click here to view the live application!](#)**
*(Note: Be sure to update this hyperlink with your live domain once hosted!)*

## ✨ Features
- **Real-Time Messaging**: Lightning-fast message delivery using ActionCable WebSockets. Completely eliminates page refreshes.
- **Dynamic Channels**: Users can instantly create or join specific named rooms and chat strictly within those bounds.
- **Tasteful & Modern UI**: Built with a sleek glassmorphism aesthetic, smooth micro-animations, custom scrollbars, and intuitive layout leveraging pure custom CSS.
- **Modern JavaScript Frontend**: 100% built in React (TypeScript). Fast component re-renders avoiding messy standard ERB bindings by integrating Inertia.js.
- **User Experience**: Sent message bubbles autonomously align to the right side of the pane by identifying the unique sender signature reliably.

## 🛠️ Technology Stack
- **Backend:** Ruby on Rails
- **Frontend:** React.js (TypeScript) + Inertia.js
- **Tooling:** Vite
- **Database:** MySQL
- **Real-time Engine:** ActionCable (WebSockets)
- **Styling:** Custom Modular CSS (Glassmorphism & Deep Gradients)

## 🚀 Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- [Ruby](https://www.ruby-lang.org/en/)
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatroom
   ```

2. **Install Backend Dependencies**
   ```bash
   bundle install
   ```

3. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

4. **Setup the Database**
   Ensure your MySQL server is running, then populate your development database natively:
   ```bash
   rails db:create db:migrate
   ```
   *(Note: You can pass your local MySQL DB password dynamically via the `DB_PASSWORD` ENV variable).*

5. **Start the Development Servers**
   This application utilizes Vite for frontend asset compilation. You will need to start both processes:
   
   In terminal 1:
   ```bash
   npm run dev
   # or
   bin/vite dev
   ```
   
   In terminal 2:
   ```bash
   rails server
   ```

6. **View the Application**
   Open your browser and navigate to `http://localhost:3000`.

## 🧪 Unit Testing

To ensure robustness, functional, and unit test suites are highly recommended to trace connection errors for WebSocket delivery and standard model compliance.

**Run tests:**
```bash
bundle exec rspec 
```

## 🌐 Deployment Guidelines

This application can easily be deployed on a platform like **Render**, **Heroku**, or **Fly.io** satisfying the online hosting requirement. 

Ensure the following configurations are uniquely set on your production server:
1. `RAILS_MASTER_KEY` environment variable setup inside the platform's secret manager.
2. Target Database configurations (e.g., `DATABASE_URL` attaching PostgreSQL or production MySQL).
3. Whitelisted ActionCable origins. Set `config.action_cable.allowed_request_origins` inside `config/environments/production.rb` to match your exact live domain.
4. Execute `rails assets:precompile` during the build step orchestrations to natively compile Vite React assets into public domains.