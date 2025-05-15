const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'yourserver.aternos.me', // Aternos server IP
    port: 12345,                    // Aternos port
    username: 'Bot123'              // Any name (cracked mode only)
  });

  bot.on('spawn', () => {
    console.log('Bot spawned and AFK');
    bot.setControlState('jump', true);

    let moving = false;
    setInterval(() => {
      moving = !moving;
      bot.setControlState('forward', moving);
    }, 10000);

    setInterval(() => {
      bot.chat('/afk');
    }, 60000);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('Error:', err));
}

createBot();
