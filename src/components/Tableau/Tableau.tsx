import React from 'react';
import { Droppable } from '@hello-pangea/dnd';

import { useGameState } from '../../contexts/GameContext';
import { CardType } from '../../type';
import Card from '../Card/Card';

import styles from './Tableau.module.css';

export default function Tableau() {
  const [state, dispatch] = useGameState();

  return (
    <div className={styles.tableauContainer}>
      {state.tableau.map((column, index) => (
        <TableauColumn key={index} cards={column} />
      ))}
    </div>
  );
}

type TableauColumnProps = {
  cards: CardType[];
};

function TableauColumn({ cards }: TableauColumnProps) {
  const droppableId = React.useId();
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={styles.columnContainer}
          {...provided.droppableProps}
        >
          {cards.map((card, index) => (
            <Card data={card} index={index} />
          ))}
        </div>
      )}
    </Droppable>
  );
}
