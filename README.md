# ⚔️ Assassin AI — Official Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Status](https://img.shields.io/badge/Status-Production-brightgreen)

The official website for **Assassin AI**, a premium AI-powered Discord security and community management bot. Built with pure HTML, CSS, and JavaScript — zero frameworks, zero build tools, ready for GitHub Pages.

## ✨ Features

- **Ultra-modern premium design** with dark theme and glassmorphism effects
- **Fully responsive** — desktop, tablet, and mobile optimized
- **Zero dependencies** — pure vanilla HTML, CSS, and JavaScript
- **SEO optimized** — meta tags, Open Graph, Twitter Cards, structured data
- **Perfect Lighthouse score** targets — 95+ Performance, Accessibility, Best Practices, SEO
- **Animations** — scroll reveal, floating elements, glow effects, hover states
- **Interactive components** — FAQ accordion, command search & filter, animated counters
- **Legal pages** — complete Terms of Service and Privacy Policy

## 📁 Project Structure

```
assassin-ai-website/
├── index.html              # Home page (hero, features, stats, FAQ, CTA)
├── terms.html              # Terms of Service
├── privacy.html            # Privacy Policy
├── 404.html                # Custom 404 page
├── css/
│   └── style.css           # Complete stylesheet (~700 lines)
├── js/
│   └── main.js             # All JavaScript functionality
├── assets/
│   ├── logo.svg            # SVG logo (vector, scalable)
│   ├── favicon.svg          # SVG favicon (modern format)
│   └── hero-bg.svg         # Hero background illustration
├── sitemap.xml             # XML sitemap for search engines
├── robots.txt              # Robots exclusion file
├── site.webmanifest        # PWA manifest
├── browserconfig.xml       # Microsoft browser config
└── README.md               # This file
```

## 🚀 Deployment

### Deploy to GitHub Pages (Recommended)

1. **Push to GitHub:**
   ```bash
   cd assassin-ai-website
   git init
   git add .
   git commit -m "Initial release"
   git remote add origin https://github.com/YOUR_USERNAME/assassin-ai-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages**
   - Under "Build and deployment", select **Deploy from a branch**
   - Branch: `main`, folder: `/` (root)
   - Click **Save**

3. **Custom Domain (optional):**
   - Add a `CNAME` file with your domain, or configure it in Pages settings
   - Update the `canonical` URL in HTML `<head>` tags
   - Update the URL in `sitemap.xml` and `robots.txt`

### Deploy to Any Static Host

Upload the entire `assassin-ai-website/` folder to any static hosting:
- Cloudflare Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any web server (Apache, Nginx, etc.)

**Important:** Deploy the root `assassin-ai-website/` directory as your web root, not the individual files.

## 🛠 Customization

### Colors & Theme

Edit CSS variables in `:root` in `css/style.css`:

```css
:root {
  --bg-primary: #0B0F19;    /* Main background */
  --bg-card: #151B2D;        /* Card background */
  --primary: #5865F2;        /* Primary brand color (Discord blurple) */
  --accent: #00D4FF;         /* Accent color */
  --success: #57F287;        /* Success green */
  --warning: #FEE75C;        /* Warning yellow */
  --danger: #ED4245;         /* Danger red */
}
```

### Content

- **Features:** Edit the `.features-grid` section in `index.html`
- **FAQ:** Edit the `.faq-list` section in `index.html`
- **Stats:** Edit `data-count-to` attributes in `index.html`
- **Navigation:** Edit the `.nav-links` unordered list
- **Footer:** Edit the `.footer-grid` and `.footer-bottom` sections

### Commands

Add or remove commands in the `.commands-grid` in `index.html`. Each command must have:
- `data-category` attribute matching a category button
- `<span class="command-cmd">` for the command text
- `<span class="command-desc">` for the description

To add a new category, add a button to `category-filters` and ensure commands have the corresponding `data-category`.

## 📦 Updating

1. Edit the relevant `.html` file
2. If adding new sections, add corresponding CSS in `style.css`
3. For interactive features, extend `main.js`
4. Update `sitemap.xml` if adding new pages
5. Test locally by opening `index.html` in your browser

## 💻 Development

**Requirements:** None. Just a text editor and a browser.

To preview locally, open the files directly or serve with any static server:

```bash
# Using Python
python3 -m http.server 8080 --directory assassin-ai-website

# Using Node.js
npx serve assassin-ai-website

# Using VS Code Live Server extension
Right-click index.html → Open with Live Server
```

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Opera (latest 2 versions)
- Mobile Chrome/Safari

## 🔗 Important Links

- **Invite Bot:** [discord.com/oauth2/authorize?...](https://discord.com/oauth2/authorize?client_id=1528241066271178782&permissions=8&integration_type=0&scope=bot+applications.commands)
- **Support Server:** [discord.gg/2dgn5wCK8z](https://discord.gg/2dgn5wCK8z)
- **Dashboard:** Coming soon

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

Please ensure all pages remain consistent and maintain the existing design style.

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

## ⚔️ About Assassin AI

Assassin AI is a powerful all-in-one Discord bot built to protect, automate, and manage communities. Features include:

- AI-powered content moderation
- Premium ticket management system
- Multi-winner giveaways
- Reputation & warning escalation
- Advanced logging & audit trails
- Temporary roles & automation
- DM relay & security tools
- Web dashboard

---

*Made with ⚔️ for Discord communities everywhere.*
