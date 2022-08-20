const anchor = require('@project-serum/anchor');

const main = async () => {
  console.log('🚀 Starting test...');

  // we say anchor to set the provider which takes data from `solana config get`, it takes the local variable. That's how anchor knows to run the code locally
  anchor.setProvider(anchor.AnchorProvider.env());

  /* we want to use the program called 'solana'. It compiles the code in lib.rs and deploys it on local validator. 
  Note: Naming + folder structure is mega important here. Ex. Anchor knows to look at programs/solana/src/lib.rs b/c we used anchor.workspace.Solana.
  */
  const program = anchor.workspace.Solana;

  //We call the initialize fn from the 'solana' program. We need to wait for it, because local validator has to 'mine' the instruction.
  const tx = await program.rpc.initialize();

  console.log('📝 Your transaction signature', tx);
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
