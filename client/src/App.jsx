import React, { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button.jsx';
import { Waves } from './components/Waves/Waves';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const checkWalletConnection = async () => {
    try {
      // @ts-ignore
      const { solana } = window;
      console.log(solana);
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
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
    <div className="App">
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
