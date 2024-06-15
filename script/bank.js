const users = {};

module.exports.config = {
    name: 'bank',
    version: '1.0.0',
    role: 0,
    description: "Manage your bank transactions and claim daily rewards",
    usage: "bank [withdraw|invest|loan|deposit|daily|balance] [amount]",
    credits: 'Developer',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const command = args[0];
    const amount = parseFloat(args[1]);
    const userId = event.senderID;

    // Initialize user if not already present
    if (!users[userId]) {
        users[userId] = {
            balance: 2000,
            investmentBalance: 4000,
            loanBalance: 0,
            lastClaimTime: 0
        };
    }

    const user = users[userId];
    let responseMessage;

    switch (command.toLowerCase()) {
        case 'withdraw':
            // Withdraw logic
            break;

        case 'invest':
            // Invest logic
            break;

        case 'loan':
            // Loan logic
            break;

        case 'deposit':
            // Deposit logic
            break;

        case 'daily':
            // Daily reward logic
            break;

        case 'balance':
            responseMessage = `Your current balance is $${user.balance}.`;
            break;

        default:
            responseMessage = "Invalid command. Usage: bank [withdraw|invest|loan|deposit|daily|balance] [amount]";
    }

    api.sendMessage(responseMessage, event.threadID, event.messageID);
};
