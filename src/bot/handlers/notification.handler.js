// src/bot/handlers/notify.handler.js
import { pool } from "../../config/db.js";
import { findAllUserChatId, findAllUsers } from "../../repositories/user.repository.js";
import { bot } from "../bot.js";

const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID; // .env da saqlash kerak

export const notifyHandler = async (ctx) => {
  const chatId = String(ctx.from.id);

  // Faqat admin ishlatishi mumkin
  if (chatId !== ADMIN_CHAT_ID) {
    return ctx.reply("❌ Bu buyruq faqat admin uchun.");
  }

  const message = ctx.message.text.replace("/notify ", "").trim();

  if (!message) {
    return ctx.reply("Xabar yozing: /notify Salom hammaga!");
  }

  // Barcha telegram_chat_id larni olamiz
  const result = await findAllUserChatId()

  let sent = 0;
  for (const row of result) {
    try {
      await bot.telegram.sendMessage(row.telegramChatId, `📢 ${message}`);
      sent++;
    } catch (err) {
      // Foydalanuvchi botni bloklagan bo'lishi mumkin
      console.log(`Xabar yuborilmadi: ${row.telegram_chat_id}`);
    }
  }

  ctx.reply(`✅ Xabar ${sent} ta foydalanuvchiga yuborildi.`);
};