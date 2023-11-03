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
  return (
    <div className={styles.columnContainer}>
      {cards.map((card) => {
        const id = `${card.suit}:${card.value}`;
        return <Card key={id} data={card} />;
      })}
    </div>
  );
}
