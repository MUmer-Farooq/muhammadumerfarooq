        const introQueryLines = [
            "<span class='keyword'>CONNECT TO</span> data_warehouse;",
            "<span class='keyword'>SELECT</span> * <span class='keyword'>FROM</span> portfolio_metrics",
            "<span class='keyword'>WHERE</span> analyst = <span class='string'>\\'Muhammad Umer Farooq\\'</span>",
            "  <span class='keyword'>AND</span> role = <span class='string'>\\'Data Analyst\\'</span>",
            "<span class='keyword'>EXECUTE</span> Dashboard_View;"
        ];

        const introOutputDiv = document.getElementById('intro-code-output');
        const introExecutingDiv = document.getElementById('intro-executing');
        const introSuccessDiv = document.getElementById('intro-success');
        const introTerminal = document.getElementById('intro-terminal');
        const introChartWrapper = document.getElementById('intro-chartWrapper');
        const introFinalReveal = document.getElementById('intro-finalReveal');
        const introSpinner = document.getElementById('intro-spinner');

        let introCurrentLine = 0;

        function introTypeLine() {
            if (introCurrentLine < introQueryLines.length) {
                const lineDiv = document.createElement('div');
                lineDiv.innerHTML = introQueryLines[introCurrentLine];
                lineDiv.style.opacity = 0;
                lineDiv.style.transform = 'translateY(5px)';
                lineDiv.style.transition = 'all 0.1s ease';
                introOutputDiv.appendChild(lineDiv);
                
                lineDiv.offsetHeight; 
                lineDiv.style.opacity = 1;
                lineDiv.style.transform = 'translateY(0)';

                introCurrentLine++;
                setTimeout(introTypeLine, 120); 
            } else {
                setTimeout(introExecuteSql, 300);
            }
        }

        function introExecuteSql() {
            introExecutingDiv.style.display = 'block';
            const frames = ['/', '-', '\\\\', '|'];
            let f = 0;
            const spinInt = setInterval(() => { introSpinner.innerText = frames[f++ % frames.length]; }, 80);

            setTimeout(() => {
                clearInterval(spinInt);
                introExecutingDiv.style.display = 'none';
                introSuccessDiv.style.display = 'block';
                setTimeout(introMorphToDashboard, 700);
            }, 800); 
        }

        function introMorphToDashboard() {
            introTerminal.style.transform = 'scale(0.8) translateY(-30px)';
            introTerminal.style.opacity = '0';
            
            setTimeout(() => {
                introTerminal.style.display = 'none';
                introChartWrapper.style.opacity = '1';
                introChartWrapper.style.transform = 'scale(1)';
                introRenderDashboard();
                
                setTimeout(introShowFinalReveal, 3500);
            }, 600);
        }

        function introRenderDashboard() {
            const ctxMain = document.getElementById('intro-mainChart').getContext('2d');
            const gradientMain = ctxMain.createLinearGradient(0, 0, 0, 300);
            gradientMain.addColorStop(0, 'rgba(0, 242, 254, 0.4)');
            gradientMain.addColorStop(1, 'rgba(0, 242, 254, 0.0)');

            new Chart(ctxMain, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                    datasets: [{
                        label: 'Performance',
                        data: [45, 85, 60, 110, 90, 145, 120, 210],
                        borderColor: '#00f2fe',
                        backgroundColor: gradientMain,
                        borderWidth: 3,
                        pointBackgroundColor: '#0f172a',
                        pointBorderColor: '#00f2fe',
                        pointBorderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    animation: { duration: 2000, easing: 'easeOutQuart' },
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { display: false },
                        x: { grid: { color: 'rgba(255,255,255,0.05)' } }
                    }
                }
            });

            new Chart(document.getElementById('intro-doughnutChart').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Python', 'SQL', 'Power BI', 'Excel'],
                    datasets: [{
                        data: [40, 30, 20, 10],
                        backgroundColor: ['#00f2fe', '#4facfe', '#818cf8', '#e2e8f0'],
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    animation: { duration: 2000, delay: 300, easing: 'easeOutQuart' },
                    plugins: { 
                        legend: { position: 'bottom', labels: { boxWidth: 10, color: '#e2e8f0' } } 
                    },
                    cutout: '75%'
                }
            });
        }

        const introLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

function introDecodeText(element) {
            let iteration = 0;
            const finalValue = element.dataset.value;
            
            // Always clear any existing interval first using the stored reference
            const existingInterval = element.dataset.interval;
            if (existingInterval) {
                clearInterval(existingInterval);
            }
            
            // Create new interval and store its reference
            const newInterval = setInterval(() => {
                element.innerText = finalValue.split("").map((letter, index) => {
                    if(index < iteration) { return finalValue[index]; }
                    return introLetters[Math.floor(Math.random() * introLetters.length)];
                }).join("");
                
                if(iteration >= finalValue.length) {
                    clearInterval(newInterval);
                    element.dataset.interval = null; // Clear reference after stopping
                }
                iteration += 1 / 3;
            }, 30);
            
            // Store the new interval reference
            element.dataset.interval = newInterval;
        }

        function introShowFinalReveal() {
            // Completely hide dashboard
            introChartWrapper.style.transform = 'translateY(20px)';
            introChartWrapper.style.opacity = '0';

            introFinalReveal.style.opacity = '1';
            introFinalReveal.style.transform = 'translateY(0)';
            
            const nameEl = document.getElementById('intro-nameText');
            const titleEl = document.getElementById('intro-titleText');
            introDecodeText(nameEl);
            setTimeout(() => introDecodeText(titleEl), 300); // Faster title start

            // Wait 1 second after the name finishes decoding before transitioning to the portfolio
            setTimeout(() => {
                enterMainSite();
            }, 2200); // 1200ms for decoding + 1000ms delay
        }

document.getElementById('intro-nameText').onmouseover = event => introDecodeText(event.target);
        document.getElementById('intro-titleText').onmouseover = event => introDecodeText(event.target);

        function enterMainSite() {
            const intro = document.getElementById('portfolio-intro');
            intro.style.opacity = '0'; // Fade out before redirect
            sessionStorage.setItem('introShown', 'true'); // Mark intro as shown
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to main portfolio
            }, 300);
        }

// Check if intro was already shown to prevent re-running
        function startIntro() {
            if (sessionStorage.getItem('introShown') === 'true') {
                // Intro already shown, redirect to main site
                window.location.href = 'index.html';
                return;
            }
            // Show the intro animation
            setTimeout(introTypeLine, 500);
        }

        window.addEventListener('load', startIntro);
