optimizeBalances = (members, payments) => {
    const balances = prepareBalances(members, payments);
    const transactions = computeTransactions(balances);

    return { balances: balances, transactions: transactions };
}

const prepareBalances = (members, payments) => {
    let balances = {};

    for (const member of members) {
        balances[member.id] = 0;
    }

    for (const payment of payments) {
        balances[payment.owedby] -= payment.amount;
        balances[payment.owedto] += payment.amount;
    }

    const balanceArray = members.map(m => {
        return { name: m.name, id: m.id, balance: balances[m.id] };
    });

    balanceArray.sort((a, b) => b.balance - a.balance);

    return balanceArray;
};

const computeTransactions = (balances) => { // currently not my algorithm and i don't really know how it works
    let sortedBalances = JSON.parse(JSON.stringify(balances));
    let currMostGen = 0, currLeastGen = sortedBalances.length - 1;

    let result = {};

    for (const member of sortedBalances) {
        result[member.name] = [];
    }

    while (currMostGen < currLeastGen) {
        let mostGen = sortedBalances[currMostGen];
        let leastGen = sortedBalances[currLeastGen];

        if (mostGen.balance === 0 || leastGen.balance === 0) {
            currLeastGen--;
            currMostGen++;
        } else if (mostGen.balance + leastGen.balance > 0) {
            let amount = -leastGen.balance;
            mostGen.balance += amount;
            leastGen.balance = 0;
            result[leastGen.name].push({ to: mostGen.name, amount });
            currLeastGen--;
        } else if (mostGen.balance + leastGen.balance < 0) {
            let amount = mostGen.balance;
            leastGen.balance += amount;
            mostGen.balance = 0;
            result[leastGen.name].push({ to: mostGen.name, amount });
            currMostGen++;
        } else {
            let amount = leastGen.balance;
            leastGen.balance = 0;
            mostGen.balance = 0;
            result[leastGen.name].push({ to: mostGen.name, amount });
            currLeastGen--;
            currMostGen++;
        }
    }

    return result;
}


module.exports = optimizeBalances;