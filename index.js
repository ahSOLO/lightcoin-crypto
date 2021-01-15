// let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let _balance = 0;
    for (let transaction of this.transactions) {
      _balance += transaction.value;
    }
    return _balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    }
    else {
      return false;
    }
  }
}

class Withdrawal extends Transaction {

  isAllowed() {
    if (this.amount > this.account.balance) {
      return false;
    } else {
      return true;
    }
  }

  get value() {
    return -this.amount
  }

}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount
  }

}



// DRIVER CODE BELOW
const myAccount = new Account("tesla");

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
