const {
    Client,
    RichEmbed
} = require("discord.js");
// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');
// const token = require("./auth/auth.json");
const bot = new Client();
const ms = require('ms');

const token = "NjE1NzMzNzc3NjcwNDcxNjkx.XWSVmA.YauAuQkdJVqPSseCnwWXFEXqhYo";

const prefix = "!";

bot.on("ready", () => {
    console.log(`${bot.user.tag} is on!`);
    bot.user.setStatus('invisible').catch(console.error);
});

bot.on("message", (msg) => {
    if (msg.content.substring(0, 1) !== prefix) return;
    let args = msg.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        case 'help':
            const Embed = new RichEmbed()
                .setTitle('Commands List')
                .setDescription('All commands list,show you below~')
                .addField('**!avatar**', 'Show your avatar')
                .addField('**!mute**', 'Mute somebody x seconds.Format:mute @somebody seconds')
                .addField('**!antiBalance**', 'Show anticaptcha balance!')
                .addField('**!2balance**', 'Show 2captcha balance!')
                .addField('**!poll**', 'Make a poll')
                .setColor(0x008080)
                .setFooter('From August');
            msg.author.send(Embed);
            break;
        case 'avatar':
            msg.reply(msg.author.avatarURL);
            break;
        case 'mute': //禁言 !mute @用戶 時間(加s表示秒 會自動轉換成ms)
            let person = msg.guild.member(msg.mentions.members.first() || msg.guild.members.get(arg[1]));
            if (!person) return msg.reply('Could not find that member~');

            let currentRole = msg.guild.roles.find(role => role.name === 'test role');
            let muteRole = msg.guild.roles.find(role => role.name === 'muted');
            if (!muteRole) return msg.reply('Could not find muted role.');

            let time = arg[2];
            if (!time) return msg.reply('Could not set a mute time.');

            person.removeRole(currentRole.id);
            person.addRole(muteRole.id);

            msg.channel.send(`@${person.user.tag} has been muted for ${ms(ms(time))}`);

            setTimeout(function () {
                person.removeRole(muteRole.id);
                person.addRole(currentRole.id);
                msg.channel.send(`@${person.user.tag} has back to us.`);
            }, ms(time));

            break;

        case 'antiBalance': //查询anticaptcha余额
            const myKey = '820e982eb83b3c2680d8d115b131aef2';
            let data = {
                clientKey: myKey
            };
            // let xhr = new XMLHttpRequest();
            // xhr.open('POST', 'https://api.anti-captcha.com/getBalance');
            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState == 4) {
            //         if (xhr.status == 200) {
            //             showBalance(JSON.parse(xhr.responseText).balance);
            //         }
            //     }
            // }
            // xhr.send(JSON.stringify(data));
            fetch('https://api.anti-captcha.com/getBalance', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(res => {
                res.json()
                    .then(data => {
                        msg.reply(`Your anticaptcha balance is $${data.balance}`);
                    });
            });
            break;

        case '2balance':
            fetch('https://2captcha.com/res.php?key=65dbdafb26e0819ac91c7be31e9420df&action=getbalance&json=1', {
                    method: 'GET',
                    mode: 'cors'
                })
                .then(res => {
                    res.json()
                        .then(data => {
                            msg.reply(`Your 2captcha balance is $${data.request}`);
                        })
                })
            break;
        case 'poll':
            const pollEmbed = new RichEmbed()
                .setTitle('About Poll')
                .setDescription('Write something what you want to poll behind the command')
                .setFooter('From August');
            if (!args[1]) {
                msg.channel.send(pollEmbed);
                return;
            }

            let pollMsg = args.slice(1).join(" ");
            msg.channel.send(pollMsg).then(msgReaction => {
                msgReaction.react('👍');
                msgReaction.react('👎');
                msg.delete(500).catch(console.error());
            })
    }
})

bot.login(token);