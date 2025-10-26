import type { Example } from "../types";
import DynamicId from "../components/Examples/DynamicId/DynamicId";
import ClickCounter from "../components/Examples/ClickCounter/ClickCounter";
import Visibility from "../components/Examples/Visibility/Visibility";
import AjaxData from "../components/Examples/AjaxData/AjaxData";
import MouseOver from "../components/Examples/MouseOver/MouseOver";

export const examples: (Example & { component: React.ComponentType })[] = [
  {
    id: "dynamic-id",
    title: "Динамический ID",
    description: "Элемент с динамически изменяющимся ID атрибутом",
    category: "Динамический контент",
    difficulty: "легкий",
    component: DynamicId,
  },
  {
    id: "click-counter",
    title: "Счетчик кликов",
    description: "Кнопка, которая увеличивает счетчик при нажатии",
    category: "Пользовательское взаимодействие",
    difficulty: "легкий",
    component: ClickCounter,
  },
  {
    id: "visibility",
    title: "Видимость элемента",
    description: "Элемент, который появляется после задержки",
    category: "Динамический контент",
    difficulty: "средний",
    component: Visibility,
  },
  {
    id: "ajax-data",
    title: "AJAX данные",
    description: "Данные, загружаемые асинхронно после загрузки страницы",
    category: "Асинхронные операции",
    difficulty: "средний",
    component: AjaxData,
  },
  {
    id: "mouse-over",
    title: "Наведение курсора",
    description: "Элементы, которые меняются при наведении курсора",
    category: "Пользовательское взаимодействие",
    difficulty: "легкий",
    component: MouseOver,
  },
];
