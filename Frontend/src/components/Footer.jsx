import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import ReviewSection from "./ReviewSection";


export default function Footer() {
    
    return (
        <footer className="py-10 mt-12 bg-gray-900 text-gray-200">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* About Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">About Me</h3>
                    <p className="text-sm opacity-80">
                        Hi, I’m Somesh Gorai, a full-stack developer passionate about building real-time web apps and open-source projects. Let’s connect!
                    </p>
                </div>

                {/* Social Accounts */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Me</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="https://github.com/someshgorai" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={24} className="hover:text-blue-400 transition" />
                        </a>
                        <a href="https://www.linkedin.com/in/somesh-gorai-297b69284/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={24} className="hover:text-blue-400 transition" />
                        </a>
                        <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={24} className="hover:text-blue-400 transition" />
                        </a>
                    </div>
                </div>
                

                {/* Review Section */}
                <ReviewSection />
                
            </div>
            <div className="text-center text-sm mt-6 opacity-70">
                &copy; {new Date().getFullYear()} Somesh Gorai. All rights reserved.
            </div>
        </footer>
    );
}
