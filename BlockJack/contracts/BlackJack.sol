// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract BlackJack {

  address player = address(0);
  uint card = 0;
  bool winner = false;

  uint[] cardDeckPlayer;
  uint[] cardDeckSC;

  function reset() public {
    delete cardDeckPlayer;
    delete cardDeckSC;
    winner = false;
    player = msg.sender;
  }

  function generateCard() public returns(uint) {
    card = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 11;

    while(card == 0) {
      card = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 11;
    }
    
    return card;
  }
  
   function getCardDeckPlayer() external view returns(uint[] memory) {
        return cardDeckPlayer;
    }
    
    function usersTurn() public {
        cardDeckPlayer.push(generateCard());
    }
}