document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio JS chargé");
  // Données
  const skills = [
    { name: "HTML", level: 85 },
    { name: "CSS", level: 80 },
    { name: "JavaScript", level: 60 },
    { name: "PHP", level: 65 },
    { name: "Premiere Pro", level: 80 },
    { name: "CapCut", level: 80 },
    { name: "Photoshop", level: 70 },
    { name: "Canva", level: 85 },
    { name: "Maintenance", level: 80 },
  ];
  const projects = [
    {
      title: "Sites web & Newsletters",
      desc: "Création de sites et newsletters chez Searocco Studio.",
      tags: ["HTML", "CSS", "WordPress"],
    },
    {
      title: "Productions audiovisuelles",
      desc: "Montage vidéo chez Permis de vivre la ville.",
      tags: ["Premiere Pro", "CapCut"],
    },
    {
      title: "Maintenance & assistance",
      desc: "Support informatique chez Emmaüs Solidarité.",
      tags: ["Maintenance", "Réseau"],
    },
  ];
  const experience = [
    {
      title: "Searocco Studio — Alternance",
      date: "2025 - Aujourd'hui",
      desc: "Développement web, sites & newsletters.",
    },
    {
      title: "Permis de vivre la ville — Stage",
      date: "2024",
      desc: "Production audiovisuelle et montage vidéo.",
    },
    {
      title: "Emmaüs Solidarité — Stage",
      date: "2023",
      desc: "Maintenance informatique et assistance utilisateurs.",
    },
  ];

  // Render skills (improved)
  const skillsGrid = document.getElementById("skillsGrid");
  if (skillsGrid) {
    skillsGrid.innerHTML = skills
      .map(
        (s) => `
      <div class="skill reveal">
        <div class="skill-head">
          <div class="skill-name">
            <div class="skill-icon">⚙️</div>
            <span>${s.name}</span>
          </div>
          <span class="skill-pct">${s.level}%</span>
        </div>

        <div class="skill-bar">
          <div class="skill-fill" data-level="${s.level}"></div>
        </div>
      </div>
    `,
      )
      .join("");

    // animate skill bars
    setTimeout(() => {
      document.querySelectorAll(".skill-fill").forEach((el) => {
        el.style.width = el.dataset.level + "%";
      });
    }, 300);
  }

  // Render projects (clean)
  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid) {
    projectsGrid.innerHTML = projects
      .map(
        (p) => `
      <div class="project reveal">
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="tags">
            ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  // Render timeline (clean)
  const timeline = document.getElementById("timeline");
  if (timeline) {
    timeline.innerHTML = experience
      .map(
        (e) => `
      <div class="tl-item reveal">
        <div class="tl-dot"></div>
        <div class="tl-card-wrap">
          <div class="tl-card">
            <div class="tl-date">${e.date}</div>
            <h3>${e.title}</h3>
            <p>${e.desc}</p>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  // Lucide icons
  if (window.lucide) lucide.createIcons();

  // Burger menu
  const burger = document.getElementById("navToggle");
  if (burger) {
    burger.addEventListener("click", () => {
      document.querySelector(".nav-links")?.classList.toggle("open");
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      console.log("Form submit déclenché");
      e.preventDefault();
      console.log("Default action bloquée");
      const msg = document.getElementById("formFeedback");
      const data = new FormData(e.target);
      if (msg) {
        msg.textContent = "Envoi...";
        msg.style.color = "#38bdf8";
      }
      try {
        const res = await fetch("php/contact.php", {
          method: "POST",
          body: data,
        });
        const json = await res.json();
        if (msg) {
          msg.textContent = json.message;
          msg.style.color = json.success ? "#38bdf8" : "#ef4444";
        }
        if (json.success) e.target.reset();
      } catch (err) {
        if (msg) {
          msg.textContent = "Erreur de connexion au serveur.";
          msg.style.color = "#ef4444";
        }
      }
    });
  }
});
