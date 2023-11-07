import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

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
        <div ref={provided.innerRef} className={styles.columnContainer}>
          {cards.map((card, index) => (
            <Draggable key={card.id} draggableId={card.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card data={card} />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  );
}
