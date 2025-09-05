    
        const terminalBody = document.getElementById('terminalBody');
        const commandInput = document.getElementById('commandInput');
        const cardsSection = document.getElementById('cardsSection');
        const cardsWrapper = document.getElementById('cardsWrapper');
        const closeCardsBtn = document.querySelector('.close-cards-btn');
        const leftArrow = document.getElementById('leftArrow');
        const rightArrow = document.getElementById('rightArrow');
        const asciiArtElement = document.getElementById('asciiArt');
        const terminal = document.getElementById('terminal');
        const suspendedScreen = document.getElementById('suspendedScreen');
        const loadingContainer = document.getElementById('loadingContainer');
        const loadingProgress = document.getElementById('loadingProgress');
        document.addEventListener('contextmenu', event => event.preventDefault());
        let currentScrollPosition = 0;
        const cardWidth = 320; // 300px card width + 20px gap
        let isShuttingDown = false;
        let isMaximized = false;

        // Command history
        let commandHistory = [];
        let historyIndex = -1;

        // Available themes
        const availableThemes = ['dark', 'light', 'corporate', 'cosmic', 'gruvbox', 'pride', 'solarized'];

        // Available fonts
        const availableFonts = [
            'Courier New',
            'Terminal',
            'Monaco',
            'Consolas',
            'Lucida Console',
            'Fira Code',
            'Source Code Pro'
        ];

        // Default theme and font
        const defaultTheme = 'cosmic';
        const defaultFont = 'Courier New';

        // ASCII Art Collection
        const asciiArts = [
            `
   █████████           █████               █████
  ███▒▒▒▒▒███         ▒▒███               ▒▒███
 ▒███    ▒███   █████  ▒███████    ██████  ▒███ █████
 ▒███████████  ███▒▒   ▒███▒▒███  ███▒▒███ ▒███▒▒███
 ▒███▒▒▒▒▒███ ▒▒█████  ▒███ ▒███ ▒███ ▒███ ▒██████▒
 ▒███    ▒███  ▒▒▒▒███ ▒███ ▒███ ▒███ ▒███ ▒███▒▒███
 █████   █████ ██████  ████ █████▒▒██████  ████ █████
▒▒▒▒▒   ▒▒▒▒▒ ▒▒▒▒▒▒  ▒▒▒▒ ▒▒▒▒▒  ▒▒▒▒▒▒  ▒▒▒▒ ▒▒▒▒▒
            `,
            `
 █████╗ ███████╗██╗  ██╗ ██████╗ ██╗  ██╗
██╔══██╗██╔════╝██║  ██║██╔═══██║██║ ██╔╝
███████║███████╗███████║██║   ██║█████╔╝
██╔══██║╚════██║██╔══██║██║   ██║██╔═██╗
██║  ██║███████║██║  ██║╚██████╔╝██║  ██╗
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
            `,
            `
 _____     _       _
|  _  |___| |_ ___| |_
|     |_ -|   | . | '_|
|__|__|___|_|_|___|_,_|
            `,
            `
   ░███               ░██                   ░██
  ░██░██              ░██                   ░██
 ░██  ░██   ░███████  ░████████   ░███████  ░██    ░██
░█████████ ░██        ░██    ░██ ░██    ░██ ░██   ░██
░██    ░██  ░███████  ░██    ░██ ░██    ░██ ░███████
░██    ░██        ░██ ░██    ░██ ░██    ░██ ░██   ░██
░██    ░██  ░███████  ░██    ░██  ░███████  ░██    ░██
            `,
            `
 █████  ███████ ██   ██  ██████  ██   ██
██   ██ ██      ██   ██ ██    ██ ██  ██
███████ ███████ ███████ ██    ██ █████
██   ██      ██ ██   ██ ██    ██ ██  ██
██   ██ ███████ ██   ██  ██████  ██   ██
            `
        ];

        // Function to get random ASCII art
        function getRandomAsciiArt() {
            const randomIndex = Math.floor(Math.random() * asciiArts.length);
            return asciiArts[randomIndex];
        }

        // Set initial ASCII art
        asciiArtElement.textContent = getRandomAsciiArt();

        const sharedAboutContent = {
                title: "About Me",
                content: `
I'm a senior software engineer with over decade of experience in InterSystems technology stack, including IRIS for Health, HealthShare, Ensemble, and Caché. Experience building  healthcare applications and enterprise systems. Specializing in high-performance database
solutions and legacy system modernization.
• Expert Intersystems IRIS platform and MUMPS (M) programming language.
• Strong background in healthcare IT (EHR, EMR, PACS systems)
• Experience with FHIR integration and healthcare data standards
• Proficient in system architecture and database optimization
• Passionate about modernizing legacy systems while maintaining reliability
• Database Enthusiast
             `};
        // Portfolio content
        const portfolioData = {
            about: sharedAboutContent,
            whoami: sharedAboutContent,
            skills: {
                title: "Technical Skills",
                content: `
<span class="highlight">Languages & Platforms:</span>
• Intersystems Caché/IRIS - Expert
• ObjectScript - Expert
• SQL - Advanced
• Python - Intermediate
• MUMPS (M) - Advanced
• HTML/CSS/JavaScript - Intermediate
<span class="highlight">Databases & Technologies:</span>
• Intersystems IRIS Data Platform
• Globals Database
• SQL Gateway
• Interopreability/HealthShare
• FHIR Standards
• HL7 Integration
• Web Services (REST/SOAP)
• Docker & Kubernetes
<span class="highlight">Tools & Methodologies:</span>
• VS Code with InterSystems extensions
• Studio
• Terminal-based development
• Agile/Scrum
• CI/CD pipelines
• Git version control
                `
            },
            projects: {
                title: "Featured Projects",
                content: `
<div class="project">
    <div class="project-title">EHR Modernization Platform</div>
    <div>Led the migration of a legacy MUMPS-based EHR system to Intersystems IRIS with modern web interfaces. Improved system performance by 300% and added FHIR API support.</div>
    <div>
        <span class="tech-tag">MUMPS</span>
        <span class="tech-tag">IRIS</span>
        <span class="tech-tag">FHIR</span>
        <span class="tech-tag">React</span>
        <span class="tech-tag">Docker</span>
    </div>
</div>
<div class="project">
    <div class="project-title">Healthcare Data Exchange Hub</div>
    <div>Built a real-time HL7 message processing system using Intersystems Ensemble that handles over 5 million transactions daily. Implemented custom message routing and transformation rules.</div>
    <div>
        <span class="tech-tag">Ensemble</span>
        <span class="tech-tag">HL7</span>
        <span class="tech-tag">ObjectScript</span>
        <span class="tech-tag">TCP/IP</span>
    </div>
</div>
<div class="project">
    <div class="project-title">Clinical Analytics Engine</div>
    <div>Developed a high-performance analytics platform on IRIS that processes petabytes of clinical data. Implemented advanced indexing strategies for sub-second query responses.</div>
    <div>
        <span class="tech-tag">IRIS</span>
        <span class="tech-tag">SQL</span>
        <span class="tech-tag">BI Tools</span>
        <span class="tech-tag">Python</span>
    </div>
</div>
<div class="project">
    <div class="project-title">Legacy System Integration Framework</div>
    <div>Created a middleware solution to integrate 20+ legacy MUMPS applications with modern cloud services. Implemented secure authentication and data transformation pipelines.</div>
    <div>
        <span class="tech-tag">MUMPS</span>
        <span class="tech-tag">REST</span>
        <span class="tech-tag">OAuth</span>
        <span class="tech-tag">JSON</span>
    </div>
</div>
                `,
                cards: [
                    {
                        title: "EHR Modernization Platform",
                        description: "Led the migration of a legacy MUMPS-based EHR system to Intersystems IRIS with modern web interfaces. Improved system performance by 300% and added FHIR API support.",
                        tags: ["MUMPS", "IRIS", "FHIR", "React", "Docker"]
                    },
                    {
                        title: "Healthcare Data Exchange Hub",
                        description: "Built a real-time HL7 message processing system using Intersystems Ensemble that handles over 5 million transactions daily. Implemented custom message routing and transformation rules.",
                        tags: ["Ensemble", "HL7", "ObjectScript", "TCP/IP"]
                    },
                    {
                        title: "Clinical Analytics Engine",
                        description: "Developed a high-performance analytics platform on IRIS that processes petabytes of clinical data. Implemented advanced indexing strategies for sub-second query responses.",
                        tags: ["IRIS", "SQL", "BI Tools", "Python"]
                    },
                    {
                        title: "Legacy System Integration Framework",
                        description: "Created a middleware solution to integrate 20+ legacy MUMPS applications with modern cloud services. Implemented secure authentication and data transformation pipelines.",
                        tags: ["MUMPS", "REST", "OAuth", "JSON"]
                    }
                ]
            },
            certification: {
                title: "Certifications & Credentials",
                content: `
<div class="certification">
    <div class="certification-title">InterSystems Certified Professional</div>
    <div>Intersystems IRIS Core Solutions Developer</div>
    <div>
        <span class="cert-badge">2023</span>
        <span class="cert-badge">Advanced</span>
    </div>
    <div style="margin-top: 8px; font-size: 13px;">
        Expert-level certification covering IRIS architecture, ObjectScript development,
        database management, and system integration.
    </div>
</div>
<div class="certification">
    <div class="certification-title">Intersystems Developer professional</div>
    <div>HL7 FHIR Implementation Specialist</div>
    <div>
        <span class="cert-badge">2025</span>
        <span class="cert-badge">Advanced</span>
    </div>
    <div style="margin-top: 8px; font-size: 13px;">
        Expert-level certification covering IRIS architecture, ObjectScript development,
        database management, and system integration.
    </div>
</div>
                `,
                cards: [
                    {
                        title: "Intersystems IRIS Core Solutions Developer",
                        description: "Expert-level certification covering IRIS architecture, ObjectScript development, database management, and system integration. Validated ability to design and implement complex healthcare solutions on the IRIS platform.",
                        tags: ["IRIS", "ObjectScript", "Database", "2024", "Advanced"]
                    },
                    {
                        title: "Intersystems Developer professional",
                        description: "Expert-level certification covering IRIS architecture, ObjectScript development, database management, and system integration. Validated ability to design and implement complex healthcare solutions on the IRIS platform.",
                        tags: ["IRIS", "ObjectScript", "Database", "2025", "Advanced"]
                    }
                ]
            },
            contact: {
                title: "Contact Information",
                content: `
<div class="terminal-contact">
    <div class="terminal-contact-item">
        <div class="terminal-contact-icon">📧</div>
        <div class="terminal-contact-content">
            <div class="terminal-contact-title">Email</div>
            <div class="terminal-contact-detail"><a href="mailto:ashok22793@gmail.com" class="terminal-contact-link">ashok22793@gmail.com</a></div>
        </div>
    </div>
    <div class="terminal-contact-item">
        <div class="terminal-contact-icon">💼</div>
        <div class="terminal-contact-content">
            <div class="terminal-contact-title">LinkedIn</div>
            <div class="terminal-contact-detail"><a href="https://www.linkedin.com/in/ashok-kumar-thangavel/" target="_blank" class="terminal-contact-link">Ashok Kumar</a></div>
        </div>
    </div>
    <div class="terminal-contact-item">
        <div class="terminal-contact-icon">💻</div>
        <div class="terminal-contact-content">
            <div class="terminal-contact-title">GitHub</div>
            <div class="terminal-contact-detail"><a href="https://github.com/AshokThangavel/" target="_blank" class="terminal-contact-link">github.com/AshokThangavel</a></div>
        </div>
    </div>
     <div class="terminal-contact-item">
        <div class="terminal-contact-icon">💻</div>
        <div class="terminal-contact-content">
            <div class="terminal-contact-title">Dev Community</div>
            <div class="terminal-contact-detail"><a href="https://community.intersystems.com/user/ashok-kumar-t" target="_blank" class="terminal-contact-link">Ashok kumar</a></div>
        </div>
    </div>
    <div class="terminal-contact-item">
        <div class="terminal-contact-icon">📍</div>
        <div class="terminal-contact-content">
            <div class="terminal-contact-title">Location</div>
            <div class="terminal-contact-detail">Tamil Nadu, India(Remote Available)</div>
        </div>
    </div>
</div>
<div style="margin-top: 15px; font-size: 13px; opacity: 0.8;">
    💡 Detailed contact cards are displayed below for more information.
</div>
                `,
                cards: [
                    {
                        title: "Email",
                        description: "Primary contact for professional inquiries and collaboration opportunities.",
                        icon: "📧",
                        details: '<a href="mailto:Ashok22793@gmail.com" class="contact-card-link">Ashok22793@gmail.com</a>',
                        tags: ["Primary", "Business"]
                    },
                    {
                        title: "LinkedIn",
                        description: "Professional profile with detailed work experience and endorsements.",
                        icon: "💼",
                        details: '<a href="https://www.linkedin.com/in/ashok-kumar-thangavel/" target="_blank" class="contact-card-link">Ashok Kumar</a>',
                        tags: ["Professional", "Network"]
                    },
                    {
                        title: "GitHub",
                        description: "Code repositories and open-source contributions showcasing technical skills.",
                        icon: "💻",
                        details: '<a href="https://github.com/AshokThangavel/" target="_blank" class="contact-card-link">github.com/Ashok-Thangavel</a>',
                        tags: ["Code", "Projects"]
                    },
                    {
                        title: "IRIS Dev Community",
                        description: "",
                        icon: "💼",
                        details: '<a href="https://community.intersystems.com/user/ashok-kumar-t" target="_blank" class="contact-card-link">Ashok kumar</a>',
                        tags: ["Professional", "Network"]
                    },
                    {
                        title: "Location",
                        description: "Based in India, availability for remote work worldwide.",
                        icon: "📍",
                        details: "Tamil Nadu, India (Remote Available)",
                        tags: ["Location", "Remote"]
                    }
                ]
            },
            help: {
                title: "Available Commands",
                content: `
<div class="command-list">
    <div class="command-item">ashok</div>
    <div class="command-item">about</div>
    <div class="command-item">certification</div>
    <div class="command-item">clear</div>
    <div class="command-item">contact</div>
    <div class="command-item">email</div>
    <div class="command-item">exit</div>
    <div class="command-item">github</div>
    <div class="command-item">halt/h</div>
    <div class="command-item">help</div>
    <div class="command-item">history</div>
    <div class="command-item">kill theme</div>
    <div class="command-item">kill font</div>
    <div class="command-item">maxi</div>
    <div class="command-item">mini</div>
    <div class="command-item">projects</div>
    <div class="command-item">resume</div>
    <div class="command-item">set theme="name"</div>
    <div class="command-item">set font="name"</div>
    <div class="command-item">set terminal="style"</div>
    <div class="command-item">skills</div>
    <div class="command-item">shutdown</div>
    <div class="command-item">W ^About</div>
    <div class="command-item">W ^Certification</div>
    <div class="command-item">W ^Contact</div>
    <div class="command-item">W ^Help</div>
    <div class="command-item">W ^Projects</div>
    <div class="command-item">W ^Resume</div>
    <div class="command-item">W ^Skills</div>
    <div class="command-item">W #</div>
</div>
                `
            },
            resume: {
                title: "Resume",
                content: `
<div style="margin-top: 15px; padding: 10px; background-color: var(--section-bg); border-radius: 5px;">
    <a href="#" style="color: var(--command-color); text-decoration: none;" onclick="downloadResume(); return false;">
        📄 Download Ashok_Resume.pdf
    </a>
</div>
Note: This will download my resume in PDF format.
                `
            }
        };

        // Check if the system was previously shut down
        function checkSystemState() {
            const isSystemSuspended = localStorage.getItem('terminalSuspended') === 'true';

            if (isSystemSuspended) {
                // Hide terminal and show suspended screen
                terminal.style.display = 'none';
                suspendedScreen.style.display = 'flex';
                setTimeout(() => {
                    suspendedScreen.style.opacity = '1';
                }, 50);

                // Prevent terminal from showing until power button is clicked
                return false;
            }

            return true;
        }

        // Initialize the page
        function initializePage() {
            // Check if we should show the suspended screen
            if (!checkSystemState()) {
                return;
            }

            // Otherwise, proceed with normal initialization
            commandInput.focus();
        }

        // Theme toggle functionality
        function toggleTheme() {
            const body = document.body;
            const themeToggle = document.querySelector('.theme-toggle');

            if (body.getAttribute('data-theme') === 'light') {
                body.removeAttribute('data-theme');
                themeToggle.textContent = '🌙';
            } else {
                body.setAttribute('data-theme', 'light');
                themeToggle.textContent = '☀️';
            }
        }

        // Execute command from button
        function executeCommand(cmd) {
            const input = document.querySelector('.command-input');
            if (input) {
                input.value = cmd;
                const event = new KeyboardEvent('keydown', { key: 'Enter' });
                input.dispatchEvent(event);
            }
        }

        // Process user commands
        function processCommand(command, commandLine) {
            const cmd = command.trim();
            let output = '';

            // Add command to history
            if (cmd && (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== cmd)) {
                commandHistory.push(cmd);
                historyIndex = commandHistory.length;
            }

            // Convert to lowercase for case-insensitive comparison
            const cmdLower = cmd.toLowerCase();

            // Handle clear command (W #, Write #, clear, #)
            if (cmdLower === 'clear' || cmdLower === 'w #' || cmdLower === 'write #' || cmd === '#') {
               //terminalBody.innerHTML = `<div class="ascii-art">${getRandomAsciiArt()}</div>`;
			   terminalBody.innerHTML = ``;
                addCommandLine();
                return;
            }

            // Handle history command (:h, :history, history) - case insensitive
            if (cmdLower === ':h' || cmdLower === ':history' || cmdLower === 'history') {
                let historyOutput = '<div class="section"><div class="section-title">Command History</div>';
                if (commandHistory.length === 0) {
                    historyOutput += '<div>No commands in history yet.</div>';
                } else {
                    commandHistory.forEach((histCmd, index) => {
                        historyOutput += `<div>${index + 1}. ${histCmd}</div>`;
                    });
                }
                historyOutput += '</div>';
                output = historyOutput;
            }

            // Handle ashok command (case insensitive)
            else if (cmdLower === 'ashok') {
                window.open('https://www.linkedin.com/in/ashok-kumar-thangavel/', '_blank');
                output = `<div>Redirecting to LinkedIn profile...</div>`;
            }

            // Handle github command (case insensitive)
            else if (cmdLower === 'github') {
                window.open('https://github.com/AshokThangavel/', '_blank');
                output = `<div>Redirecting to GitHub profile...</div>`;
            }

            // Handle email command (case insensitive)
            else if (cmdLower === 'email') {
                window.open('mailto:Ashok22793@gmail.com', '_blank');
                output = `<div>Opening email client...</div>`;
            }

            // Handle kill theme command (case insensitive)
            else if (cmdLower === 'kill theme' || cmdLower === 'kill_theme') {
                killTheme();
                output = `<div>Theme reset to default (cosmic).</div>`;
            }

            // Handle kill font command (case insensitive)
            else if (cmdLower === 'kill font' || cmdLower === 'kill_font') {
                killFont();
                output = `<div>Font reset to default (Courier New).</div>`;
            }

            // Handle maximize command (case insensitive)
            else if (cmdLower === 'maxi') {
                maximizeTerminal();
                output = `<div>Terminal maximized.</div>`;
            }

            // Handle minimize command (case insensitive)
            else if (cmdLower === 'mini') {
                minimizeTerminal();
                output = `<div>Terminal restored to normal size.</div>`;
            }

            // Handle set terminal command (case insensitive)
            else if (cmdLower.startsWith('set terminal=') || cmdLower.startsWith('s terminal=')) {
                const terminalMatch = cmd.match(/(?:set|s)\s+terminal\s*=\s*"([^"]+)"/i);
                if (terminalMatch) {
                    const terminalStyle = terminalMatch[1].toLowerCase();
                    if (terminalStyle === 'windows' || terminalStyle === 'mac') {
                        setTerminalStyle(terminalStyle);
                        output = `<div>Terminal style changed to: <span class="highlight">${terminalStyle}</span></div>`;
                    } else {
                        output = `<div class="error-message">Invalid terminal style. Available styles: windows, mac</div>`;
                    }
                } else {
                    output = `<div class="error-message">Invalid syntax. Use: set terminal="windows" or s terminal="mac"</div>`;
                }
            }

            // Handle set theme command (case insensitive)
            else if (cmdLower.startsWith('set theme=') || cmdLower.startsWith('s theme=')) {
                const themeMatch = cmd.match(/(?:set|s)\s+theme\s*=\s*"([^"]+)"/i);
                if (themeMatch) {
                    const themeName = themeMatch[1].toLowerCase();
                    if (availableThemes.includes(themeName)) {
                        setTheme(themeName);
                        output = `<div>Theme changed to: <span class="highlight">${themeName}</span></div>`;
                    } else {
                        output = `<div class="error-message">Invalid theme. Available themes: ${availableThemes.join(', ')}</div>`;
                    }
                } else {
                    output = `<div class="error-message">Invalid syntax. Use: set theme="dark" or s theme="pride"</div>`;
                }
            }

            // Handle set font command (case insensitive)
            else if (cmdLower.startsWith('set font=') || cmdLower.startsWith('s font=')) {
                const fontMatch = cmd.match(/(?:set|s)\s+font\s*=\s*"([^"]+)"/i);
                if (fontMatch) {
                    const fontName = fontMatch[1].toLowerCase();
                    const actualFont = availableFonts.find(font => font.toLowerCase() === fontName);
                    if (actualFont) {
                        setFont(actualFont);
                        output = `<div>Font changed to: <span class="highlight">${actualFont}</span></div>`;
                    } else {
                        output = `<div class="error-message">Invalid font. Available fonts: ${availableFonts.join(', ')}</div>`;
                    }
                } else {
                    output = `<div class="error-message">Invalid syntax. Use: set font="terminal" or s font="courier new"</div>`;
                }
            }

            // Handle shutdown commands
            else if (cmdLower === 'h' || cmdLower === 'halt' || cmdLower === 'exit' || cmdLower === 'shutdown') {
                if (!isShuttingDown) {
                    isShuttingDown = true;
                    shutdownTerminal();
                }
                return;
            }
            else {
            // Handle Kill command (case insensitive)
            const killMatch = cmd.match(/^([Kk][Ii][Ll][Ll])\s+\^([A-Za-z0-9]+)(?:\(([^)]+)\))?/);
            const zkillMatch = cmd.match(/^([Zz][Kk][Ii][Ll][Ll])\s+\^([A-Za-z0-9]+)(?:\(([^)]+)\))?/);
            if (killMatch) {
                const globalName = killMatch[2];
                output = `<div class="error-message">&lt;PROTECT&gt; ^${globalName} is protected and cannot be killed.</div>`;
            }
            else if  (zkillMatch) {
                const globalName = zkillMatch[2];
                output = `<div class="error-message">^${globalName} cannot be killed.</div>`;
            }
            // Handle Set command (case insensitive)
            else if (cmd.match(/^([Ss][Ee][Tt])\s+\^/)) {
                const setMatch = cmd.match(/^([Ss][Ee][Tt])\s+\^([A-Za-z0-9]+)(?:\(([^)]+)\))?\s*=\s*(.+)$/);
                if (setMatch) {
                    const globalName = setMatch[2];
                    const value = setMatch[4];
                    output = `<div class="funny-message">Nice try! You can't set ^${globalName} to "${value}". This portfolio is read-only, just like my patience for bad jokes!</div>`;
                } else {
                    output = `<div class="funny-message">Invalid SET command syntax. But don't worry, even if it was correct, you still couldn't set anything here!</div>`;
                }
            }
            // Handle Write command (case insensitive)
            else if (cmd.match(/^([Ww][Rr][Ii][Tt][Ee])\s+\^/)) {
                const writeMatch = cmd.match(/^([Ww][Rr][Ii][Tt][Ee])\s+\^([A-Za-z0-9]+)/);
                if (writeMatch) {
                    const globalName = writeMatch[2].toLowerCase();
                    if (portfolioData[globalName]) {
                        const section = portfolioData[globalName];
                        output = `
                            <div class="section">
                                <div class="section-title">${section.title}</div>
                                <div>${section.content}</div>
                            </div>
                        `;

                        // Show cards if available
                        if (section.cards) {
                            showCards(section.cards, globalName);
                        }
                    } else {
                        output = `<div>Global not found. Type <span class="mumps-command">W ^Help</span> for available globals.</div>`;
                    }
                }
            }
            /// handle functions
            else if (cmd.match(/^([Ww])\s+(\$[A-Za-z]+)/)) {
                const wMatch = cmd.match(/^([Ww])\s+(\$[A-Za-z]+)/);
                if (wMatch[2].toLowerCase() === '$h' || wMatch[2].toLowerCase() === '$horolog') {
                    const now = new Date();
                    const baseDate = new Date('1840-12-31T00:00:00Z');
                    const msPerDay = 24 * 60 * 60 * 1000;
                    const days = Math.floor((now - baseDate) / msPerDay);
                    const seconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
                    output = `<div class="error-message">${days},${seconds}</div>`;
                }
                else {
                    output = `<div>Not implemented. Type <span class="command">help</span> or <span class="mumps-command">W ^Help</span> for available commands.</div>`;
                }

            }
            // Handle W command (case insensitive)
            else if (cmd.match(/^([Ww])\s+\^/)) {
                const wMatch = cmd.match(/^([Ww])\s+\^([A-Za-z0-9]+)/);

                if (wMatch) {
                    const globalName = wMatch[2].toLowerCase();
                    if (portfolioData[globalName]) {
                        const section = portfolioData[globalName];
                        output = `
                            <div class="section">
                                <div class="section-title">${section.title}</div>
                                <div>${section.content}</div>
                            </div>
                        `;

                        // Show cards if available
                        if (section.cards) {
                            showCards(section.cards, globalName);
                        }
                    } else {
                        output = `<div>Global not found. Type <span class="mumps-command">W ^Help</span> for available globals.</div>`;
                    }
                }
            }
            else if (/^(ZWrite|ZW)\s+\^/i.test(cmd)) {
                const match = cmd.match(/^(ZWrite|ZW)\s+\^([A-Za-z0-9]+)/i);
                if (match) {
                    const globalName = match[2].toLowerCase();
                    if (portfolioData[globalName]) {
                        const section = portfolioData[globalName];
                        output = `
                            <div class="section">
                                <div class="section-title">${section.title}</div>
                                <div>${section.content}</div>
                            </div>
                        `;
                        if (section.cards) {
                            showCards(section.cards, globalName);
                        }
                    } else {
                        output = `<div>Global not found. Type <span class="mumps-command">W ^Help</span> for available globals.</div>`;
                    }
                }
            }
            // Handle K command (case insensitive)
            else if (cmd.match(/^([Kk])\s+\^/)) {
                const kMatch = cmd.match(/^([Kk])\s+\^([A-Za-z0-9]+)(?:\(([^)]+)\))?/);
                if (kMatch) {
                    const globalName = kMatch[2];
                    output = `<div class="error-message">&lt;PROTECT&gt; ^${globalName} is protected and cannot be killed.</div>`;
                }
            }
            // Handle S command (case insensitive)
            else if (cmd.match(/^([Ss])\s+\^/)) {
                const sMatch = cmd.match(/^([Ss])\s+\^([A-Za-z0-9]+)(?:\(([^)]+)\))?\s*=\s*(.+)$/);
                if (sMatch) {
                    const globalName = sMatch[2];
                    const value = sMatch[4];
                    output = `<div class="funny-message">Nice try! You can't set ^${globalName} to "${value}". This portfolio is read-only, just like my patience for bad jokes!</div>`;
                } else {
                    output = `<div class="funny-message">Invalid SET command syntax. But don't worry, even if it was correct, you still couldn't set anything here!</div>`;
                }
            }
            // Handle general commands
            else if (portfolioData[cmdLower]) {
                const section = portfolioData[cmdLower];
                output = `
                    <div class="section">
                        <div class="section-title">${section.title}</div>
                        <div>${section.content}</div>
                    </div>
                `;

                // Show cards if available
                if (section.cards) {
                    showCards(section.cards, cmdLower);
                }
            } else if (cmd === '') {
                output = '';
            } else {
                output = `<div>Command not recognized. Type <span class="command">help</span> or <span class="mumps-command">W ^Help</span> for available commands.</div>`;
            }
            }
            if (output) {
                const outputDiv = document.createElement('div');
                outputDiv.className = 'output';
                outputDiv.innerHTML = output;

                // Insert output after the command line
                commandLine.insertAdjacentElement('afterend', outputDiv);
            }

            // Add new command line after the output
            addCommandLine();
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }

        // Set theme function
        function setTheme(themeName) {
            document.body.setAttribute('data-theme', themeName);

            // Update theme toggle button
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeName === 'light') {
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }
        }

        // Kill theme function - reset to default
        function killTheme() {
            setTheme(defaultTheme);
        }

        // Set font function
        function setFont(fontName) {
            document.body.style.fontFamily = `'${fontName}', monospace`;

            // Update all input elements to use the new font
            const inputs = document.querySelectorAll('.command-input');
            inputs.forEach(input => {
                input.style.fontFamily = `'${fontName}', monospace`;
            });
        }

        // Kill font function - reset to default
        function killFont() {
            setFont(defaultFont);
        }

        // Set terminal style function
        function setTerminalStyle(style) {
            const terminalTitle = document.querySelector('.terminal-title');
            const buttonsContainer = document.querySelector('.terminal-buttons');

            if (style === 'windows') {
                terminal.classList.add('windows');
                // Change title to Windows style
                terminalTitle.textContent = 'ashok@portfolio';
                // Reorder buttons for Windows style
                buttonsContainer.innerHTML = `
                    <div class="btn minimize" onclick="minimizeTerminal()">−</div>
                    <div class="btn maximize" onclick="maximizeTerminal()">□</div>
                    <div class="btn close" onclick="shutdownTerminal()">✕</div>
                `;
            } else {
                terminal.classList.remove('windows');
                // Change title back to Mac style
                terminalTitle.textContent = 'Ashok@portfolio';
                // Reorder buttons for Mac style
                buttonsContainer.innerHTML = `
                    <div class="btn close" onclick="shutdownTerminal()">✕</div>
                    <div class="btn minimize" onclick="minimizeTerminal()">−</div>
                    <div class="btn maximize" onclick="maximizeTerminal()">□</div>
                `;
            }
        }

        // Maximize terminal function
        function maximizeTerminal() {
            if (!isMaximized) {
                terminal.classList.add('maximized');
                isMaximized = true;

                // Change maximize button to restore icon
                const maximizeBtn = document.querySelector('.btn.maximize');
                maximizeBtn.textContent = '❐';

                // Hide cards section when maximizing
                cardsSection.style.display = 'none';
                closeCardsBtn.style.display = 'none';
            } else {
                minimizeTerminal();
            }
        }

        // Minimize terminal function
        function minimizeTerminal() {
            terminal.classList.remove('maximized');
            isMaximized = false;

            // Change restore button back to maximize icon
            const maximizeBtn = document.querySelector('.btn.maximize');
            maximizeBtn.textContent = '□';
        }

        // Shutdown terminal function
        function shutdownTerminal() {
            const shutdownMessages = [
                { text: "[ ok ] Stopping network Manager", status: "ok" },
                { text: "[ ok ] saving system clock", status: "ok" },
                { text: "[ ok ] disabling swap", status: "ok" },
                { text: "[ ok ] all files unmounted", status: "ok" }
            ];

            let messageIndex = 0;

            function displayNextMessage() {
                if (messageIndex < shutdownMessages.length) {
                    const message = shutdownMessages[messageIndex];
                    const outputDiv = document.createElement('div');
                    outputDiv.className = 'output';

                    const statusClass = message.status === 'ok' ? 'shutdown-ok' : 'shutdown-fail';
                    outputDiv.innerHTML = `<div class="shutdown-message"><span class="${statusClass}">${message.text}</span></div>`;

                    terminalBody.appendChild(outputDiv);
                    terminalBody.scrollTop = terminalBody.scrollHeight;

                    messageIndex++;
                    setTimeout(displayNextMessage, 800);
                } else {
                    // All messages displayed, now show suspended screen
                    setTimeout(() => {
                        terminal.style.opacity = '0';
                        terminal.style.transform = 'scale(0.95)';

                        setTimeout(() => {
                            terminal.style.display = 'none';
                            suspendedScreen.style.display = 'flex';
                            setTimeout(() => {
                                suspendedScreen.style.opacity = '1';
                                // Save the suspended state to localStorage
                                localStorage.setItem('terminalSuspended', 'true');
                            }, 50);
                        }, 500);
                    }, 1000);
                }
            }

            displayNextMessage();
        }

        // Reactivate terminal function
        function reactivateTerminal() {
            // Show loading bar
            loadingContainer.style.display = 'flex';
            loadingProgress.style.width = '0%';

            // Simulate loading progress
            let progress = 0;
            const loadingInterval = setInterval(() => {
                progress += 5;
                loadingProgress.style.width = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(loadingInterval);

                    // Hide loading bar
                    setTimeout(() => {
                        loadingContainer.style.display = 'none';

                        // Hide suspended screen
                        suspendedScreen.style.opacity = '0';

                        setTimeout(() => {
                            suspendedScreen.style.display = 'none';
                            terminal.style.display = 'block';

                            setTimeout(() => {
                                terminal.style.opacity = '1';
                                terminal.style.transform = 'scale(1)';
                                isShuttingDown = false;

                                // Clear command history
                                commandHistory = [];
                                historyIndex = -1;

                                // Clear suspended state from localStorage
                                localStorage.removeItem('terminalSuspended');

                                // Clear terminal and show welcome message
                                terminalBody.innerHTML = `
                                    <div class="ascii-art">${getRandomAsciiArt()}</div>
                                    <div class="output">
System reactivated. Welcome back!
Available commands:
<span class="mumps-command">W ^About</span> - Display about information
<span class="mumps-command">W ^Projects</span> - Show project portfolio
<span class="mumps-command">W ^Certification</span> - View certifications
<span class="mumps-command">W ^Contact</span> - Contact information
<span class="mumps-command">W #</span> - Clear terminal
<span class="mumps-command">W ^Help</span> - Show all commands
Or use general commands: about, projects, certification, contact, help, clear, resume
                                    </div>
                                `;
                                addCommandLine();
                            }, 100);
                        }, 500);
                    }, 500);
                }
            }, 100);
        }

        // Show cards (projects or certifications)
        function showCards(cards, type) {
            cardsWrapper.innerHTML = '';
            cardsSection.style.display = 'block';
            closeCardsBtn.style.display = 'block';

            // Reset scroll position to 0 when showing new cards
            currentScrollPosition = 0;
            cardsWrapper.style.transform = `translateX(0px)`;

            cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';

                if (type === 'contact') {
                    // Special rendering for contact cards
                    cardElement.innerHTML = `
                        <div class="contact-card-item">
                            <div class="contact-card-icon">${card.icon}</div>
                            <div class="contact-card-content">
                                <div class="contact-card-title">${card.title}</div>
                                <div class="contact-card-detail">${card.description}</div>
                                <div class="contact-card-detail" style="margin-top: 8px;">${card.details}</div>
                                <div class="tech-tags" style="margin-top: 10px;">
                                    ${card.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    // Standard rendering for project and certification cards
                    cardElement.innerHTML = `
                        <h3>${card.title}</h3>
                        <p>${card.description}</p>
                        <div class="tech-tags">
                            ${card.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                        </div>
                    `;
                }

                cardsWrapper.appendChild(cardElement);
            });

            // Update arrow states after cards are rendered
            setTimeout(() => {
                updateArrows();
            }, 50);

            // Scroll to cards
            cardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Scroll cards with arrow buttons
        function scrollCards(direction) {
            const maxScroll = (cardsWrapper.children.length - 1) * cardWidth;

            if (direction === 'left') {
                currentScrollPosition = Math.max(0, currentScrollPosition - cardWidth);
            } else {
                currentScrollPosition = Math.min(maxScroll, currentScrollPosition + cardWidth);
            }

            cardsWrapper.style.transform = `translateX(-${currentScrollPosition}px)`;
            updateArrows();
        }

        // Update arrow button states
        function updateArrows() {
            const maxScroll = (cardsWrapper.children.length - 1) * cardWidth;

            leftArrow.disabled = currentScrollPosition <= 0;
            rightArrow.disabled = currentScrollPosition >= maxScroll;
        }

        // Close cards
        function closeCards() {
            cardsSection.style.display = 'none';
            closeCardsBtn.style.display = 'none';
            terminalBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Add new command line
        function addCommandLine() {
            const commandLine = document.createElement('div');
            commandLine.className = 'command-line';
            commandLine.innerHTML = `
                <span class="prompt">Ashok></span>
                <input type="text" class="command-input" autofocus>
                <span class="cursor"></span>
            `;
            terminalBody.appendChild(commandLine);

            const input = commandLine.querySelector('.command-input');
            input.focus();

            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const command = input.value;
                    commandLine.innerHTML = `<span class="prompt">Ashok></span> ${command}`;
                    processCommand(command, commandLine);
                } else if (e.key === 'ArrowUp') {
                    // Navigate up in command history
                    if (historyIndex > 0) {
                        historyIndex--;
                        input.value = commandHistory[historyIndex];
                    }
                    e.preventDefault();
                } else if (e.key === 'ArrowDown') {
                    // Navigate down in command history
                    if (historyIndex < commandHistory.length - 1) {
                        historyIndex++;
                        input.value = commandHistory[historyIndex];
                    } else {
                        historyIndex = commandHistory.length;
                        input.value = '';
                    }
                    e.preventDefault();
                }
            });
        }

        // Handle initial command input
        commandInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = commandInput.value;
                const commandLine = commandInput.parentElement;
                commandLine.innerHTML = `<span class="prompt">Ashok></span> ${command}`;
                processCommand(command, commandLine);
            } else if (e.key === 'ArrowUp') {
                // Navigate up in command history
                if (historyIndex > 0) {
                    historyIndex--;
                    commandInput.value = commandHistory[historyIndex];
                }
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                // Navigate down in command history
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    commandInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    commandInput.value = '';
                }
                e.preventDefault();
            }
        });

        // Simulate resume download
        function downloadResume() {
            // Replace this URL with your actual PDF file URL
            const resumeUrl = 'assets/resume/Ashok_Resume.pdf';

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Ashok_Resume.pdf';
            link.target = '_blank'; // Open in new tab

            // Trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--highlight-color);
                color: var(--bg-color);
                padding: 15px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(255, 153, 0, 0.5);
                z-index: 1000;
                font-weight: bold;
            `;
            notification.textContent = 'Resume download started!';
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s';
                setTimeout(() => notification.remove(), 500);
            }, 2000);
        }

        // Add event listeners for arrow buttons
        leftArrow.addEventListener('click', () => scrollCards('left'));
        rightArrow.addEventListener('click', () => scrollCards('right'));

        // Initialize the page when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializePage);
    