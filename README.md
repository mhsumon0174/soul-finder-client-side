# SoulFinder - Matrimony Platform

Live Site: [https://assignment-12-cb010.web.app/](https://assignment-12-cb010.web.app/)


---

## Website Features

1. Authentication System  
   - Login/Register via Email/Password and Google  
   - JSON Web Token (JWT) based secure route protection

2. Dynamic Biodata Management  
   - Create, view, and edit detailed personal biodata  
   - Users can view others’ biodatas with filtered access

3. Premium Biodata Request  
   - Users can request to make their biodata premium  
   - Admin approves premium requests

4. Contact Information Request  
   - Authenticated users can request contact info of others via Stripe payment  
   - Admin approves the request before contact info is shared

5. Admin Dashboard  
   - Full control over biodatas, users, requests, and analytics  
   - Pie chart visualizations for analytics

6. Filtering & Pagination  
   - Filter biodatas by age, gender, division, and more  
   - Smooth pagination for efficient browsing

7. Got Married Success Stories  
   - Users can submit their successful matches  
   

8. Favorite System  
   - Logged-in users can mark biodatas as favorite  
   - Favorites biodatas are displayed on users Dashboard 

9. Fully Responsive Design  
   - Optimized for mobile, tablet, and desktop devices

10. Fast & Secure  
    - Built with performance and security best practices in mind

---

## Tech Stack

- Frontend: React, Tailwind CSS, ShadCN UI, TanStack Query, React Router  
- Backend: Node.js, Express.js, MongoDB  
- Authentication: Firebase Auth + JWT  
- Payment: Stripe  
- Charts: Recharts

{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router": "^7.6.0",
  "firebase": "^11.8.0",
  "tailwindcss": "^4.1.7",
  "daisyui": "^5.0.35",
  "sweetalert2": "^11.6.13",
  "react-icons": "^5.5.0",
  "react-simple-typewriter": "^5.0.1",
  "react-tooltip": "^5.28.1",
  "@tailwindcss/vite": "^4.1.7",
  "vite": "^6.3.5",
  "express": "^5.1.0",
  "mongodb": "^6.16.0",
  "cors": "^2.8.5",
  "dotenv": "^16.5.0"
}


## Installation and Running Locally
Clone the repository from GitHub to your local machine.

Navigate to the frontend directory.

1. Install all frontend dependencies.

2. Start the frontend development server.

3. Open your browser and visit http://localhost:5173 (default Vite port).

4. Open a new terminal window or tab, then navigate to the backend directory named assignment-10-server.

5. Install all backend dependencies.

6. Create a .env file in the backend directory and add your environment variables, for example:

MONGODB_URI=your_mongodb_connection_string

7. Start the backend server.



---

Built with love for Matrimony Matching.
