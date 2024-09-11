type Props = {
  type: string;
  id: string;
};

export default function FormElementItem({ type, id }: Props): JSX.Element {
  let mainInputElement;

  switch (type) {
    case "text":
      // Проверка текстового инпута
      mainInputElement = <input type="text" minLength={3} required />;
      break;
    case "dropdown":
      mainInputElement = (
        <select>
          <option value="value1" defaultValue="value1">
            Option 1
          </option>
          <option value="value2">Option 2</option>
        </select>
      );
      break;
    case "checkbox":
      mainInputElement = <input type="checkbox" />;
      break;
  }

  return (
    <li data-item-id={id} className="form-element-item-container">
      {/* Проверка поля Label */}
      <input
        type="text"
        placeholder="Label"
        data-label
        minLength={3}
        required
      />
      {mainInputElement}
      <button>Удалить</button>
    </li>
  );
}
