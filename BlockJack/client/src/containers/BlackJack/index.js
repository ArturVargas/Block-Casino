import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import Blackjack from '../../contracts/BlackJack.json';

const BlackjackHome = () => {
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

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
      console.log(networkId)
      setContract(contract);
      setAccount(accounts[0]);
      if (account) {
        const ethBalance = await web3.eth.getBalance(account);
        setBalance(ethBalance);
        await contract.methods.reset().send({ from: account, gas: 5000000 });
      }
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccount(accounts[0])
    });
  }, [account]);

  const playerTurn = async () => {
    await contract.methods.playerTurn().send({ from: account, gas: 5000000 })
      .then(async () => {
        const cardDeckPlayer = await contract.methods.getCardDeckPlayer().call();
        console.log(cardDeckPlayer);
      });
  }

  return (
    <div>
      {account} {' / '}
      {balance}
      Blackjack
      <button onClick={() => playerTurn()}>Pedir Carta</button>
    </div>
  );
};

export default BlackjackHome;