import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { Button } from './components/Button/Button.jsx';
import { Waves } from './components/Waves/Waves';

import './App.css';
window.Buffer = Buffer;

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  };

  const checkWalletConnection = async () => {
    try {
      // @ts-ignore
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
        }
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
    onLoad();
  }, []);

  return (
    <div className="app">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">👋 Solana Wave</p>
          <p className="sub-text">
            Wave to your friends using the Solana blockchain! ✨
          </p>
          {!walletAddress ? (
            <Button className="connect-wallet-button" onClick={connectWallet}>
              Connect to Wallet
            </Button>
          ) : (
            <Waves walletAddress={walletAddress} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
