const Discord = require('discord.js');
const fs = require('fs');
const request = require('request');
const FtpDeploy = require('ftp-deploy');
const client = new Discord.Client();
const colors = require('colors');
const ftpDeploy = new FtpDeploy();

module.exports.connect = function(startMsg, token) {
    client.login(token);
    client.on('ready', () => {
        console.log(startMsg.bgGreen.black);
    });
};

module.exports.uploadPmLog = function(pmPath, img, id, config) {
    console.log("Log PM Messages: ".gray + "true".green + " Path is ".gray + pmPath);
    client.on('message', async message => {
        if(message.author.id === id) {} else {
            if(message.channel.type === "dm") {
                if(message.attachments.first()) {
                    if(img) {
                        let url = message.attachments.first().url;
                        download(url, pmPath);
                        upload(config);
                    } else {}
                } else {
                    let fileName = pmPath + message.author.id + '.txt';
                    let fileContent = message.author.username + ': ' + message.content + '\n';
                    lo(fileName, fileContent);
                    upload(config);
                }
            } else {}
        }
    });
};

module.exports.logPm = function(pmPath, img, id) {
    console.log("Log PM Messages: ".gray + "true".green + " Path is ".gray + pmPath);
    client.on('message', async message => {
        if(message.author.id === id) {} else {
            if(message.channel.type === "dm") {
                if(message.attachments.first()) {
                    if(img) {
                        let url = message.attachments.first().url;
                        download(url, pmPath);
                    } else {}
                } else {
                    let fileName = pmPath + message.author.id + '.txt';
                    let fileContent = message.author.username + ': ' + message.content + '\n';
                    lo(fileName, fileContent);
                }
            } else {}
        }
    });
};

module.exports.uploadGroupLog = function(groupPath, img, id, config) {
    console.log("Log Group Messages: ".gray + "true".green + " Path is ".gray + groupPath);
    client.on('message', async message => {
        if(message.author.id === id) {} else {
            if(message.channel.type === "group") {
                if(message.attachments.first()) {
                    if(img) {
                        let url = message.attachments.first().url;
                        download(url, groupPath);
                        upload(config);
                    } else {}
                } else {
                    let fileName = groupPath + message.channel.id+ '.txt';
                    let fileContent = '[' + message.channel.name + '] ' + message.author.username + ': ' + message.content + '\n';
                    lo(fileName, fileContent);
                    upload(config);
                }
            } else {}
        }
    });
};

module.exports.logGroup = function(groupPath, img, id) {
    console.log("Log Group Messages: ".gray + "true".green + " Path is ".gray + groupPath);
    client.on('message', async message => {
        if(message.author.id === id) {} else {
            if(message.channel.type === "group") {
                if(message.attachments.first()) {
                    if(img) {
                        let url = message.attachments.first().url;
                        download(url, groupPath);
                    } else {}
                } else {
                    let fileName = groupPath + message.channel.id+ '.txt';
                    let fileContent = '[' + message.channel.name + '] ' + message.author.username + ': ' + message.content + '\n';
                    lo(fileName, fileContent);
                }
            } else {}
        }
    });
};

module.exports.uploadServerLog = function(serverPath, img, id, config) {
    console.log("Log Server Messages: ".gray + "true".green + " Path is ".gray + serverPath);
    client.on('message', async message => {
        if(message.author.id === id) {} else {
            if(message.channel.type === "dm") {}
            else if(message.channel.type === "group") {}
            else {
                if(message.attachments.first()) {
                    if(img) {
                        let url = message.attachments.first().url;
                        download(url, serverPath);
                        upload(config);
                    } else {}
                } else {
                    let fileName = serverPath + message.guild.id+ '.txt';
                    let fileContent = '[' + message.guild.name + '] ' + message.author.username + ': ' + message.content + '\n';
                    lo(fileName, fileContent);
                    upload(config);
                }
            }
        }
    });
};

module.exports.logServer = function(serverPath, img, id) {
    console.log("Log Server Messages: ".gray + "true".green + " Path is ".gray + serverPath);
    client.on('message', async message => {
        if(message.author.id === id) {} else {
            if(message.channel.type === "dm") {}
            else if(message.channel.type === "group") {}
            else {
                if(message.attachments.first()) {
                    if(img) {
                        let url = message.attachments.first().url;
                        download(url, serverPath);
                    } else {}
                } else {
                    let fileName = serverPath + message.guild.id+ '.txt';
                    let fileContent = '[' + message.guild.name + '] ' + message.author.username + ': ' + message.content + '\n';
                    lo(fileName, fileContent);
                }
            }
        }
    });
};

function makeRandom(length) {
    let text = ""; let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
}

function upload(config) {
    ftpDeploy.deploy(config)
        .then(res => console.log("finished:".green,res))
        .catch(err => console.log(err.bgRed));
}

function lo(name, content) {
    console.log(content);
    fs.appendFileSync(name, content, 'utf-8');
}

function download(url, path) {
    let p = path + makeRandom(10) + '.png';
    request.get(url) .on('error', console.error) .pipe(fs.createWriteStream(p)); console.log(p);
}
