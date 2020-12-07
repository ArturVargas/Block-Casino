// SPDX-License-Identifier: MIT
pragma solidity ^0.7.2;

contract WheelFortune {
  enum Stages {
    MakeBet,
    PayBet,
    Finish
  }

  address public player;
  uint public bet;
  uint public prize;

    function startPlay(uint _bet) public payable {
      player = msg.sender;
      bet = _bet;
      require(_bet <= msg.value, "Fondos insuficientes");
      prize = randomNumber();
      winner();
    }

    function randomNumber() internal returns(uint) {
      return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 20;
    }
    
    function winner() public payable {
        uint result = (bet * prize);
        if(result > 0) {
            msg.sender.transfer(result);
        }
        if(result < 0) {
            address(this).call{ value: bet }("");
        }
    }
}

// rules.
/* 
 obtener el addres de player.
 usar una funcion para que genere un numero aleatorio de vueltas que dara la ruleta.
 usar stages para aceptar, cerrar y pagar apuestas.
 recibir el monto de la apuesta del jugador para multiplicarlo por el numero que salga en la ruleta.
 validar que la wallet del usuario cuente con el monto a apostar.
 enviar la transaccion al ganador (player o sc) segun el caso. 
*/
