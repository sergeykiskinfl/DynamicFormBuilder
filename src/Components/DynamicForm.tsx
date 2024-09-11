import {
  Dispatch,
  SetStateAction,
  MouseEvent,
  ChangeEvent,
  FormEvent,
} from "react";
import FormElementItem from "./FormElementItem";
import type { Item } from "../types";

type Props = {
  setFormItems: Dispatch<SetStateAction<Item[]>>;
  formItems: Item[];
};

export default function DynamicForm({
  setFormItems,
  formItems,
}: Props): JSX.Element {
  function handleFormDeleteBtnClick(e: MouseEvent<HTMLElement>) {
    const target = e.target as HTMLButtonElement;
    const targetLi = target.closest("li")!;
    const itemId = targetLi.dataset.itemId;

    if (target.tagName !== "BUTTON") return;
    e.preventDefault();
    setFormItems((prev) => [...prev.filter((item) => item.id !== itemId)]);
  }

  function handleSelectClick(e: MouseEvent<HTMLElement>) {
    const target = e.target as HTMLInputElement;
    const targetLi = target.closest("li")!;
    const itemId = targetLi.dataset.itemId;

    if (target.tagName !== "SELECT") return;

    setFormItems((prev) => [
      ...prev.map((item) => {
        if (itemId === item.id) {
          return { ...item, value: target.value };
        }
        return item;
      }),
    ]);
  }

  function handleFormElementChange(e: ChangeEvent<EventTarget>) {
    const target = e.target as HTMLInputElement;
    const targetLi = target.closest("li")!;
    const itemId = targetLi.dataset.itemId;

    if (target.tagName !== "INPUT") return;

    setFormItems((prev) => [
      ...prev.map((item) => {
        if (itemId === item.id) {
          if (target.dataset.label) return { ...item, label: target.value };
          return { ...item, value: target.value };
        }
        return item;
      }),
    ]);
  }

  // Моковая отправка на сервер
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("formItems ===", JSON.stringify(formItems));
  }

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <ul
        onClick={(e) => {
          handleFormDeleteBtnClick(e);
          handleSelectClick(e);
        }}
        onChange={(e) => handleFormElementChange(e)}
      >
        {formItems.map((formItem) => {
          const { id, type } = formItem;

          return <FormElementItem key={id} id={id} type={type} />;
        })}
      </ul>

      <button type="submit" className="confirm-btn">
        Отправить
      </button>
    </form>
  );
}
