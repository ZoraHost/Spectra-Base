# Spectra-Base WhatsApp Bot

<div align="center">
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"/>
  <img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" alt="Node.js"/>
  <img src="https://img.shields.io/badge/ESModule-ESM-yellow?style=for-the-badge" alt="ESModule"/>
  <br/>
  <strong>Bot WhatsApp modern dengan ESModule (ESM) + Multi-Platform Support</strong>
</div>

---

## ✨ Fitur Utama

- ⚡ **ESModule (ESM)** - Modern, clean, dan cepat
- 📱 **Multi-device support** - Bisa nyala di banyak perangkat
- 🧩 **Modular** - Mudah tambah fitur baru
- 🔒 **Session persist** - Tidak perlu scan QR tiap restart
- 🧠 **Scrape built-in** - Download TikTok, IG, YouTube, dll
- 💾 **Database ready** - Siap pakai MySQL/PostgreSQL/SQLite
- 🌍 **Multi-platform** - Bisa jalan di mana saja

---

## 🚀 Panduan Instalasi Lengkap

### 📦 Prasyarat

- Node.js **v18+** (wajib karena ESM)
- NPM / Yarn / PNPM
- Minimal RAM **256MB** (termux) / **512MB** (VPS/Panel)

---

### 💻 1. Instalasi di **Desktop / Laptop** (Windows/Mac/Linux)

```bash
# Clone repository
git clone https://github.com/ZoraHost/Spectra-Base.git
cd Spectra-Base

# Install dependencies
npm install

# Buat file .env (copy dari .env.example jika ada)
cp .env.example .env
# atau buat manual:
echo "SESSION_SECRET=rahasiabanget" > .env

# Jalankan bot
npm start
