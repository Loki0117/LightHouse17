document.addEventListener("DOMContentLoaded", function () {

    // =============================
    // DATA
    // =============================

    const services = [
        {
            icon: "📄",
            title: "Resume Review",
            description: "Get practical feedback on your resume from experienced recruiters.",
            type: "resume"
        },
        {
            icon: "🎯",
            title: "Career Strategy Session",
            description: "One-on-one guidance to help you plan your next career move.",
            type: "booking"
        },
        {
            icon: "🗣️",
            title: "Mock Interview",
            description: "Practice real interview scenarios and improve your confidence.",
            type: "booking"
        },
        {
            icon: "📞",
            title: "Quick Career Call",
            description: "A short 20-minute session to clear specific doubts.",
            type: "booking"
        }
    ];

    const pathways = [
        {
            title: "Frontend Developer",
            category: "tech",
            growth: "25% projected growth",
            salary: "₹6 – 12 LPA",
            description: "Build interactive websites and applications users love.",
            skills: "HTML, CSS, JavaScript, React"
        },
        {
            title: "Data Scientist",
            category: "tech",
            growth: "35% projected growth",
            salary: "₹8 – 20 LPA",
            description: "Work with data to solve real-world business problems.",
            skills: "Python, SQL, Machine Learning"
        },
        {
            title: "UX Designer",
            category: "creative",
            growth: "22% projected growth",
            salary: "₹5 – 12 LPA",
            description: "Design intuitive digital experiences.",
            skills: "Figma, Research, Wireframing"
        },
        {
            title: "Digital Marketer",
            category: "business",
            growth: "18% projected growth",
            salary: "₹4 – 10 LPA",
            description: "Help brands grow using digital platforms.",
            skills: "SEO, Ads, Analytics"
        }
    ];

    const skills = [
        {
            title: "Full Stack Development",
            provider: "Coursera",
            duration: "6 Months",
            level: "Beginner to Intermediate"
        },
        {
            title: "Data Science Program",
            provider: "edX",
            duration: "8 Months",
            level: "Intermediate"
        },
        {
            title: "Digital Marketing Certification",
            provider: "Google",
            duration: "3 Months",
            level: "Beginner"
        }
    ];

    const jobs = [
        {
            title: "Junior Frontend Developer",
            company: "TechCorp",
            type: "entry",
            location: "Bangalore",
            salary: "₹6 – 8 LPA"
        },
        {
            title: "Data Analyst Intern",
            company: "DataMinds",
            type: "internship",
            location: "Remote",
            salary: "₹25k / month"
        },
        {
            title: "Software Engineer (Fresher)",
            company: "ProductLabs",
            type: "fresher",
            location: "Hyderabad",
            salary: "₹7 – 9 LPA"
        }
    ];

    const quizQuestions = [
        {
            question: "What kind of problems excite you the most?",
            options: ["Logical and analytical", "Creative and visual", "Business strategy", "Helping people directly"]
        },
        {
            question: "Which subject did you naturally perform well in?",
            options: ["Math", "Computer Science", "Design / Arts", "Commerce"]
        },
        {
            question: "How do you prefer to work?",
            options: ["Independently", "With a small team", "Leading projects", "Supporting others"]
        },
        {
            question: "What motivates you most?",
            options: ["High income potential", "Creative freedom", "Impact on society", "Job stability"]
        }
    ];

    // =============================
    // RENDER SERVICES
    // =============================

    function renderServices() {
        const container = document.getElementById("servicesGrid");
        if (!container) return;

        container.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <button class="service-btn" data-type="${service.type}">
                    Book Now
                </button>
            </div>
        `).join("");
    }

    // =============================
    // RENDER PATHWAYS
    // =============================

    function renderPathways(filter = "all") {
        const container = document.getElementById("pathwayGrid");
        if (!container) return;

        const filtered = filter === "all"
            ? pathways
            : pathways.filter(p => p.category === filter);

        container.innerHTML = filtered.map(p => `
            <div class="result-card">
                <h4>${p.title}</h4>
                <p>${p.description}</p>
                <p class="match">${p.growth}</p>
                <p class="salary">${p.salary}</p>
                <p class="small">${p.skills}</p>
            </div>
        `).join("");
    }

    // =============================
    // RENDER SKILLS
    // =============================

    function renderSkills() {
        const container = document.getElementById("skillsGrid");
        if (!container) return;

        container.innerHTML = skills.map(s => `
            <div class="result-card">
                <h4>${s.title}</h4>
                <p class="small">${s.provider}</p>
                <p>Duration: ${s.duration}</p>
                <p class="match">Level: ${s.level}</p>
            </div>
        `).join("");
    }

    // =============================
    // RENDER JOBS
    // =============================

    function renderJobs(filter = "all", search = "") {
        const container = document.getElementById("jobsGrid");
        if (!container) return;

        let filtered = jobs;

        if (filter !== "all") {
            filtered = filtered.filter(j => j.type === filter);
        }

        if (search) {
            filtered = filtered.filter(j =>
                j.title.toLowerCase().includes(search.toLowerCase()) ||
                j.company.toLowerCase().includes(search.toLowerCase())
            );
        }

        container.innerHTML = filtered.map(j => `
            <div class="result-card">
                <h4>${j.title}</h4>
                <p class="small">${j.company}</p>
                <p>${j.location}</p>
                <p class="salary">${j.salary}</p>
                <button class="btn-outline apply-btn">Apply</button>
            </div>
        `).join("");
    }

    // =============================
    // QUIZ LOGIC
    // =============================

    let current = 0;
    let answers = [];

    function renderQuiz() {
        const container = document.getElementById("quizQuestions");
        if (!container) return;

        const q = quizQuestions[current];
        const progress = ((current + 1) / quizQuestions.length) * 100;
        document.getElementById("quizProgress").style.width = progress + "%";

        container.innerHTML = `
            <h3>Question ${current + 1} of ${quizQuestions.length}</h3>
            <p>${q.question}</p>
            ${q.options.map((opt, i) => `
                <div class="option ${answers[current] === i ? "selected" : ""}" data-index="${i}">
                    ${opt}
                </div>
            `).join("")}
        `;

        document.getElementById("prevBtn").style.display = current === 0 ? "none" : "inline-block";
        document.getElementById("nextBtn").style.display = current === quizQuestions.length - 1 ? "none" : "inline-block";
        document.getElementById("submitQuiz").style.display = current === quizQuestions.length - 1 ? "inline-block" : "none";
    }

    function calculateResults() {
        const techScore = answers.filter(a => a === 0 || a === 1).length;
        const creativeScore = answers.filter(a => a === 2).length;

        let suggested;

        if (techScore >= 2) {
            suggested = pathways.filter(p => p.category === "tech");
        } else if (creativeScore >= 2) {
            suggested = pathways.filter(p => p.category === "creative");
        } else {
            suggested = pathways.slice(0, 2);
        }

        const container = document.getElementById("resultsContainer");
        container.innerHTML = suggested.map(p => `
            <div class="result-card">
                <h4>${p.title}</h4>
                <p>${p.description}</p>
                <p class="salary">${p.salary}</p>
            </div>
        `).join("");

        document.querySelector(".quiz-container").style.display = "none";
        document.getElementById("quizResults").classList.add("show");
    }

    // =============================
    // EVENT LISTENERS
    // =============================

    document.addEventListener("click", function (e) {

        if (e.target.classList.contains("option")) {
            answers[current] = parseInt(e.target.dataset.index);
            renderQuiz();
        }

        if (e.target.classList.contains("service-btn")) {
            const type = e.target.dataset.type;
            if (type === "resume") {
                document.getElementById("resumeModal").classList.add("show");
            } else {
                document.getElementById("bookingModal").classList.add("show");
            }
        }

        if (e.target.classList.contains("apply-btn")) {
            alert("Application feature coming soon.");
        }
    });

    document.getElementById("nextBtn")?.addEventListener("click", function () {
        if (answers[current] === undefined) {
            alert("Please select an option first.");
            return;
        }
        current++;
        renderQuiz();
    });

    document.getElementById("prevBtn")?.addEventListener("click", function () {
        current--;
        renderQuiz();
    });

    document.getElementById("submitQuiz")?.addEventListener("click", calculateResults);

    document.getElementById("restartQuiz")?.addEventListener("click", function () {
        current = 0;
        answers = [];
        document.querySelector(".quiz-container").style.display = "block";
        document.getElementById("quizResults").classList.remove("show");
        renderQuiz();
    });

    document.querySelectorAll(".close-modal").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".modal").forEach(m => m.classList.remove("show"));
        });
    });

    window.addEventListener("click", function (e) {
        if (e.target.classList.contains("modal")) {
            e.target.classList.remove("show");
        }
    });

    document.getElementById("jobType")?.addEventListener("change", function () {
        renderJobs(this.value, document.getElementById("jobSearch").value);
    });

    document.getElementById("jobSearch")?.addEventListener("input", function () {
        renderJobs(document.getElementById("jobType").value, this.value);
    });

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            renderPathways(this.dataset.filter);
        });
    });

    // =============================
    // INITIAL LOAD
    // =============================

    renderServices();
    renderPathways();
    renderSkills();
    renderJobs();
    renderQuiz();

});