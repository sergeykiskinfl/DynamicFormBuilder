import "../App.css";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Item } from "../types";

type Props = {
  setFormItems: Dispatch<SetStateAction<Item[]>>;
};

export default function DynamicFormBuilder({
  setFormItems,
}: Props): JSX.Element {
  function handleBtnContainerClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLButtonElement;
    const targetBtn = target.closest("button");

    if (!targetBtn) return;

    const formElement = {
      id: uuidv4(),
      type: targetBtn.dataset.type!,
      label: "",
      value: "",
    };

    setFormItems((prev) => [...prev, formElement]);
  }

  return (
    <div className="dynamic-form-builder__container">
      <h1>Dynamic Form Builder</h1>
      <div
        className="dynamic-form-builder__btn-container"
        onClick={(e) => handleBtnContainerClick(e)}
      >
        <button data-type="text">Добавить текстовое поле</button>
        <button data-type="checkbox">Добавить checkbox</button>
        <button data-type="dropdown">Добавить dropdown</button>
      </div>
    </div>
  );
}
