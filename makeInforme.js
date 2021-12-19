const { fixSimbol, fixTextNumToInt, formatBigIntToDisplay, formatIntToMegaPesoBigInt} = require('./util.js');
const { requestBcra } = require('./bcraService.js');
const { getPercentageDifference } = require('./util.js');
const firebase = require('./firebase.js');

async function getAndSaveYesterday(now){
    const yesterday = await firebase.read('1d');
    firebase.write('1d', now);

    if(!yesterday){ console.log('Error accesing firebase'); return 0; }

    console.info("🔥 Now =", now);
    console.info("🔥 Yesterday =", yesterday);

    return fixTextNumToInt(yesterday);
}

async function getAndCalc(){
    const unformatedValueNow = await requestBcra('Base monetaria');

    const intValueNow = await fixTextNumToInt(unformatedValueNow);
    const intValueYesterday = await getAndSaveYesterday(unformatedValueNow);
    const percentageDifference = getPercentageDifference(intValueNow, intValueYesterday);

    const parsedNow = await formatIntToMegaPesoBigInt(intValueNow);
    const parsedYesterday = await formatIntToMegaPesoBigInt(intValueYesterday);
    const difference = parsedNow - parsedYesterday;

    return [parsedNow, percentageDifference, difference];
}

async function getInforme(){
    const data = await getAndCalc();
    const nowValue = await formatBigIntToDisplay(data[0]);
    const difference = await fixSimbol(await formatBigIntToDisplay(data[2]));
    const percentageValue = data[1];

    return `💰 <b><u>Base Monetaria</u></b>\n`+
        `       <code>\$${nowValue}</code>\n`+
        `       1d: <code>${difference}</code> | <code>${percentageValue}%</code>`;
}

exports.getInforme = getInforme;