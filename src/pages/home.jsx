import useDocumentTitle from "../customHooks/documentTitle"
import { useNavigate,NavLink } from "react-router-dom";

export default function HomePage() {
    useDocumentTitle("Home");
     const navigate = useNavigate();
  return (
    <div className="bg-white text-black font-sans  w-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-black">
            <span className="text-[#FFB640]">Open</span>Voice
          </div>
          <NavLink
        to="/"
        className={({ isActive }) =>
          `text-black font-medium hover:text-[#FFB640] ${
            isActive ? "underline text-[#FFB640]" : ""
          }`
        }
      >
        Home
      </NavLink>
      <a
        href="#about"
        className="text-black font-medium hover:text-[#FFB640]"
      >
        About
      </a>
          <button 
          type="submit"
            onClick={() => navigate("/login")}
          className="bg-[#FFB640] text-white px-4 py-2 rounded hover:bg-black hover:text-white">
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#FFB640] text-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Voice. Our Mission.
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Trusted agencies ready to act. Submit complaints or feedback with ease.
          </p>
          <button
          type="submit" 
          className="bg-white text-[#FFB640] font-semibold px-6 py-3 rounded shadow hover:bg-black hover:text-white transition"
           onClick={() => navigate("/login")}>
            Submit a Complaint
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white text-black">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Why OpenVoice?</h2>
          <p className="text-lg mb-4">
            We connect citizens with government agencies to ensure quick and transparent resolution of complaints and feedback. Empower your community—one submission at a time.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-[#FFB640] text-4xl mb-4">📝</div>
              <h3 className="font-bold text-xl mb-2">Submit</h3>
              <p>Log your complaint or feedback using our simple form.</p>
            </div>
            <div>
              <div className="text-[#FFB640] text-4xl mb-4">📂</div>
              <h3 className="font-bold text-xl mb-2">Route</h3>
              <p>We categorize and forward it to the right agency.</p>
            </div>
            <div>
              <div className="text-[#FFB640] text-4xl mb-4">📊</div>
              <h3 className="font-bold text-xl mb-2">Track</h3>
              <p>Track status and receive updates until resolution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="mb-6">Join thousands of citizens improving public services.</p>
          <button 
           type="submit"
           className="bg-[#FFB640] text-black px-6 py-3 font-semibold rounded hover:bg-white hover:text-[#FFB640] transition"
           onClick={() => navigate("/signup")}>
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 border-t text-center text-sm text-gray-500">
        &copy; 2025 OpenVoice. All rights reserved.
      </footer>
    </div>
  );
};

