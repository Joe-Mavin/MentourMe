# MentourMe

MentourMe is a modern mentorship and personal development platform designed to empower men to unlock their full potential. The platform connects users with mentors, provides interactive onboarding, and helps track personal growth in key life areas.

## Features
- **User Authentication:** Secure signup and login with JWT-based authentication.
- **Interactive Onboarding Bot:** Collects user goals, confidence levels, and social interests to personalize the experience.
- **Dashboard:** Personalized dashboard for users after onboarding.
- **Mentorship Matching:** (Planned) Connects users with mentors based on their goals and interests.
- **Responsive UI:** Built with React, Material UI, and Tailwind CSS for a modern, mobile-friendly experience.

## Tech Stack
- **Frontend:** React, Vite, Material UI, Tailwind CSS
- **Backend:** Node.js, Express, Sequelize, MariaDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Nginx (reverse proxy), supports both local and cloud deployment

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MariaDB or MySQL database
- (Optional) Nginx for production deployment

### Setup

#### 1. Clone the repository
```bash
git clone <your-repo-url>
cd MentourMe
```

#### 2. Backend Setup
```bash
cd Server
npm install
# Configure your .env file with DB credentials and SECRET_KEY
npm run dev
```

#### 3. Frontend Setup
```bash
cd ../Client
npm install
# For development:
npm run dev
# For production build:
npm run build
```

#### 4. Environment Variables
- **Frontend:** Set `VITE_API_BASE_URL` in `Client/.env` for API endpoint (e.g. `http://localhost:5001` for dev, or your production URL).
- **Backend:** Set DB credentials and `SECRET_KEY` in `Server/.env`.

#### 5. Production Deployment
- Build the frontend and serve it with Nginx or your preferred static server.
- Use Nginx to reverse proxy `/api` requests to your backend server.

## Folder Structure
```
MentourMe/
├── Client/   # React frontend
├── Server/   # Node/Express backend
├── README.md # Project documentation
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Contact
For questions or support, contact the project maintainer at [onyangojp77@gmail.com].  