//External Libraries
const { Telegraf } = require('telegraf');

if(process.env.TOKEN == undefined){
    const dotenv = require('dotenv');
    dotenv.config();
}

//Local Libraries
const { getInforme } = require('./makeInforme.js')

//Instances
const client = new Telegraf(process.env.TOKEN);

client.launch().then(async ()=>{
    const report = await getInforme();
    console.info("📩 Message\n--------\n"+report, "\n--------");

    await client.telegram.sendMessage(process.env.CHANNEL_ID, report, { parse_mode: 'HTML' });

    process.exit(0);
});