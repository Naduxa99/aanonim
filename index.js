const { Telegraf } = require('telegraf');
const { BOT_ID, CHAT_ID } = require('./private_consts');

const ALCOS = ['🍷', '🍺', '🍻', '🍸', '🥃', '🍹', '🥂', '🍾'];
const WELCOME_MSG = 'Пришли фото!';
const ERROR_MSG = 'Что-то пошло не так!';
const ACCESS_ERROR_MSG = 'Ты не можешь отправлять сообщения!';

const bot = new Telegraf(BOT_ID);

const getWelcomeMsg = () => `${ALCOS[Math.floor(Math.random() * ALCOS.length)]} ${WELCOME_MSG}`;

bot.start(ctx => ctx.reply(getWelcomeMsg()));

bot.on('text', async (ctx) => {
    try {
        ctx.reply(getWelcomeMsg());
    } catch(e) {
        ctx.reply(ERROR_MSG);
    }
});

bot.on('photo', async (ctx) => {
    try {
        ctx.telegram.getChatMember(CHAT_ID, ctx.chat.id)
            .then(data => ctx.telegram.sendPhoto(CHAT_ID, ctx.update.message.photo.pop().file_id), error => ctx.reply(ACCESS_ERROR_MSG));
    } catch(e) {
        ctx.reply(ERROR_MSG);
    }
});

bot.launch();