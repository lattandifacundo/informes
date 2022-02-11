function reverseString(str){
    return str.split('').reverse().join('');
};

async function fixTextNumToInt(text){
    const fixedValue = Number.parseInt(text.replace(/\./g, '')) * 1;
    return(fixedValue);
}

async function formatBigIntToDisplay(text){
    var unformated = reverseString((text).toString());

    var negative = false;
    if(unformated.endsWith('-')){
        negative = true;
        unformated = unformated.replace('-', '');
    }

    const arrayNums = unformated.match(/.{1,3}/g);
    var formated = arrayNums.join('.');

    if(negative) formated = formated + '-';

    return reverseString(formated);
}

async function formatIntToMegaPesoBigInt(value){
    return (BigInt(value*1) * BigInt(1000000));
}

async function fixSimbol(string){
    var fixedString = string+"";
    if(!fixedString.includes('-')){
        fixedString = `\+\$${fixedString}`;
    }
    else{
        var separedString = fixedString.split('-');
        fixedString = `\-\$${separedString[1]}`;
    }
    return fixedString;
}

function getPercentageDifference(value1, value2){
    console.info("🔢 Value-1 =", value1, "\n🔢 Value-2 =", value2);
    const difference = Number(value1) - Number(value2);
    console.info("🔢 Difference =",difference);
    const percentage = difference/value2*100;
    console.info("🔢 Percentage =", percentage, "%");

    var roundedString = percentage.toFixed(3).toString();
    if(!roundedString.includes('-')) roundedString = `\+${roundedString}`;
    console.log("🔢 FixedSimbol =", roundedString);

    return roundedString;
}

exports.formatBigIntToDisplay = formatBigIntToDisplay;
exports.getPercentageDifference = getPercentageDifference;
exports.fixTextNumToInt = fixTextNumToInt;
exports.formatIntToMegaPesoBigInt = formatIntToMegaPesoBigInt;
exports.fixSimbol = fixSimbol;