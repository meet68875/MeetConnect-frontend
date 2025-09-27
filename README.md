<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MeetConnect - README</title>
</head>
<body>
  <h1>MeetConnect - Project Description</h1>

  <p>
    MeetConnect is an innovative platform designed to streamline and enhance the process of interview scheduling,
    preparation, and tracking. With a focus on simplicity and user-friendliness, MeetConnect offers a seamless
    experience for users to connect, practice, and prepare for their professional journeys.
  </p>

  <h2>Core Features</h2>
  <ol>
    <li>
      <strong>User Authentication</strong>
      <ul>
        <li>Secure and personalized login and signup experience using JWT authentication.</li>
        <li>Allows users to easily create, access, and manage their accounts.</li>
      </ul>
    </li>
    <li>
      <strong>User Dashboard</strong>
      <ul>
        <li>Personalized dashboard showing upcoming interviews, insights, and key features.</li>
      </ul>
    </li>
    <li>
      <strong>Interview Scheduling</strong>
      <ul>
        <li>Schedule, track, and manage interviews in one centralized place.</li>
      </ul>
    </li>
    <li>
      <strong>Interview Preparation</strong>
      <ul>
        <li>Access practice questions and resources tailored to specific interview types or job roles.</li>
      </ul>
    </li>
    <li>
      <strong>Profile Management</strong>
      <ul>
        <li>Update and manage personal information, settings, and preferences.</li>
      </ul>
    </li>
    <li>
      <strong>About Us Page</strong>
      <ul>
        <li>Learn about MeetConnect’s mission, vision, and how it empowers users to succeed.</li>
      </ul>
    </li>
  </ol>

  <h2>Technology Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> React.js with Vite for fast builds and TailwindCSS for styling.</li>
    <li><strong>Backend (Services):</strong> Integrated APIs for authentication, interview scheduling, and SEO.</li>
    <li><strong>SEO Optimization:</strong> Dynamic titles and descriptions on all major pages.</li>
  </ul>

  <h2>Key Benefits</h2>
  <ul>
    <li><strong>Simplified Interview Process:</strong> Organized tracking and practice questions.</li>
    <li><strong>User-Friendly Interface:</strong> Smooth and intuitive with modern tools.</li>
    <li><strong>Customizable Profile:</strong> Easy management of personal details and preferences.</li>
  </ul>

  <h2>Future Development Plans</h2>
  <ul>
    <li>Real-Time Interview Scheduling with calendar API integration.</li>
    <li>Video Interview Integration for remote interviews on the platform.</li>
  </ul>

  <h2>SEO Metadata for Key Pages</h2>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr style="background-color: #2563eb; color: white;">
        <th>Page</th>
        <th>Title</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Login</td>
        <td>Login - MeetConnect</td>
        <td>Login to your MeetConnect account securely and access your personalized dashboard.</td>
      </tr>
      <tr>
        <td>Signup</td>
        <td>Signup - MeetConnect</td>
        <td>Create your free MeetConnect account to start connecting and exploring opportunities.</td>
      </tr>
      <tr>
        <td>Profile</td>
        <td>Profile - MeetConnect</td>
        <td>View and update your personal information, settings, and account details on MeetConnect.</td>
      </tr>
      <tr>
        <td>Dashboard</td>
        <td>Dashboard - MeetConnect</td>
        <td>Get an overview of your activities, insights, and quick access to key features on MeetConnect.</td>
      </tr>
      <tr>
        <td>About Us</td>
        <td>About Us - MeetConnect</td>
        <td>Learn more about MeetConnect, our mission, vision, and how we empower connections.</td>
      </tr>
      <tr>
        <td>My Interviews</td>
        <td>My Interviews - MeetConnect</td>
        <td>Track and manage all your interviews in one place with MeetConnect.</td>
      </tr>
    </tbody>
  </table>

  <h2>Folder Structure Breakdown</h2>
  <pre>
Frontend
├── public
│   ├── logo.svg
│   ├── logo1.svg
│   ├── vite.svg
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   └── layout
│   │       └── ui
│   │           ├── Button.jsx
│   │           ├── GlobalLoading.jsx
│   │           ├── Input.jsx
│   │       ├── AuthLayout.jsx
│   │       ├── Footer.jsx
│   │       ├── Layout.jsx
│   │       ├── Navbar.jsx
│   ├── constants
│   │   └── routes.js
│   ├── contexts
│   │   ├── AuthContext.jsx
│   │   ├── loadingContext.jsx
│   ├── data
│   │   └── questions.json
│   ├── pages
│   │   └── Auth
│   │       ├── Login.jsx
│   │       ├── Profile.jsx
│   │       ├── Signup.jsx
│   │   └── Dashboard
│   │       ├── index.jsx
│   │   ├── AboutPage.jsx
│   │   ├── MyInterviews.jsx
│   ├── routes
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── PublicRoute.jsx
│   ├── services
│   │   ├── apiClient.js
│   │   ├── authService.js
│   │   ├── interviewService.js
│   │   ├── SEO.js
│   ├── styles
│   │   ├── theme.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
  </pre>

  <h2>Setup and Installation</h2>

  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js (version 16.x or later)</li>
    <li>npm or yarn</li>
  </ul>

  <h3>Installation Steps</h3>
  <pre><code>
git clone &lt;repo-url&gt;
cd MeetConnect

npm install
# or if using yarn:
yarn install

npm run dev
# or if using yarn:
yarn dev
  </code></pre>

  <p>Open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a> to view the app.</p>

  <h2>Contribution Guidelines</h2>
  <p>We welcome contributions to MeetConnect! To get started:</p>
  <ul>
    <li>Fork the repository.</li>
    <li>Create a new feature branch.</li>
    <li>Make your changes and commit them.</li>
    <li>Open a pull request to the main branch.</li>
  </ul>
</body>
</html>
