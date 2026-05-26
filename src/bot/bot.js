// src/bot/bot.js
import { Telegraf } from "telegraf";
import { startHandler } from "./handlers/start.handler.js";
import { registerHandler, registerTextHandler } from "./handlers/register.handler.js";
import { findAllUsers } from "../repositories/user.repository.js";
import { notifyHandler } from "./handlers/notification.handler.js";


export const bot = new Telegraf(process.env.BOT_TOKEN);

// Handlerlarni ulaymiz
bot.start(startHandler);
bot.command("register", registerHandler);

bot.action("register", (ctx) => {
  ctx.answerCbQuery();
    registerHandler(ctx);
    bot.on("text", registerTextHandler)
});

bot.action("help", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("Yordam: /register — ro'yxatdan o'tish");
});

bot.action("count", async (ctx) => {
  ctx.answerCbQuery();
  const users = await findAllUsers();
  ctx.reply(`👥 Jami foydalanuvchilar: ${users.length} ta`);
});
bot.command("notify", notifyHandler);

export const startBot = () => {
  bot.launch();
  console.log("Telegram bot started");

  // Bot to'g'ri o'chishi uchun
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};