// Data loader for portfolio content
async function loadPortfolioData() {
    try {
        // Load all JSON files
        const [
            aboutData,
            experienceData,
            educationData,
            skillsData,
            projectsData,
            certificationsData,
            contactData
        ] = await Promise.all([
            fetch('data/about.json').then(r => r.json()),
            fetch('data/experience.json').then(r => r.json()),
            fetch('data/education.json').then(r => r.json()),
            fetch('data/skills.json').then(r => r.json()),
            fetch('data/projects.json').then(r => r.json()),
            fetch('data/certifications.json').then(r => r.json()),
            fetch('data/contact.json').then(r => r.json())
        ]);

        // Render all sections
        renderAbout(aboutData);
        renderExperience(experienceData);
        renderEducation(educationData);
        renderSkills(skillsData);
        renderProjects(projectsData);
        renderCertifications(certificationsData);
        renderContact(contactData);

    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

function renderAbout(data) {
    const container = document.getElementById('about-content');
    container.innerHTML = `
        <div class="profile-img-container">
            <div class="profile-img">
                <img src="images/profile.jpg" alt="Adham Gamal" class="profile-photo">
            </div>
        </div>
        <div class="about-text">
            <h3>${data.title}</h3>
            ${data.description.map(paragraph => `<p>${paragraph}</p>`).join('')}
            
            <div class="skills-list">
                ${data.skills.map(skill => `
                    <div class="skill-item" data-skill="${skill.name.toLowerCase().replace(/\s+/g, '-')}">
                        <i class="${skill.icon}"></i>
                        <span>${skill.name}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="stats">
                ${data.stats.map(stat => `
                    <div class="stat">
                        <h3>${stat.value}</h3>
                        <p>${stat.label}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Initialize skill item click handlers after rendering
    initializeSkillClicks();
}

// Add this function to handle skill clicks
function initializeSkillClicks() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            smoothScrollToTarget('#skills');
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function renderExperience(data) {
    const container = document.getElementById('experience-timeline');
    container.innerHTML = data.map((item, index) => `
        <div class="timeline-item ${index % 2 === 0 ? '' : 'even'}">
            <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3>${item.role}</h3>
                <h4>${item.company}</h4>
                <ul>
                    ${item.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function renderEducation(data) {
    const container = document.getElementById('education-content');
    container.innerHTML = data.map(item => `
        <div class="education-item">
            <span class="education-date">${item.date}</span>
            <h3>${item.degree}</h3>
            <h4>${item.institution}</h4>
            <p>${item.major}</p>
            <p>${item.description}</p>
            ${item.grade ? `<p><strong>Grade: ${item.grade}</strong></p>` : ''}
        </div>
    `).join('');
}

function renderSkills(data) {
    const container = document.getElementById('skills-container');
    container.innerHTML = data.map(category => `
        <div class="skill-category">
            <h3><i class="${category.icon}"></i> ${category.name}</h3>
            <div class="skill-list">
                ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderProjects(data) {
    const container = document.getElementById('projects-grid');
    container.innerHTML = data.map(project => `
        <div class="project-card">
            <div class="project-img">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.links.map(link => `
                        <a href="${link.url}" class="project-link" ${link.external ? 'target="_blank"' : ''}>
                            <i class="${link.icon}"></i> ${link.text}
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderCertifications(data) {
    const container = document.getElementById('certifications-grid');
    container.innerHTML = data.map(cert => `
        <div class="cert-card">
            <div class="cert-icon">
                <i class="${cert.icon}"></i>
            </div>
            <div class="cert-info">
                <h3>${cert.name}</h3>
                <p>${cert.issuer} • ${cert.date}</p>
            </div>
        </div>
    `).join('');
}

function renderContact(data) {
    const container = document.getElementById('contact-content');
    container.innerHTML = `
        <div class="contact-info-side">
            ${data.contactItems.map(item => `
                <div class="contact-item-side">
                    <div class="contact-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="contact-details">
                        <h3>${item.title}</h3>
                        ${item.content ? `<p>${item.content}</p>` : ''}
                        ${item.socialLinks ? `
                            <div class="social-links">
                                ${item.socialLinks.map(link => `
                                    <a href="${link.url}" class="social-link" target="_blank">
                                        <i class="${link.icon}"></i>
                                    </a>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="contact-message">
            <i class="fas fa-paper-plane"></i>
            <h3>${data.message.title}</h3>
            <p>${data.message.description}</p>
            <a href="mailto:${data.message.email}" class="btn">${data.message.buttonText}</a>
        </div>
    `;
}