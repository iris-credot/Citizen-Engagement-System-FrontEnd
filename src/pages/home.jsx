
import { useNavigate, NavLink } from "react-router-dom";
import Icon from '../assets/logo.png'
import useDocumentTitle from "../customHooks/documentTitle";
export default function HomePage() {
  useDocumentTitle("OpenVoice - Empower Your Voice");
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black font-sans w-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-1 py-4 flex justify-between items-center">
         
          <div className="text-2xl font-bold text-black flex gap-3 items-center justify-center">
          <div className="w-full bg-white h-2/4 flex justify-center items-center mt-2">
                      <img src={Icon} alt="Logo" className="h-12 w-auto" />
                    </div>
                    <span>
                   <span className="text-[#FFB640]">Open</span>Voice
                     </span>
          </div>
          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium hover:text-[#FFB640] ${
                  isActive ? "underline text-[#FFB640]" : "text-black"
                }`
              }
            >
              Home
            </NavLink>
            <a href="#about" className="text-black font-medium hover:text-[#FFB640]">
              About
            </a>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FFB640] text-white px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#FFB640] text-white py-24">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-6">Your Voice. Our Mission.</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            OpenVoice is your bridge to government and service agencies. Whether you're reporting an issue, submitting feedback, or simply raising awareness—your voice drives accountability and change.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-[#FFB640] font-semibold px-6 py-3 rounded shadow hover:bg-black hover:text-white transition duration-300"
          >
            Submit a Complaint
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white text-black">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Why OpenVoice?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Every citizen deserves to be heard. OpenVoice empowers communities by simplifying the way complaints and feedback are delivered to government agencies. We ensure your messages reach the right place—without delay, without confusion.
          </p>
          <p className="text-lg text-gray-700">
            With real-time updates and full transparency, OpenVoice builds trust between citizens and institutions. You’re not just filing a complaint—you’re making your community stronger, safer, and more accountable.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-14">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-[#FFB640] text-5xl mb-4">📝</div>
              <h3 className="font-bold text-xl mb-2">Submit</h3>
              <p className="text-gray-600">
                Use our intuitive form to describe the issue you’ve encountered—whether it’s a broken road, poor service, or community concern.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-[#FFB640] text-5xl mb-4">📂</div>
              <h3 className="font-bold text-xl mb-2">Route</h3>
              <p className="text-gray-600">
                Our system analyzes and forwards your submission to the relevant agency—ensuring it’s seen by the right people for faster response.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-[#FFB640] text-5xl mb-4">📊</div>
              <h3 className="font-bold text-xl mb-2">Track</h3>
              <p className="text-gray-600">
                Get real-time notifications and status updates as your complaint progresses—transparency from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Your Voice Has Power</h2>
          <p className="text-lg text-gray-700 mb-4">
            OpenVoice is more than a platform—it’s a movement. Citizens across the country are using their voices to spark real changes in infrastructure, service delivery, and public policy.
          </p>
          <p className="text-lg text-gray-700">
            Whether you're speaking up about public health, education, or transport—we're here to make sure it counts. One voice can make a difference. Thousands can change the system.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Take the first step toward better governance, cleaner communities, and stronger systems. Your feedback is the key to change.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#FFB640] text-black px-6 py-3 font-semibold rounded hover:bg-white hover:text-[#FFB640] transition duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 border-t text-center text-sm text-gray-500">
        &copy; 2025 OpenVoice. All rights reserved. Built for empowered citizens.
      </footer>
    </div>
  );
}
