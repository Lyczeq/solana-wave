import React, { useEffect, useState } from 'react';
import { checkWalletConnection } from './helpers';
import { Button } from './components/Button/Button.jsx';
import './App.css';

const connectWallet = async () => {};

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkWalletConnection = async () => {
    try {
      // @ts-ignore
      const { solana } = window;
      console.log(solana);
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
        }
        setWalletAddress(solana.publicKey?.toString());
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkWalletConnection();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 Solana Wave</p>
          <p className="sub-text">
            Wave to your friends using the Solana blockchain! ✨
          </p>
          {!walletAddress ? (
            <Button className="connect-wallet-button" onClick={connectWallet}>
              Connect to Wallet
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
