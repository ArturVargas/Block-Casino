// SPDX-License-Identifier: MIT
pragma solidity ^0.7.2;

contract BlackJack {

  address public player;
  uint card = 0;

  uint[] cardDeckPlayer;
  uint[] cardDeckSC;

  modifier onlyPlayer() {
    require(msg.sender == player, "Solo el jugador puede llamar esta funcion");
    _;
  }
    
  function reset() public {
    delete cardDeckPlayer;
    delete cardDeckSC;
    player = msg.sender;
  }

  function generateCard() internal returns(uint) {
    card = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 11;

    while(card == 0) {
      card = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 11;
    }
    
    return card;
  }
  
  function getCardDeckPlayer() external view returns(uint[] memory) {
    return cardDeckPlayer;
  }
 
  function getCardDeckSC() external view returns(uint[] memory) {
    return cardDeckSC;  
  }

  function playerTurn() public onlyPlayer {
    cardDeckPlayer.push(generateCard());
  }

  function scTurn() public {
    cardDeckSC.push(generateCard());
  }

  function winner(uint16 _playerPoints, uint16 _scPoints) public payable {
    require(msg.value > 50000, "Debes tener minimo 50001 weis");
        if(_playerPoints > _scPoints && _playerPoints <= 21) {
            msg.sender.transfer(50000);
        }
        
        else {
            address(this).call{ value: 50000 wei }("");
        }
  }
}