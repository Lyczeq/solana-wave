import anchor from '@project-serum/anchor';
import fs from 'fs';

const account = anchor.web3.Keypair.generate();

fs.writeFileSync('./keypair.json', JSON.stringify(account));
