// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["Java Developer", "Software Engineer", "DSA Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
  fetchLeetCodeStats();
  fetchMonkeyTypeStats();
});

// Spotlight effect for Glass Panels
document.body.addEventListener("mousemove", e => {
    document.querySelectorAll('.glass-panel').forEach(card => {
        const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
              
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

// Fetch Live MonkeyType Stats
async function fetchMonkeyTypeStats() {
    try {
        const response = await fetch('https://api.monkeytype.com/users/the_abhay/profile');
        const result = await response.json();
        
        if (result.message === "Profile retrieved" && result.data) {
            let max60 = 0;
            let max120 = 0;
            const pbsTime = result.data.personalBests?.time;
            
            if (pbsTime) {
                if (pbsTime['60']) {
                    pbsTime['60'].forEach(record => {
                        if (record.wpm > max60) max60 = record.wpm;
                    });
                }
                if (pbsTime['120']) {
                    pbsTime['120'].forEach(record => {
                        if (record.wpm > max120) max120 = record.wpm;
                    });
                }
            }
            
            let finalWpm = 0;
            if (max60 > 0 && max120 > 0) {
                finalWpm = (max60 + max120) / 2;
            } else if (max60 > 0 || max120 > 0) {
                finalWpm = max60 || max120; // Fallback to whatever is available
            }
            
            if (finalWpm > 0) {
                const mtCounter = document.getElementById('monkeytype-counter');
                if (mtCounter) {
                    mtCounter.setAttribute('data-target', Math.round(finalWpm));
                    if (mtCounter.classList.contains('counted')) {
                        animateCounter(mtCounter);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Could not fetch MonkeyType stats:", error);
    }
}

// Fetch Live LeetCode Stats
async function fetchLeetCodeStats() {
    try {
        // Using a reliable public proxy API for LeetCode
        const response = await fetch('https://leetcode-api-faisalshohag.vercel.app/the_abhay');
        const data = await response.json();
        
        if (data && data.totalSolved !== undefined) {
            const lcCounter = document.getElementById('leetcode-counter');
            if (lcCounter) {
                // Update the target amount before the intersection observer triggers it
                lcCounter.setAttribute('data-target', data.totalSolved);
                // Also update the UI immediately if it's already rendered
                if (lcCounter.classList.contains('counted')) {
                    // Re-trigger the counting animation now that we have the live data!
                    animateCounter(lcCounter);
                }
            }
        }
    } catch (error) {
        console.error("Could not fetch LeetCode stats:", error);
    }
}

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal, .reveal-right');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // If it's a counter, animate the number
            const counter = entry.target.querySelector('.counter');
            if (counter && !counter.classList.contains('counted')) {
                animateCounter(counter);
                counter.classList.add('counted');
            }
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Number Counter Animation
function animateCounter(counterElement) {
    const target = +counterElement.getAttribute('data-target');
    const duration = 2000; // ms
    const increment = target / (duration / 16); // 60fps
    
    let current = 0;
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counterElement.innerText = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            counterElement.innerText = target + '+';
        }
    };
    updateCounter();
}

// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.add('scrolled'); // keep it or remove it based on preference
        // Removing it looks better when at the very top:
        if (window.scrollY === 0) header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
            
            // active link sync
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        }
    });
});


