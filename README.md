# Premium Creative Developer Portfolio

Welcome to your incredibly powerful, Awwwards-certified portfolio template. 
This project was built from the ground up to feature advanced 3D scrolling algorithms and physics-based cursor interactions, while remaining **100% editable by anyone with zero web development experience.**

## 🚀 How to Customize the Portfolio

All customizable content (names, stats, links, and projects) has been extracted into a single "Database" file. 
You **never** need to touch the complex HTML, CSS, or internal GSAP mathematics.

### Step 1: Open `data.js`
Open the `data.js` file in any code editor (VSCode, Notepad, etc.).

### Step 2: Edit Your Information
You will see heavily commented JSON objects. Simply replace the strings with your own data:
- `personal`: Change your name, bio, and social links.
- `projects`: Add, edit, or remove projects here. The layout engine will mathematically recalculate the 3D horizontal scrolling width automatically based on how many projects you add!
- `stats`: Update your numerical achievements. Setting `highlight: true` will automatically turn the number your accent color.

### Step 3: View Changes
Double-click the `index.html` file to open it in your browser. Perform a hard refresh (`Ctrl + F5` or `Cmd + Shift + R`) to instantly see your changes applied dynamically!

## 🖼️ Changing Your Profile Picture
1. Delete the default `profile.png` file in this directory.
2. Add your own high-resolution headshot.
3. Rename your new image to exactly `profile.png`.
It will automatically be processed by the GSAP masking algorithms.

## ✨ Icons
Project icons use the [Lucide](https://lucide.dev/icons) open-source library. 
To change a project icon in `data.js`:
1. Go to lucide.dev/icons
2. Find an icon (e.g., `cpu`, `database`, `smartphone`)
3. Type that exact word into the `icon: "..."` field in your `data.js` project object!

## 🌐 How to Deploy (Free!)
Since this portfolio runs on a **100% Client-Side Static Architecture** (no Node.js, no servers), deploying it is instantaneous:
1. Create a new repository on GitHub named `yourusername.github.io`.
2. Upload all the files in this folder directly into that repository.
3. Your site is instantly live at `https://yourusername.github.io`!

## ⚙️ Advanced: Changing the Accent Color
By default, the accent color is a striking Neon Orange (`#ff3300`). 
If you *do* want to touch the CSS, open `style.css` and change the `--accent` variable on line 6 to any hex code you desire! All glowing auroras, buttons, and text highlights will automatically update to match.
