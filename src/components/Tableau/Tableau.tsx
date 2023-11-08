import { Droppable } from '@hello-pangea/dnd';

import { useGameState } from '../../contexts/GameContext';
import { CardType } from '../../type';
import Card from '../Card/Card';

import styles from './Tableau.module.css';

export default function Tableau() {
  const [state] = useGameState();

  return (
    <div className={styles.tableauContainer}>
      {state.tableau.map((column, index) => (
        <TableauColumn key={index} cards={column} index={index} />
      ))}
    </div>
  );
}

type TableauColumnProps = {
  cards: CardType[];
  index: number;
};

function TableauColumn({ cards, index }: TableauColumnProps) {
  return (
    <Droppable droppableId={`${index}`}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className={styles.columnContainer}
          {...provided.droppableProps}
        >
          {cards.map((card, index) => (
            <Card key={card.id} data={card} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
