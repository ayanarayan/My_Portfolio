import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer Intern</h4>
                <h5>Nepbyte</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed responsive web applications using React, Node.js, and Express. Designed and optimized RESTful APIs, improving data retrieval speed by 20%, and integrated MySQL & MongoDB databases.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>Vellore Institute of Technology</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Current CGPA: 7.74. Relevant Coursework: Data Structures and Algorithms, Object Oriented Programming, Computer Networks, DBMS. Final year student.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
