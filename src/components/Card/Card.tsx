import { Draggable } from '@hello-pangea/dnd';

import { CardType } from '../../type';

import styles from './Card.module.css';

type CardProps = {
  data: CardType;
  index: number;
};

export default function Card({ data, index }: CardProps) {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {data.revealed ? `${data.suitSymbol} ${data.valueSymbol}` : null}
        </div>
      )}
    </Draggable>
  );
}
