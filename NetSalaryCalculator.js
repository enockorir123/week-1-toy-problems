function calculateNSSF(grossSalary) {
    const tierILimit = 6000;
    const tierIILimit = 18000;
    const nssfRate = 0.06;
    let nssfDeduction = 0;

    if (grossSalary <= tierILimit) {
        nssfDeduction = grossSalary * nssfRate;
    } else if (grossSalary <= tierIILimit) {
        nssfDeduction = (tierILimit * nssfRate) + ((grossSalary - tierILimit) * nssfRate);
    } else {
        nssfDeduction = (tierILimit * nssfRate) + ((tierIILimit - tierILimit) * nssfRate);
    }

    return Math.min(nssfDeduction, 2160); // Maximum NSSF deduction
}

function calculateNHIF(grossSalary) {
    if (grossSalary <= 5999) return 150;
    else if (grossSalary <= 7999) return 300;
    else if (grossSalary <= 11999) return 400;
    else if (grossSalary <= 14999) return 500;
    else if (grossSalary <= 19999) return 600;
    else if (grossSalary <= 24999) return 750;
    else if (grossSalary <= 29999) return 850;
    else if (grossSalary <= 34999) return 900;
    else if (grossSalary <= 39999) return 950;
    else if (grossSalary <= 44999) return 1000;
    else if (grossSalary <= 49999) return 1100;
    else if (grossSalary <= 59999) return 1200;
    else if (grossSalary <= 69999) return 1300;
    else if (grossSalary <= 79999) return 1400;
    else if (grossSalary <= 89999) return 1500;
    else if (grossSalary <= 99999) return 1600;
    else return 1700;
}

function calculatePAYE(taxableIncome) {
    const firstBand = 24000, secondBand = 32333, thirdBand = 40666, fourthBand = 49000;
    let tax = 0;

    if (taxableIncome <= firstBand) {
        tax = taxableIncome * 0.10;
    } else if (taxableIncome <= secondBand) {
        tax = (firstBand * 0.10) + ((taxableIncome - firstBand) * 0.15);
    } else if (taxableIncome <= thirdBand) {
        tax = (firstBand * 0.10) + ((secondBand - firstBand) * 0.15) + ((taxableIncome - secondBand) * 0.20);
    } else if (taxableIncome <= fourthBand) {
        tax = (firstBand * 0.10) + ((secondBand - firstBand) * 0.15) + ((thirdBand - secondBand) * 0.20) + ((taxableIncome - thirdBand) * 0.25);
    } else {
        tax = (firstBand * 0.10) + ((secondBand - firstBand) * 0.15) + ((thirdBand - secondBand) * 0.20) + ((fourthBand - thirdBand) * 0.25) + ((taxableIncome - fourthBand) * 0.30);
    }

    return Math.max(tax - 2400, 0); // Subtract personal relief
}

function calculateNetSalary(basicSalary, benefits) {
    let grossSalary = basicSalary + benefits;
    let nssfDeduction = calculateNSSF(grossSalary);
    let taxableIncome = grossSalary - nssfDeduction;
    let paye = calculatePAYE(taxableIncome);
    let nhifDeduction = calculateNHIF(grossSalary);
    let netSalary = grossSalary - (nssfDeduction + paye + nhifDeduction);

    return {
        "Gross Salary": grossSalary.toFixed(2),
        "NSSF Deduction": nssfDeduction.toFixed(2),
        "Taxable Income": taxableIncome.toFixed(2),
        "PAYE (Tax)": paye.toFixed(2),
        "NHIF Deduction": nhifDeduction.toFixed(2),
        "Net Salary": netSalary.toFixed(2)
    };
}

let basicSalary = 50000;
let benefits = 10000;
console.log(calculateNetSalary(basicSalary, benefits));
