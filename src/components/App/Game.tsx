import React, {useEffect, useState} from 'react';
import useSound from 'use-sound';

import NumberDisplay from '../NumberDisplay/NumberDisplay';
import {generateCells, openMultipleCells} from '../../utils/index'
import Button from '../Button/Button';
import {Cell, CellState, CellValue, Face} from '../../types/index';

import './App.scss';
import { delStorage, getStorage, setStorage } from '../../utils/storage';
import { GAME_CONFIG } from '../../constants';
import ModalSCore from './ModalScore';

const clickUrl = require('../../assets/sound/click.mp3');
const lostUrl = require('../../assets/sound/lost.mp3');
const winUrl = require('../../assets/sound/win.mp3');

interface scoreInterface {
    easy: {
        countWin: number,
        bestTime: number | null
    },
    medium: {
        countWin: number,
        bestTime: number | null
    },
    hard: {
        countWin: number,
        bestTime: number | null
    }
}

const Game: React.FC = () => {
    const [clickSound] = useSound(clickUrl);
    const [lostSound] = useSound(lostUrl);
    const [winSound] = useSound(winUrl);
    const [config, setConfig] = useState(getStorage('config') || GAME_CONFIG.easy)
    const [key, setKey] = useState<string>(getStorage('key') || 'easy')
    const [cells, setCells] = useState<Cell[][]>(getStorage('cells') || generateCells(config));
    const [face, setFace] = useState<Face>(Face.smile);
    const [time, setTime] = useState<number>(getStorage('time') || 0);
    const [live, setLive] = useState<boolean>(false);
    const [bombCounter, setBombCounter] = useState<number>(getStorage('bomb') || config.NO_OF_BOMBS);
    const [hasLost, setHasLost] = useState<boolean>(false);
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [showWinTitle, setShowWinTitle] = useState<boolean>(false);
    const [showLostTitle, setShowLostTitle] = useState<boolean>(false);
    const [showScore, setShowScore] = useState<boolean>(true);
    const [score, setScore] = useState<scoreInterface>(getStorage('score') || {
        easy: {
            countWin: 0,
            bestTime: null
        },
        medium: {
            countWin: 0,
            bestTime: null
        },
        hard: {
            countWin: 0,
            bestTime: null
        }
    })

    useEffect(() => {
        if (live) {
            setStorage('cells', cells);
            setStorage('key', key);
            setStorage('time', time);
            setStorage('bomb', bombCounter);
            setStorage('config', config)
        }
    }, [time, cells, bombCounter])

    useEffect(() => {
        const handleMouseDown = (): void => {
            setFace(Face.oh);
        }

        const handleMouseUp = (): void => {
            setFace(Face.smile);
        }

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, []);

    useEffect(() => {
        if (live && time < 999) {
            const timer = setInterval(() => {
                setTime(time + 1)
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [live, time]);

    useEffect(() => {
        if (hasLost) {
            setShowLostTitle(true);
            lostSound();
            setLive(false);
            setFace(Face.lost);
            delStorage('cells');
            delStorage('time');
            delStorage('bomb');
            delStorage('config');
            delStorage('key');
        }
    }, [hasLost]);

    useEffect(() => {
        if (hasWon) {
            setShowWinTitle(true);
            winSound();
            setLive(false);
            setFace(Face.won);
            if (key === 'easy') {
                score.easy.countWin++;
                setScore(score);
                setStorage('score', JSON.stringify(score));
            }
        }
    }, [hasWon]);

    const handleCellClick = (rowParam: number, colParam: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        clickSound();
        e.preventDefault();

        if (hasLost) return;
        
        let newCells = cells.slice();

        //start the game
        if (!live) {
            let isABomb = newCells[rowParam][colParam].value === CellValue.bomb;
            while (isABomb) {
                newCells = generateCells(config);
                if (newCells[rowParam][colParam].value !== CellValue.bomb) {
                    isABomb = false;
                    break;
                }
            }

            setLive(true);
        }

        const currentCell = newCells[rowParam][colParam];

        if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
            return;
        }

        if (currentCell.value === CellValue.bomb) {
            setHasLost(true);
            newCells[rowParam][colParam].red = true;
            newCells = showAllBombs();
            setCells(newCells);
            return;
        } else if (currentCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam, colParam, config.MAX_COLS, config.MAX_ROWS);
        } else {
            newCells[rowParam][colParam].state = CellState.visible;
        }

        // check to see if you won
        let safeOpenCellsExists = false;
        for (let row = 0; row < config.MAX_ROWS; row++) {
            for (let col =0; col < config.MAX_COLS; col++) {
                const currentCell = newCells[row][col];

                if (currentCell.value !== CellValue.bomb && currentCell.state === CellState.open) {
                    safeOpenCellsExists = true;
                    break;
                }
            }
        }

        if (!safeOpenCellsExists) {
            newCells = newCells.map(row => row.map(cell => {
                if (cell.value === CellValue.bomb) {
                    return {
                        ...cell,
                        state: CellState.flagged
                    }
                }
                return cell;
            }))
            setHasWon(true);
        }
        
        setCells(newCells);
    }

    const handleCellContext = (rowParam: number, colParam: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();

        if (!live) {
            return;
        }

        clickSound();

        const currentCells = cells.slice();
        const currentCell = cells[rowParam][colParam]

        if (currentCell.state === CellState.visible) {
            return;
        } else if (currentCell.state === CellState.open) {
            currentCells[rowParam][colParam].state =CellState.flagged;
            setCells(currentCells);
            setBombCounter(bombCounter - 1);
        } else if (currentCell.state === CellState.flagged) {
            currentCells[rowParam][colParam].state =CellState.open;
            setCells(currentCells);
            setBombCounter(bombCounter + 1);
        }
    }

    const handleFaceClick = (): void => {
        setShowLostTitle(false);
        setShowWinTitle(false);
        clickSound()
        setLive(false);
        setTime(0);
        setCells(generateCells(config));
        setHasLost(false);
        setHasWon(false);
        setBombCounter(config.NO_OF_BOMBS);
    }

    const renderCells = (): React.ReactNode => {
        return cells.map((row, rowIndex) => row.map((cell, colIndex) => (
            <Button 
                key={`${rowIndex} - ${colIndex}`} 
                state={cell.state}
                value={cell.value}
                onClick={handleCellClick}
                onContext={handleCellContext}
                red={cell.red}
                row={rowIndex} 
                col={colIndex} />
            ))
        )
    }

    const showAllBombs = (): Cell[][] => {
        const currentCells = cells.slice();
        return currentCells.map(row => row.map(cell => {
            if (cell.value === CellValue.bomb) {
                return {
                    ...cell,
                    state: CellState.visible
                }
            }

            return cell;
        }))
    }

    const changeLevel = (key: string): void => {        
        setShowLostTitle(false);
        setShowWinTitle(false);
        clickSound();
        setLive(false);
        setTime(0);
        delStorage('cells');
        delStorage('time');
        delStorage('bomb');
        switch (key) {
            case 'easy': setConfig(GAME_CONFIG.easy);
                        setCells(generateCells(GAME_CONFIG.easy));
                        setBombCounter(GAME_CONFIG.easy.NO_OF_BOMBS);
                        setKey('easy');
                        break;
            case 'medium': setConfig(GAME_CONFIG.medium);
                        setCells(generateCells(GAME_CONFIG.medium));
                        setBombCounter(GAME_CONFIG.medium.NO_OF_BOMBS)
                        setKey('medium');
                        break;
            case 'hard': setConfig(GAME_CONFIG.hard);
                        setCells(generateCells(GAME_CONFIG.hard));
                        setBombCounter(GAME_CONFIG.hard.NO_OF_BOMBS)
                        setKey('hard');
                        break;
        }
    }

    return (
        <div className="App">
            <button 
            className="btn"
            onClick={() => {
                setShowScore(!showScore);
            }}>
                Статистика
            </button>
            {showScore && <ModalSCore score={score} />}
            <div className="Header">
                <NumberDisplay value={bombCounter} />
                <div className="Face" onClick={handleFaceClick}>
                    <span role="img" aria-label="face">
                        {face}
                    </span>
                </div>
                <NumberDisplay value={time} />
            </div>
            <div 
                className="Body"
                style={{
                    gridTemplateColumns: `repeat(${config.MAX_COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${config.MAX_ROWS}, 1fr)`
                    }}>
                {renderCells()}
            </div>
            <div className="App__footer">
                <div 
                    className={`btn-lvl ${(key === 'easy') && 'active'}`}
                    onClick={changeLevel.bind(null, 'easy')}>
                    легко</div>
                <div 
                    className={`btn-lvl ${(key === 'medium') && 'active'}`}
                    onClick={changeLevel.bind(null, 'medium')}>
                        средне</div>
                <div 
                    className={`btn-lvl ${(key === 'hard') && 'active'}`}
                    onClick={changeLevel.bind(null, 'hard')}>
                        сложно</div>
            </div>
            {showWinTitle && (<div className="win-title">
                <span>Win!!!</span>
                <span>Click on Face to play more</span>
            </div>)}
            {showLostTitle && (<div className="lost-title">
                <span>Loss((</span>
                <span>Click on Face to try again</span>
            </div>)}
        </div>
    )
};

export default Game;
