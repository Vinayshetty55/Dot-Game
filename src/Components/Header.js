import React from 'react'
import { GAME_STATE_WINNING , GAME_STATE_PLAYING, GAME_STATE_DRAW } from "../Constants";

const Header = ({gameState , currentPlayer , winPlayer}) => {
  const renderLabel = () => {

    //console.log("Game State: "+gameState);

    switch(gameState){
      case GAME_STATE_PLAYING :
        return <div>Player {currentPlayer} Turn</div>
      case GAME_STATE_WINNING :
        return <div>Player {winPlayer} Wins</div>
      case GAME_STATE_DRAW :
        return <div>Game is a Draw!</div>
      default:
        return <div>Default State</div>

    }
  }

  return (
    <div className='panel header'>
      <div>
      { renderLabel() }
      </div>
    </div>
  )
};

export default Header;