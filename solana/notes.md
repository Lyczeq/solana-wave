# Solana notes

Solana programs are **stateless**. They don't hold data permamently. This is quite different from the Ethereum smart contracts world, which hold state on the contract.

Solana programs can interact with **acounts**. Solana **accounts** are basically files that programs can read and write to. This is why the word "accounts" is super confusing, because usually people think of accounts in terms of Facebook account or a Phantom one.

An account isn't just like the actual wallet — it's a general way for programs to pass data between each other. Read about them more [here](https://docs.solana.com/developing/programming-model/accounts?utm_source=buildspace.so&utm_medium=buildspace_project).

It is required to pay for the account because storing data isn't free! Users pay 'rent' on ther accounts. If the rent isn't paid, validators will clear the account.

Details and how rent is calculated [here](https://docs.solana.com/developing/programming-model/accounts#rent).

## How to change from local to devnet?

```sh
solana config set --url devnet

# Make sure you're on devnet.
solana config get

anchor build

# Get the new program id.
solana address -k target/deploy/myepicproject-keypair.json

# Update Anchor.toml and lib.rs w/ new program id.
# Make sure Anchor.toml is on devnet.

# Build again.
anchor build

# Deploy
anchor deploy
```

Running `anchor test` after a deploy, re-deploys the program and then run all the functions in the script.

**Solana programs are upgreadable**. That means when we re-deploy we're updating the same program id to point to the latest version of the program we deployed. The **accounts** that programs talk to will stick around, these accounts keep data related to the program.

In the Ethereum world we cannot upgrade the smart contract, we can change it but we have to deploy once again, so the address will be different.

## Client interaction with the program

After a deployment, you should see the `target/idl/solana.json` file. Copy it to the root `client/src/idl.json`.
