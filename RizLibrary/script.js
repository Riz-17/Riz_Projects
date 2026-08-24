let books = [];
let currentBook = null;
let currentPage = 1;


const categories = {

    "Programming": [
        "C++ Programming",
        "Python Programming",
        "Java Programming",
        "JavaScript",
        "Data Structures",
        "Algorithms",
        "Web Development",
        "HTML & CSS",
        "Git & GitHub",
        "Software Engineering"
    ],

    "Artificial Intelligence": [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "Computer Vision",
        "Natural Language Processing",
        "Generative AI",
        "Robotics",
        "Reinforcement Learning",
        "AI Ethics"
    ],

    "Cloud Computing": [
        "Cloud Computing",
        "AWS",
        "Microsoft Azure",
        "Google Cloud",
        "Docker",
        "Kubernetes",
        "DevOps",
        "Cloud Security",
        "Serverless Computing",
        "Cloud Architecture"
    ],

    "Database": [
        "SQL",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "NoSQL",
        "Database Management",
        "Database Design",
        "Big Data",
        "Data Warehousing",
        "Database Security"
    ],

    "Cyber Security": [
        "Cyber Security",
        "Ethical Hacking",
        "Cryptography",
        "Network Security",
        "Digital Forensics",
        "Cyber Law",
        "Malware Analysis",
        "Web Security",
        "Information Security",
        "Security Architecture"
    ],

    "History": [
        "Ancient History",
        "World History",
        "Indian History",
        "Medieval History",
        "Modern History",
        "World Wars",
        "Civilizations",
        "Political History",
        "Cultural History",
        "Historical Geography"
    ],

    "Science": [
        "Physics",
        "Chemistry",
        "Biology",
        "Astronomy",
        "Quantum Physics",
        "Genetics",
        "Earth Science",
        "Space Science",
        "Environmental Science",
        "Modern Science"
    ],

    "Mathematics": [
        "Algebra",
        "Calculus",
        "Statistics",
        "Probability",
        "Geometry",
        "Trigonometry",
        "Linear Algebra",
        "Number Theory",
        "Discrete Mathematics",
        "Mathematical Logic"
    ],

    "Business": [
        "Business Strategy",
        "Entrepreneurship",
        "Marketing",
        "Finance",
        "Management",
        "Accounting",
        "Leadership",
        "Economics",
        "Business Analytics",
        "Startup Management"
    ],

    "Engineering": [
        "Computer Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Electronics",
        "Communication Engineering",
        "Robotics Engineering",
        "Industrial Engineering",
        "Engineering Mathematics",
        "Software Engineering"
    ]

};


const images = [

"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=900&q=85",

"https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=900&q=85"

];


let id = 1;


/* CREATE 500 BOOKS */

for (const category in categories) {

    categories[category].forEach(topic => {

        for (let volume = 1; volume <= 5; volume++) {

            books.push({

                id: id,

                title: topic + " — Volume " + volume,

                category: category,

                author: "RizLibrary Digital Press",

                pages: 20,

                image: images[(id - 1) % images.length],

                description:
                    "A complete digital learning book covering " +
                    topic +
                    ", fundamentals, concepts, practical examples and real-world applications."

            });

            id++;

        }

    });

}


/* PAGE NAVIGATION */

