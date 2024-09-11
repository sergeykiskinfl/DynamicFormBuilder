import { useState } from "react";
import "./App.css";
import DynamicFormBuilder from "./Componets/DynamicFormBuilder";
import DynamicForm from "./Componets/DynamicForm";
import type { Item } from "./types";

function App() {
  const [formItems, setFormItems] = useState<Item[]>([]);

  return (
    <main>
      <DynamicFormBuilder setFormItems={setFormItems} />
      <DynamicForm setFormItems={setFormItems} formItems={formItems} />
    </main>
  );
}

export default App;
