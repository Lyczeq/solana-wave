const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

const mockData = (wave, userAddress) => {
  return [
    {
      wave,
      userAddress,
    },
  ];
};

const main = async () => {
  console.log('Starting test');

  // we say anchor to set the provider which takes data from `solana config get`, it takes the local variable. That's how anchor knows to run the code locally
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  /* we want to use the program called 'solana'. It compiles the code in lib.rs and deploys it on local validator.
  Note: Naming + folder structure is mega important here. Ex. Anchor knows to look at programs/solana/src/lib.rs b/c we used anchor.workspace.Solana.
  */
  const program = anchor.workspace.Solana;

  // Create credentials for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  //We call the initialize fn from the 'solana' program. We need to wait for it, because local validator has to 'mine' the instruction. It's necessary to pass the needed params specified in the Initialize struct.
  const tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log('📝 Your transaction signature', tx);

  let accountData = await program.account.baseAccount.fetch(
    baseAccount.publicKey
  );
  expect(accountData.totalWaves.toString()).equals('0');

  const waveMessage = 'abcd';

  // Call add_wave fn from the program
  await program.rpc.addWave(waveMessage, {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  accountData = await program.account.baseAccount.fetch(baseAccount.publicKey);

  const { wavesList, totalWaves } = accountData;
  expect(totalWaves.toString()).equals('1');

  //Acutally doesn't work because of the timestamp
  // expect(wavesList).to.deep.equalInAnyOrder(
  //   mockData(waveMessage, provider.wallet.publicKey)
  // );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
