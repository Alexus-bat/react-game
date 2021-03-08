import React from 'react';

type ScorePrors = {
    score: {
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
}

const ModalSCore: React.FC<ScorePrors> = ({score}) => {
    return (
        <div className="ModalScore">
            {score}
            <div className="title">
                Легко:
                <span></span>
                {score}
            </div>
        </div>
    )
}

export default ModalSCore;
