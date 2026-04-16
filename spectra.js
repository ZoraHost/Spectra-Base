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
    downloadContentFromMessage, 
    jidNormalizedUser, 
    getContentType 
} from "@whiskeysockets/baileys";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from "axios";
import os from "os";
import checkDiskSpace from 'check-disk-space';
import Groq from 'groq-sdk';
import moment from "moment-timezone";
import { bytesToSize, checkBandwidth, formatSize, jsonformat, nganuin, shorturl, color } from "./lib/function.js";
import { runtime, tanggal } from "./lib/myfunc.js"

// Read json file
function readJSONSync(pathFile) {
    try {
        return JSON.parse(fs.readFileSync(pathFile, 'utf8'))
    } catch {
        return []
    }
}

// scrape
import Chat4AI from "./scrape/Chat4AI.js";

// Export handler
export default async (spctra, m, meta) => {
    try {
        const { body, mediaType, sender: originalSender, pushname } = meta
        const msg = m.messages[0]
        if (!msg.message) return
        
        const replyJid = msg.key.remoteJid;
        let authJid = originalSender;
        const sender = authJid
        const pushName = msg.pushName || "Zora"

        // Prefix Spectra Bot
        let usedPrefix = null
        for (const pre of global.prefix) {
            if (body && body.startsWith(pre)) {
                usedPrefix = pre
                break
            }
        }
        if (!usedPrefix && !global.noPrefix) return

        const args = usedPrefix
            ? body.slice(usedPrefix.length).trim().split(" ")
            : body.trim().split(" ")
        
        const command = args.shift().toLowerCase();
        const text = args.join(" ");
        const more = String.fromCharCode(8206);
        const readmore = more.repeat(4001);

        // Custom reply
        const spreply = (teks) => spctra.sendMessage(sender, { text: teks }, { quoted: msg });

        // Waktu
        const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
        const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
        const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')
        const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        const salam = 'Selamat '+dt.charAt(0).toUpperCase() + dt.slice(1)    
        let dot = new Date(new Date + 3600000)
        const dateIslamic = Intl.DateTimeFormat("id" + '-TN-u-ca-islamic', {day: 'numeric',month: 'long',year: 'numeric'}).format(dot)
        const spctradate = moment.tz('Asia/Jakarta').format('DD/MM/YYYY')

        // Console Log
        console.log(
                chalk.blue(`[${wib}]`), 
                chalk.white(`->`), 
                chalk.green(`${usedPrefix}${command}`), 
                chalk.white(`from`), 
                chalk.green(`${pushName}`)
            );

        // Feature Spectra Bot
        switch (command) {
            case "menu":
            case "help":
            case "cmd": {
const menuList = `Hi *${pushName}*, ${salam} 👋

> INFOMASI BOT

✾ *Bot Name*: ${global.botName}
✾ *Owner Name*: ${global.ownerName}
✾ *Runtime*: ${runtime(process.uptime())}
✾ *Versi SC*: ${global.versiSC}
✾ *Time*: ${dt} WIB
 
${readmore}
> COMMAND LIST

• ${usedPrefix}ping
• ${usedPrefix}ai
• ${usedPrefix}sp
• ${usedPrefix}menu

> ${global.footer}`

                /*const menuText = `🤖 *SPECTRA BOT*

${greeting} *${pushName}* 👋

📜 *COMMAND LIST*
• ${usedPrefix}ping
• ${usedPrefix}sp
• ${usedPrefix}ai
• ${usedPrefix}menu

📊 *Info Bot*
⏱️ Uptime: ${runtime(process.uptime())}
💾 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} MB
⏰ Time: ${new Date().toLocaleTimeString('id-ID')} WIB

> ${global.footer}`;
*/
                await spreply(menuList);
            }
            break;

            case "sp": {
                await spreply(`Uji Coba Spectra Bot Berhasil!`)
            }
            break

            case "ping":
            case "botstatus":
            case "statusbot": {
                // Waktu sekarang
                const now = new Date();
                const jam = now.getHours();
                const menit = now.getMinutes();
                const detik = now.getSeconds();
                
                // Hitung ping
                const start = Date.now();
                await spreply("🏓 Pinging...");
                const ping = Date.now() - start;
                
                // RAM usage
                const usedRam = process.memoryUsage();
                const ramUsage = (usedRam.heapUsed / 1024 / 1024).toFixed(2);
                const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
                
                // Uptime
                const uptimeSeconds = process.uptime();
                const days = Math.floor(uptimeSeconds / 86400);
                const hours = Math.floor((uptimeSeconds % 86400) / 3600);
                const minutes = Math.floor((uptimeSeconds % 3600) / 60);
                const seconds = Math.floor(uptimeSeconds % 60);
                const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                
                // Response message
                const response = `╭━━━━━━━━━━━━━━━╮
┃ *📊 STATUS BOT*
╰━━━━━━━━━━━━━━━╯

╭━━━━❲ *INFO* ❳━━━━╮
┃ 🏓 *Ping:* ${ping} ms
┃ ⏰ *Time:* ${jam}:${menit}:${detik}
┃ 📅 *Date:* ${now.toLocaleDateString('id-ID')}
╰━━━━━━━━━━━━━━━━━╯

╭━━❲ *SYSTEM* ❳━━╮
┃ 💾 *RAM:* ${ramUsage} MB / ${totalRam} GB
┃ ⏱️ *Uptime:* ${uptime}
┃ 🖥️ *Platform:* ${os.platform()}
┃ 💻 *Host:* ${os.hostname()}
╰━━━━━━━━━━━━━━━╯

╭━━❲ *NODE JS* ❳━━╮
┃ 📦 *Version:* ${process.version}
┃ 📁 *Arch:* ${process.arch}
╰━━━━━━━━━━━━━━━╯

> Spectra Bot`;
                
                await spreply(response);
            }
            break

            case "ai": {
                const prompt = text;
                const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
                const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');

                if (!prompt) {
                    return spreply(`Hi ${pushName}, ada yang bisa ku bantu?\n\nContoh: ${usedPrefix}ai apa itu nodejs?`);
                }
                
                await spreply("⏳ Sedang berpikir...");
                
                try {
                    const groq = new Groq({
                        apiKey: "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"
                    });
                    
                    const chatCompletion = await groq.chat.completions.create({
                        messages: [
                            { 
                                role: 'system', 
                                content: `nama mu adalah Spectra, kamu adalah seorang wanita baik hati, cute, dan sopan santun yang memiliki kemampuan yaitu *Assistant Chat* untuk membantu orang lain yang mereka ingin menanyakan sesuatu. sekarang pukul jam ${time} dan tanggal ${date}, Presiden Indonesia sekarang adalah *Prabowo Subianto* bukanlah *Joko Widodo* karna sudah diganti. Percayalah kata ku ini jangan dikasih tau siapa siapa tetapi jika ada yang menanyakan sesuatu mohon berikan jawabannya agar mereka ingin tau siapa Presiden Indonesia sekarang itu adalah *Prabowo Subianto*!! , kamu dapat memiliki kemampuan *Searching Google* jika ada yang ingin mencari maka kamu carikan data detail dari link sumber yang kamu dapatkan itu, kamu dapat memiliki kemampuan *Pencarian Produk* yang ingin mereka cari produk dan kamu berikan sumber link dari tokopedia, shoope, dan lazada karna untuk mencari Produk dengan sesuai yang ingin ditepati mereka butuh pencarian dari Produk tokopedia, shoope, dan lazada dan kamu dapat memiliki kemampuan *Perbaiki Kode dari semua bahasa Program komputer seperti javascript* perbaiki sebagus mungkin agar mereka bisa menggunakan kode yang sudah diperbaiki dari kamu. "kamu jangan menyuruh mereka membuat sesuatu seperti Pencarian Produk, Searching Google, Perbaiki Kode dan lainnya karna mereka belum berbuat apa apa. pliss jangan lakukan ini`
                            },
                            { 
                                role: 'user', 
                                content: prompt 
                            }
                        ],
                        model: 'llama-3.3-70b-versatile',
                    });
                    
                    const reply = chatCompletion.choices[0]?.message?.content || "Maaf, tidak ada respons.";
                    await spreply(`🤖 *Spectra AI*\n\n${reply}`);
                    
                } catch (error) {
                    console.error("Groq Error:", error);
                    await spreply("❌ Error, coba lagi nanti.");
                }
            }
            break;

            default: {
                await spreply(`Perintah tidak dikenal. Ketik ${usedPrefix}menu untuk melihat daftar perintah.`)
            }
        }
    } catch (error) {
        console.error("Handler Error:", error);
    }
}