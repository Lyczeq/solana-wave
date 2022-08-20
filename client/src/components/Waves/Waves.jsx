import { Program } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import copy from 'copy-to-clipboard';
import React, { useEffect, useState } from 'react';
import { createWaveAccount, getBaseAccount, getProvider } from '../../helpers';
import { Button } from '../Button/Button';

import idl from '../../idl.json';
import './Waves.css';

let baseAccount = getBaseAccount();

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

export const Waves = ({ walletAddress }) => {
  const [userMessage, setUserMessage] = useState('');
  const [wavesList, setWavesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const handleMessageChange = event => {
    const { value } = event.target;
    setUserMessage(value);
  };

  const sendWave = async () => {
    if (!userMessage.length) {
      alert('The message cannot be empty!');
      return;
    }

    try {
      const provider = getProvider();
      // @ts-ignore
      const program = new Program(idl, programID, provider);

      await program.rpc.addWave(userMessage, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });

      await getWavesList();
      setUserMessage('');
    } catch (e) {
      console.log('Error sending a Wave:', e);
    }
  };

  const getWavesList = async () => {
    try {
      setErrorMessage('');
      const provider = getProvider();
      // @ts-ignore
      const program = new Program(idl, programID, provider);
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      // @ts-ignore
      setWavesList(account.wavesList);
    } catch (error) {
      setErrorMessage('Something went wrong, try again later!');
      // @ts-ignore
      setWavesList(null);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      
      getWavesList();
    }
  }, [walletAddress]);

  // If we hit this, it means the program account hasn't been initialized.
  if (wavesList === null) {
    return (
      <div className="connected-container">
        <button
          className="cta-button submit-wave-button"
          onClick={() => createWaveAccount(getWavesList)}
        >
          Do One-Time Initialization For Wave Program Account
        </button>
      </div>
    );
  }

  return (
    <div className="connected-container">
      <form
        className="message-form"
        onSubmit={event => {
          event.preventDefault();
          sendWave();
        }}
      >
        <input
          className="wave-input"
          type="text"
          placeholder="Enter your message!"
          value={userMessage}
          onChange={handleMessageChange}
        />
        <Button type="submit" className="submit-wave-button">
          Submit
        </Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div className="wave-grid">
        {(wavesList || []).map(({ userAddress, wave }) => (
          <div className="wave-item" key={wave}>
            {console.log(userAddress)}
            <p className="user-address-heading">
              👋 Address:
              <span
                onClick={() => copy(userAddress.toString())}
                className="user-address"
              >
                {userAddress.toString()}
              </span>
            </p>
            <div className="wave-content">
              <p>{wave}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
