// This file acts as your Local Content Management System (CMS).
// Anyone can edit this file to completely personalize the entire portfolio website!
// You DO NOT need to touch the HTML or CSS.

window.portfolioData = {
    personal: {
        logoText: "A.S", // Displayed in the top left navbar
        firstName: "ABHAY",
        lastName: "SINGH",
        subtitle: "Backend & Android", // Displayed above the hero description
        heroDescription: "Engineering elegant logic and",
        heroCarouselWords: [ // These are the rotating words in the hero section
            "immersive digital architectures.",
            "scalable backend systems.",
            "stunning native applications.",
            "immersive digital architectures." // IMPORTANT: Duplicate your first word here for a smooth infinite animation loop!
        ],
        bgMarqueeText: "SOFTWARE ENGINEER — CREATIVE DEVELOPER — ANDROID ARCHITECT — SOFTWARE ENGINEER — CREATIVE DEVELOPER — ANDROID ARCHITECT —",
        aboutHeadline: "Bridging the gap<br>between backend logic<br>and interactive UI.",
        aboutDescription: "Currently pursuing a B.Tech in Computer Science at Galgotias College. I write Java logic for the backend, architect seamless Kotlin apps for Android, and design highly aesthetic frontends.",
        skills: [ // Your pill-shaped skill badges
            "Java (90%)", "Android (75%)", "Spring Boot", "MySQL"
        ],
        contactEmail: "singhabhay0854@gmail.com",
        githubUrl: "https://github.com/theabhay1",
        linkedinUrl: "https://linkedin.com/in/the-abhay/",
        copyrightYear: "2026",
        copyrightName: "ABHAY SINGH"
    },
    
    projects: [
        {
            category: "ARTIFICIAL INTELLIGENCE",
            title: "Smart Email<br>Reply",
            description: "Spring Boot backend fully integrated with Google's Gemini API for lightning-fast, context-aware AI email response generation.",
            link: "https://github.com/theabhay1/Smart-Email-Reply",
            icon: "bot" // Find hundreds of icons at https://lucide.dev/icons
        },
        {
            category: "ALGORITHMIC VISUALIZATION",
            title: "Sorting<br>Visualizer",
            description: "An interactive JavaFX desktop physics engine animating six major algorithm strategies with precise real-time complexity mapping.",
            link: "https://github.com/theabhay1/Sorting-Visualizer",
            icon: "bar-chart-2"
        },
        {
            category: "ANDROID NATIVE",
            title: "File Hub<br>Manager",
            description: "Robust MVVM architectural file management app utilizing the native Android StatFs API and rendered with Jetpack Compose.",
            link: "https://github.com/theabhay1/file-hub",
            icon: "folder"
        }
    ],

    stats: [
        { 
            target: 259, 
            label: "LEETCODE SOLVED", 
            suffix: "+", 
            highlight: false, // If true, the number turns into your accent color (Neon Orange)
            link: "https://leetcode.com/u/the_abhay/",
            apiUrl: "https://leetcode-api-faisalshohag.vercel.app/the_abhay", // Automatically fetches live stats
            apiPath: "totalSolved" // The JSON key to extract
        },
        { 
            target: 7, 
            label: "CODING NINJAS", 
            suffix: "+", 
            highlight: false,
            link: "https://www.naukri.com/code360/profile/theabhay"
        },
        { 
            target: 95, 
            label: "WPM SPEED", 
            suffix: "+", 
            highlight: true,
            link: "https://monkeytype.com/profile/the_abhay"
        }
    ]
};
