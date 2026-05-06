# G'Secure Labs — Website

A static, multi-page website for G'Secure Labs. Pure HTML, CSS, and JavaScript — no build step, no dependencies.

## Folder Structure

```
gsecurelabs/
├── index.html              ← homepage
├── about.html              ← about us
├── contact.html            ← contact + offices
├── mdr.html                ← managed detection & response
├── soc.html                ← security operations center
├── grc.html                ← governance, risk, compliance
├── vapt.html               ← penetration testing
├── coe.html                ← centre of excellence
├── essentials.html         ← G'Secure Essentials
├── edr.html, ndr.html, ueba.html, ...   ← service detail pages
├── healthcare-compliance.html
├── finance-compliance.html
├── professional-compliance.html
├── success-stories.html
├── insights.html
├── news-room.html
├── partners.html
├── security-assessment.html
├── vercel.json             ← Vercel config (optional, sensible defaults)
└── assets/
    ├── css/style.css
    └── js/main.js
```

26 pages total. Every nav link works.

---

## Deploy in 5 minutes — GitHub + Vercel

### 1. Push to GitHub

```bash
cd gsecurelabs
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gsecurelabs.git
git push -u origin main
```

If you don't have a repo yet:
- Go to https://github.com/new
- Name it `gsecurelabs` (or anything you like)
- Leave it empty (no README, no .gitignore — we already have them)
- Run the push commands above with your username

### 2. Deploy on Vercel

1. Go to https://vercel.com/new
2. Click **Import** next to your GitHub repo
3. Framework preset: **Other** (Vercel will auto-detect static)
4. Leave Build Command and Output Directory **empty**
5. Click **Deploy**

That's it. In about 30 seconds you'll get a live URL like `gsecurelabs.vercel.app`.

### 3. (Optional) Custom Domain

In your Vercel project → **Settings** → **Domains** → add `gsecurelabs.com` (or any domain you own) and follow the DNS instructions.

---

## Updating the Site

Edit any HTML file, then:

```bash
git add .
git commit -m "Updated homepage"
git push
```

Vercel auto-deploys every push to `main`. New version is live within a minute.

---

## Local Preview

Just open `index.html` in any browser, or run a quick local server:

```bash
# Python 3
python3 -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000

---

## Notes

- No frameworks, no `node_modules`, no build step — just static files.
- Roboto font is loaded from Google Fonts, so an internet connection is needed on first load.
- All animations are pure CSS / vanilla JS. No external libraries.
- Forms (Contact, Get a Callback, Security Assessment) currently show a confirmation alert. Wire them to your form-handling endpoint of choice (Formspree, Web3Forms, your own API, etc.) by editing the `onsubmit` handler in each file.
