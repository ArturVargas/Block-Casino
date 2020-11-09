import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import Blackjack from '../../contracts/BlackJack.json';

const BlackjackHome = () => {
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const networkId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();
      const deployedNetwork = Blackjack.networks[networkId];
      const contract = new web3.eth.Contract(
        Blackjack.abi,
        deployedNetwork && deployedNetwork.address
      );
      await contract.methods.reset().call();
      setContract(contract);
      setAccount(accounts[0]);
      if(account) {
        const ethBalance = await web3.eth.getBalance(account);
        setBalance(ethBalance);
      }
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccount(accounts[0])
    });
  }, [account]);

  const playerTurn = async () => {
    console.log('-->> ', contract);
    await contract.methods.playerTurn().call()
    .then(console.log);
  }

  return (
    <div>
      {account}
      {balance}
      Blackjack
      <button onClick={ () => playerTurn()}>Pedir Carta</button>
    </div>
  );
};

export default BlackjackHome;