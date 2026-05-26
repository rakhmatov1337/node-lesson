export const startHandler = async (ctx) => {
  const name = ctx.from.first_name;

  await ctx.reply(
    `Salom, ${name}! 👋 Nima qilmoqchisiz?`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📝 Ro'yxatdan o'tish", callback_data: "register" },
          ],
          [
            { text: "👥 Foydalanuvchilar soni", callback_data: "count" },
            { text: "ℹ️ Yordam", callback_data: "help" },
          ],
        ],
      },
    }
  );
};