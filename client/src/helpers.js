import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

import idl from './idl.json';
import keypair from './keypair.json';

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: 'processed',
};

export const getProvider = () => {
  // @ts-ignore
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(
    connection,
    // @ts-ignore
    window.solana,
    // @ts-ignore
    opts.preflightCommitment
  );
  return provider;
};

export const createWaveAccount = async getWaves => {
  try {
    const provider = getProvider();
    // @ts-ignore
    const program = new Program(idl, programID, provider);
    const baseAccount = getBaseAccount();
    await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    await getWaves();
  } catch (error) {
    console.log('Error creating BaseAccount account:', error);
  }
};

export const getBaseAccount = () => {
  const arr = Object.values(keypair._keypair.secretKey);
  const secret = new Uint8Array(arr);
  return web3.Keypair.fromSecretKey(secret);
};
