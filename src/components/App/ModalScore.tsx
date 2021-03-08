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
            <div className="title">
                Легко:
                <span>{`Побед ${score.easy.countWin}`}</span>
                <span>{`Лучшее время ${score.easy.bestTime === null ? '-' : score.easy.bestTime} сек`}</span>
            </div>
            <div className="title">
                Средне:
                <span>{`Побед ${score.medium.countWin}`}</span>
                <span>{`Лучшее время ${score.medium.bestTime === null ? '-' : score.medium.bestTime} сек`}</span>
            </div>
            <div className="title">
                Сложно:
                <span>{`Побед ${score.hard.countWin}`}</span>
                <span>{`Лучшее время ${score.hard.bestTime === null ? '-' : score.hard.bestTime} сек`}</span>
            </div>
        </div>
    )
}

export default ModalSCore;
