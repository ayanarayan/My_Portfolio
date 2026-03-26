import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  function getTranslateX() {
    const box = document.getElementsByClassName("work-box");
    if (!box.length) return 0;
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    return rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: () => `+=${getTranslateX()}`,
      scrub: true,
      pin: true,
      id: "work",
      invalidateOnRefresh: true,
    },
  });

  timeline.to(".work-flex", {
    x: () => -getTranslateX(),
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              name: "Expenzo",
              category: "Web Application",
              tools: "React.js, Express.js, Node.js, MongoDB",
              description: "A full-stack web-application for expense tracking, enabling secure authentication, CRUD operations, dynamic visualizations, and email notifications."
            },
            {
              name: "EaseMeet",
              category: "AI Chatbot",
              tools: "HTML, CSS, Python, AWS",
              description: "Deployed an AI-powered chatbot automating appointment management, reducing scheduling time by 70%, with secure session-based flow."
            },
            {
              name: "QuantumLend",
              category: "DeFi Web Application",
              tools: "Next.js, TypeScript, CSS, Solidity, Hardhat",
              description: "Created a full-stack DeFi app for secure P2P Ethereum loans, processing $500K+ in transactions, improving smart contract efficiency by 40%, and boosting engagement via responsive UI."
            },
            {
              name: "FitFlow",
              category: "AI Fitness Application",
              tools: "Python, Gradio, ReportLab, OpenAI API",
              description: "Developed an AI-powered fitness web app generating personalized adaptive diet and workout plans. Features automated PDF report generation and a real-time AI chatbot for workout guidance."
            }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <p style={{ marginTop: '10px', fontSize: '14px' }}>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
