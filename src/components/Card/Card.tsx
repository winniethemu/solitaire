import { CardType } from '../../type';

import styles from './Card.module.css';

type CardProps = {
  data: CardType;
};

export default function Card({ data }: CardProps) {
  return <div className={styles.container}>{data.value}</div>;
}
