import theme from './theme.module.scss';

export default function Banner({
  title = 'What will this page contain?',
  description,
  listItems,
}: {
  title?: string;
  description: string;
  listItems: string[];
}) {
  return (
    <div className={theme.container}>
      <p className={theme.title}>{title}</p>
      <p className={theme.description}>{description}</p>
      <ul className={theme.list}>
        {listItems.map(item => (
          <li key={item} className={theme.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
