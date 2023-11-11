import { Droppable } from '@hello-pangea/dnd';

import { useGameState } from '../../contexts/GameContext';
import { CardType, PileArea } from '../../type';
import Card from '../Card/Card';

import styles from './Tableau.module.css';

export default function Tableau() {
  const [state] = useGameState();

  return (
    <div className={styles.tableauContainer}>
      <TableauColumn key={1} cards={state.tableau1} index={1} />
      <TableauColumn key={2} cards={state.tableau2} index={2} />
      <TableauColumn key={3} cards={state.tableau3} index={3} />
      <TableauColumn key={4} cards={state.tableau4} index={4} />
      <TableauColumn key={5} cards={state.tableau5} index={5} />
      <TableauColumn key={6} cards={state.tableau6} index={6} />
      <TableauColumn key={7} cards={state.tableau7} index={7} />
    </div>
  );
}

type TableauColumnProps = {
  cards: CardType[];
  index: number;
};

function TableauColumn({ cards, index }: TableauColumnProps) {
  const droppableId = `${PileArea.TABLEAU}${index}`;

  return (
    <Droppable droppableId={droppableId}>
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