function showPage(page) {

    document.querySelectorAll(".page")
        .forEach(section => {
            section.classList.remove("active");
        });

    const target = document.getElementById(page);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* RENDER BOOKS */

function renderBooks(list) {

    const grid =
        document.getElementById("bookGrid");

    if (!grid) return;

    document.getElementById("results").textContent =
        list.length + " books";


    if (list.length === 0) {

        grid.innerHTML = `
            <div class="no-books">
                <h2>📚 No Books Found</h2>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    grid.innerHTML = list.map(book => `

        <div class="book-card">

            <div class="book-cover">

                <img
                    src="${book.image}"
                    alt="${book.title}"
                >

                <span class="book-category">
                    ${book.category}
                </span>

            </div>


            <div class="book-content">

                <small>
                    DIGITAL EDITION
                </small>

                <h3>
                    ${book.title}
                </h3>

                <p>
                    ${book.description}
                </p>

                <div class="book-details">

                    <span>
                        ✍ ${book.author}
                    </span>

                    <span>
                        📖 20 Pages
                    </span>

                </div>

                <button
                    class="read-now"
                    onclick="openBook(${book.id})"
                >
                    READ NOW →
                </button>

            </div>

        </div>

    `).join("");

}


/* SEARCH */

function searchBooks() {

    const query =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    const category =
        document
        .getElementById("categorySelect")
        .value;


    const filtered = books.filter(book => {

        const matchesCategory =
            category === "All" ||
            book.category === category;


        const matchesSearch =
            !query ||
            book.title
                .toLowerCase()
                .includes(query) ||

            book.category
                .toLowerCase()
                .includes(query) ||

            book.author
                .toLowerCase()
                .includes(query);


        return matchesCategory && matchesSearch;

    });


    renderBooks(filtered);

}


/* CATEGORY */

function filterBooks(category) {

    document
        .getElementById("categorySelect")
        .value = category;


    searchBooks();

    showPage("library");

}


/* BOOK READER */

function openBook(bookId) {

    currentBook =
        books.find(book => book.id === bookId);

    currentPage = 1;

    showPage("reader");

    updateReader();

}


function updateReader() {

    document
        .getElementById("readerTitle")
        .textContent =
        currentBook.title;


    document
        .getElementById("readerImage")
        .src =
        currentBook.image;


    document
        .getElementById("pageNumber")
        .textContent =
        "Page " + currentPage + " / 20";


    const chapters = [

        "Introduction",
        "Fundamentals",
        "Core Concepts",
        "Important Principles",
        "Practical Knowledge",
        "Tools & Technologies",
        "Applications",
        "Architecture",
        "Problem Solving",
        "Performance",
        "Security",
        "Modern Trends",
        "Case Study",
        "Advanced Concepts",
        "Professional Skills",
        "Project Building",
        "Future Technologies",
        "Expert Perspective",
        "Final Review",
        "Conclusion"

    ];


    const chapter =
        chapters[currentPage - 1];


    document
        .getElementById("readerContent")
        .innerHTML = `

            <h2>${chapter}</h2>

            <p>
                Welcome to page ${currentPage}
                of <strong>${currentBook.title}</strong>.
            </p>

            <p>
                This section explores
                <strong>${chapter}</strong>
                in relation to
                <strong>${currentBook.category}</strong>.
                The material is organized as a
                digital learning experience.
            </p>

            <p>
                Readers can understand the fundamental
                concepts, practical applications,
                important terminology and real-world
                ideas connected with this subject.
            </p>

            <p>
                Continue to the next page to explore
                another part of this digital edition.
            </p>

        `;


    document
        .getElementById("pageDots")
        .textContent =
        "● ".repeat(currentPage) +
        "○ ".repeat(20 - currentPage);

}


function nextPage() {

    if (currentPage < 20) {

        currentPage++;

        updateReader();

    }

}


function previousPage() {

    if (currentPage > 1) {

        currentPage--;

        updateReader();

    }

}


/* ACCOUNT */

function loginTab() {

    document
        .getElementById("loginForm")
        .classList.remove("hidden");

    document
        .getElementById("registerForm")
        .classList.add("hidden");

    document
        .getElementById("loginTab")
        .classList.add("selected");

    document
        .getElementById("registerTab")
        .classList.remove("selected");

}


function registerTab() {

    document
        .getElementById("loginForm")
        .classList.add("hidden");

    document
        .getElementById("registerForm")
        .classList.remove("hidden");

    document
        .getElementById("loginTab")
        .classList.remove("selected");

    document
        .getElementById("registerTab")
        .classList.add("selected");

}


function login(event) {

    event.preventDefault();

    document
        .getElementById("loginMessage")
        .textContent =
        "Demo login successful 🚀";

}


function register(event) {

    event.preventDefault();

    document
        .getElementById("registerMessage")
        .textContent =
        "Account created successfully 📚";

}


function sendMessage(event) {

    event.preventDefault();

    document
        .getElementById("message")
        .textContent =
        "Message received successfully!";

    event.target.reset();

}


/* START WEBSITE */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* BOOK COUNT */

        document
            .getElementById("bookCount")
            .textContent =
            books.length + "+";


        /* CATEGORY DROPDOWN */

        const select =
            document.getElementById(
                "categorySelect"
            );


        Object.keys(categories)
            .forEach(category => {

                const option =
                    document.createElement("option");

                option.value = category;

                option.textContent = category;

                select.appendChild(option);

            });


        /* CATEGORY CARDS */

        const categoryGrid =
            document.getElementById(
                "categoryGrid"
            );


        const icons = [
            "💻",
            "🤖",
            "☁️",
            "🗄️",
            "🛡️",
            "🏛️",
            "🔬",
            "📐",
            "💼",
            "⚙️"
        ];


        Object.keys(categories)
            .forEach((category,index) => {

                categoryGrid.innerHTML += `

                    <div
                        class="cat"
                        onclick="filterBooks('${category}')"
                    >

                        <div class="icon">
                            ${icons[index]}
                        </div>

                        <h3>
                            ${category}
                        </h3>

                        <p>
                            50 books available
                        </p>

                    </div>

                `;

            });


        /* LANGUAGES */

        const languages = [

            "English","Hindi","Urdu","Arabic",
            "French","Spanish","German","Italian",
            "Portuguese","Russian","Chinese","Japanese",
            "Korean","Turkish","Persian","Bengali",
            "Telugu","Tamil","Marathi","Gujarati",
            "Kannada","Malayalam","Punjabi","Nepali",
            "Thai","Vietnamese","Indonesian","Malay",
            "Filipino","Dutch","Greek","Hebrew",
            "Swedish","Norwegian","Danish","Finnish",
            "Polish","Czech","Ukrainian","Romanian",
            "Hungarian","Bulgarian","Serbian","Croatian",
            "Swahili","Latin","Sanskrit","Pashto",
            "Kurdish","Somali","Afrikaans","Irish",
            "Welsh","Estonian","Lithuanian","Latvian"

        ];


        const languageGrid =
            document.getElementById(
                "languageGrid"
            );


        languages.forEach(language => {

            languageGrid.innerHTML += `

                <div class="lang">

                    <strong>
                        ${language}
                    </strong>

                    <small>
                        Digital Collection
                    </small>

                </div>

            `;

        });


        /* PARTICLES */

        const particles =
            document.getElementById(
                "particles"
            );


        for (let i = 0; i < 70; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "particle";


            particle.style.left =
                Math.random() * 100 + "%";


            particle.style.animationDuration =
                (6 + Math.random() * 12) + "s";


            particle.style.animationDelay =
                (-Math.random() * 12) + "s";


            particles.appendChild(particle);

        }


        /* FIRST LOAD */

        renderBooks(books);

    }
);