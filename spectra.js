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

        // Custom Reply
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
✾ *Time*: ${wib} WIB
 
${readmore}
> COMMAND LIST

• ${usedPrefix}ping
• ${usedPrefix}ai
• ${usedPrefix}sp
• ${usedPrefix}menu

> ${global.footer}`

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
    // Memory usage
    const used = process.memoryUsage();
    
    // CPU info
    const cpus = os.cpus().map((cpu) => {
        const total = Object.keys(cpu.times).reduce(
            (last, type) => last + cpu.times[type],
            0,
        );
        return {
            ...cpu,
            total: total
        };
    });
    
    const cpu = cpus.reduce(
        (last, cpu, _, { length }) => {
            last.total += cpu.total;
            last.speed += cpu.speed / length;
            last.times.user += cpu.times.user;
            last.times.nice += cpu.times.nice;
            last.times.sys += cpu.times.sys;
            last.times.idle += cpu.times.idle;
            last.times.irq += cpu.times.irq;
            return last;
        },
        {
            speed: 0,
            total: 0,
            times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0,
            },
        },
    );
    
    // Waktu sekarang
    const date = new Date();
    const jam = date.getHours();
    const menit = date.getMinutes();
    const detik = date.getSeconds();
    
    // RAM calculations
    const ram = `${formatSize(process.memoryUsage().heapUsed)} / ${formatSize(os.totalmem())}`;
    const totalRamBytes = os.totalmem();
    const freeRamBytes = os.freemem();
    const usedRamBytes = totalRamBytes - freeRamBytes;
    const ramUsagePercent = (usedRamBytes / totalRamBytes) * 100;
    
    // Disk space
    const space = await checkDiskSpace(process.cwd());
    const totalSpaceBytes = space.size;
    const freeSpaceBytes = space.free;
    const usedSpaceBytes = totalSpaceBytes - freeSpaceBytes;
    
    // Bandwidth
    let upload = "N/A";
    let download = "N/A";
    try {
        const bandwidth = await checkBandwidth();
        upload = bandwidth.upload || "N/A";
        download = bandwidth.download || "N/A";
    } catch (err) {
        console.error("Bandwidth check error:", err.message);
    }
    
    // Latency calculation
    const startPerf = performance.now();
    // Simulasi delay kecil untuk mengukur latency
    await new Promise(resolve => setTimeout(resolve, 10));
    const endPerf = performance.now();
    const latency = endPerf - startPerf;
    
    // Build response
    let respon = ` *ᴘ ɪ ɴ ɢ* 
 ${Math.round(latency)} ms 
 ${latency.toFixed(4)} ms 

 *ʀ ᴜ ɴ ᴛ ɪ ᴍ ᴇ*
 ${runtime(process.uptime())} 

 *s ᴇ ʀ ᴠ ᴇ ʀ* 
 *🛑 ʀᴀᴍ:* ${formatSize(usedRamBytes)} (${Math.floor(ramUsagePercent)}%) / ${formatSize(totalRamBytes)} 
 *🔵 ғʀᴇᴇRAM:* ${formatSize(freeRamBytes)} 
 *🔴 ᴍᴇᴍᴏʀy:* ${ram}
 *🗂 ᴅɪꜱᴋ:* ${formatSize(usedSpaceBytes)} / ${formatSize(totalSpaceBytes)}
 *📂 ғʀᴇᴇDISK:* ${formatSize(freeSpaceBytes)}
 *🔭 ᴘʟᴀᴛғᴏʀᴍ:* ${os.platform()}
 *🧿 sᴇʀᴠᴇʀ:* ${os.hostname()}
 *📤 ᴜᴘʟᴏᴀᴅ:* ${upload}
 *📥 ᴅᴏᴡɴʟᴏᴀᴅ:* ${download}
 *⏰ ᴛɪᴍᴇ sᴇʀᴠᴇʀ:* ${jam} : ${menit} : ${detik}
 
 *📮 ɴᴏᴅᴇᴊꜱ ᴠᴇʀꜱɪᴏɴ:* ${process.version}
 *💻 ᴄᴘᴜ ᴍᴏᴅᴇʟ:* ${cpus[0]?.model || "Unknown"}
 *📊 ᴏꜱ ᴠᴇʀꜱɪᴏɴ:* ${os.version()}
 
_NodeJS Memory Usage_
${Object.keys(used)
    .map(
        (key, _, arr) =>
            `${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatSize(used[key])}`,
    )
    .join("\n")}
${readmore}
${cpus[0]
    ? `_Total CPU Usage_
${cpus[0].model.trim()} (${Math.round(cpu.speed)} MHZ)\n${Object.keys(cpu.times)
        .map(
            (type) =>
                `- *${(type + "*").padEnd(6)}: ${(
                    (100 * cpu.times[type]) /
                    cpu.total
                ).toFixed(2)}%`,
        )
        .join("\n")}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus
    .map(
        (cpu, i) =>
            `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(
                cpu.times,
            )
                .map(
                    (type) =>
                        `- *${(type + "*").padEnd(6)}: ${(
                            (100 * cpu.times[type]) /
                            cpu.total
                        ).toFixed(2)}%`,
                )
                .join("\n")}`,
    )
    .join("\n\n")}`
    : ""
}`.trim();
    await spctra.sendMessage(sender, { text: respon }, { quoted: msg });
}
break;

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