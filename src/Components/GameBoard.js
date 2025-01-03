import React, { useEffect }  from "react";
import { useState } from "react";
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";
import { isWinner , isDraw , getComputerMoves } from "../Helper";
import { NO_CICLES , PLAYER_1 , PLAYER_2 , GAME_STATE_WINNING , GAME_STATE_PLAYING , NO_PLAYER, GAME_STATE_DRAW } from "../Constants";
import '../Game.css'

const GameBoard = () => {
    const [gameBoard , setGameBoard] = useState(Array(16).fill(NO_PLAYER));
    //console.log(gameBoard);
    const [currentPlayer , setCurrentPlayer] = useState(PLAYER_1); 
    const [gameState , setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer , setWinPlayer] = useState(NO_PLAYER);

    useEffect(() => {
        initGame();
    } , []);

    const initGame =() => {
        //console.log("Init Game is Called")
        setGameBoard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    }

    const initBoard = () => {
        const circles = [];
        for(let i=0;i<NO_CICLES;i++){
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const suggestMove = () => {
        circleClicked(getComputerMoves(gameBoard));
    }

    const circleClicked = (id) => {
        //console.log("Circle Cliked" + id);

        if(gameBoard[id] !== NO_PLAYER) return;
        if(gameState !== GAME_STATE_PLAYING) return;
        
        if(isWinner(gameBoard , id , currentPlayer)){
            setGameState(GAME_STATE_WINNING);
            setWinPlayer(currentPlayer);
        }

        if(isDraw(gameBoard , id , currentPlayer)){
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }

        setGameBoard(prev => {
            return prev.map((circle , pos) => {
                if(pos === id) return currentPlayer;
                return circle;
            });
        });

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        //console.log(gameBoard);
    }

    const renderCircle = id => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}></GameCircle>
    };

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
            <div className="gameBoard">
                {initBoard()}
            </div>
            <Footer onNewGameClick={ initGame }  onSuggestClick={suggestMove}/>
        </>
    );
};

export default GameBoard;