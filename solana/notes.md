# Solana notes

Solana programs are **stateless**. They don't hold data permamently. This is quite different from the Ethereum smart contracts world, which hold state on the contract.

Solana programs can interact with **acounts**. Solana **accounts** are basically files that programs can read and write to. This is why the word "accounts" is super confusing, because usually people think of accounts in terms of Facebook account or a Phantom one.

An account isn't just like the actual wallet — it's a general way for programs to pass data between each other. Read about them more [here](https://docs.solana.com/developing/programming-model/accounts?utm_source=buildspace.so&utm_medium=buildspace_project).

It is required to pay for the account because storing data isn't free! Users pay 'rent' on ther accounts. If the rent isn't paid, validators will clear the account.

Details and how rent is calculated [here](https://docs.solana.com/developing/programming-model/accounts#rent).


