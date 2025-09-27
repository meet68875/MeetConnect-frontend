// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} MeetConnect. All rights reserved.
        <div className="mt-2">
          Built with ❤️ by the MeetConnect Team.
        </div>
      </div>
    </footer>
  );
}
