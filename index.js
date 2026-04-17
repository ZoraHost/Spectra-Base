/* 

                            Made by Zora
   ================================================================
    Base      : Zora
    WhatsApp  : wa.me/6282124186488
    GitHub    : https://github.com/ZoraHost
    Instagram : https://www.instagram.com/frell_0303/
    YouTube   : @B16_OFC
    Channel   : https://whatsapp.com/channel/0029VauzzBMCcW4irdRvCK0g

                                 NOTE
   ================================================================
    Copy, recode, rename, reupload diperbolehkan.
    Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

             Terima kasih sudah menggunakan base Zora

*/

// Import Module
import "./config.js";

import { 
         makeWASocket, 
         useMultiFileAuthState, 
         fetchLatestBaileysVersion, 
         downloadContentFromMessage, 
         getContentType 
        } from "@whiskeysockets/baileys"
import chalk from "chalk";
import Pino from "pino";
import readline from "readline";
import path from "path";
import fs from "fs";
import os from "os";
import lolcatjs from 'lolcatjs';
import { fileURLToPath } from "url"
import gradient from 'gradient-string';
import boxen from 'boxen';
import figlet from "figlet";
import { sleep } from "./lib/myfunc.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Pairing Method
const usePairingCode = true;

async function question(prompt) {
    process.stdout.write(prompt)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) => rl.question("", (ans) => {
        rl.close()
        resolve(ans)
    }))
}

function createTmpFolder() {
const folderName = "tmp";
const folderPath = path.join(__dirname, folderName);
if (!fs.existsSync(folderPath)) {
fs.mkdirSync(folderPath);
lolcatjs.fromString(`Folder '${folderName}' berhasil dibuat.`);
} else {
lolcatjs.fromString(`Folder '${folderName}' sudah ada.`);
}
}

const displayLogo = async () => {
    const maxWidth = process.stdout.columns || 80;
    const logo = await figlet.text('Spectra', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: Math.min(maxWidth, 60),
        whitespaceBreak: true
    });
    lolcatjs.fromString('\n' + (logo) + '\n');
};

const displayInfo = () => {
    const infoBox = boxen(
        chalk.white.bold(`
${chalk.green('📃 INFORMASI SCRIPT')}

${chalk.cyan(' Author')}   : Zora
${chalk.cyan(' GitHub')}   : https://github.com/ZoraHost
${chalk.cyan(' Instagram')}: https://www.instagram.com/frell_0303
${chalk.cyan(' YouTube')}  : @B16_OFC
${chalk.cyan(' Base')}     : Spectra
    `),
        {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'cyan',
            backgroundColor: '#0a0a0a',
            title: '🌟 WELCOME 🌟',
            titleAlignment: 'center'
        }
    );
    
    console.log(infoBox);
};

const displayFooter = () => {
    lolcatjs.fromString(`\n> Terima kasih sudah menggunakan Spectra Bot - ZoraHost/B16_OFC` + '\n');
};

const showTerminalUI = async () => {
    await displayLogo();
    displayInfo();
    createTmpFolder();
    displayFooter();
};

// Koneksi WhatsApp
async function startSpectra() {
    await showTerminalUI();
    
    console.log(chalk.green("\n[INFO]"), chalk.white("Connecting to WhatsApp..."));

    const { state, saveCreds } = await useMultiFileAuthState(path.resolve("./spectraSession"));

    // New version
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const spctra = makeWASocket({
        logger: Pino({ level: "silent" }),
        printQRInTerminal: !usePairingCode,
        auth: state,
        browser: ["IOS", "Safari", "20.0.04"],
        version,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id);
                return msg?.message || undefined;
            }
            return {};
        }
    });

    // Metode pairing
if(usePairingCode && !spctra.authState.creds.registered) {
  const choice = await question('Pilih Salah Satu Menu Di Bawah Ini!!!\n\nOpsi Verifikasi\n1. Dapatkan Pairing Code\n2. Spam Pairing Code\n\nPilihan Anda: ');
  if (choice === '1') {
    const phoneNumber = await question(chalk.yellow("Masukkan Nomor Dengan Awalan 62:\n> "));
    const code = await spctra.requestPairingCode(phoneNumber.trim());
    console.log('Process...');
    await sleep(3000); // Tunggu selama 3000 milidetik
    console.log(`Your Pairing Code: ${chalk.yellow.bold(`[ ${code} ]`)}`);
  } else if (choice === '2') {
    await spamPairingRequest();
  } else {
    console.log('Pilihan tidak valid.');
    await sleep(1500);
    startSpectra();
  }
}

async function spamPairingRequest() {
  const startTime = Date.now();
  const duration = 15 * 60 * 1000; // 15 menit dalam milidetik
  const phoneNumber = await question('Masukkan Nomor WhatsApp Target:\n');

  // Sanitasi nomor telepon
  const sanitizedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

  while (Date.now() - startTime < duration) {
    let attempts = 100; // Jumlah percobaan per iterasi
    while (attempts > 0) {
      try {
        const pairingCodeResponse = await spctra.requestPairingCode(sanitizedPhoneNumber);
        console.log(`Spam On Target: ${pairingCodeResponse}`);
      } catch (error) {
        console.error('Terjadi kesalahan saat meminta kode verifikasi:', error);
      }

      console.log(`Spam Pairing WhatsApp: ${attempts} detik...`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 detik per iterasi
      attempts--;
    }

    console.log('Mengirim Ulang Dalam 30 detik...');
    await new Promise(resolve => setTimeout(resolve, 30000)); // Tunggu 30 detik sebelum iterasi berikutnya
  }

  console.log('Selesai. 15 menit telah berlalu.');
}

    spctra.ev.on("creds.update", saveCreds);

    // Informasi Koneksi
    spctra.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            console.log(chalk.red("[ERROR]"), chalk.white("Connection closed. Reconnecting..."));
            startSpectra();
        } else if (connection === "open") {
            console.log(chalk.green("[INFO]"), chalk.white("WhatsApp Connected Successfully!"));
        }
    });

    spctra.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    const sender = msg.key.remoteJid;
    const pushName = msg.pushName || "Zora";
    let mediaType = null;

    if (!msg.message) return;

    const body = msg.message.conversation || 
                 msg.message.extendedTextMessage?.text || 
                 "";

    if (!body) return;

        // Import Handler
        const { default: handler } = await import("./spectra.js");
        handler(spctra, m, { body, mediaType, sender, pushName });
    });
}

startSpectra();