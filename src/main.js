import {createMenuTemplate} from './components/site-menu';
import {createFiltersTemplate} from './components/filters';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {generateTasks} from './mocks/task.js';
import {generateFilters} from './mocks/filter.js';

const TASK_COUNT = 32;
const TASK_SHOW_COUNT = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

let tasksShownCount = TASK_SHOW_COUNT;

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);

const mainBlock = document.querySelector(`.main`);

render(mainBlock, createBoardTemplate());

const controlsBlock = mainBlock.querySelector(`.main__control`);
const boardBlock = mainBlock.querySelector(`.board`);
const tasksBlock = boardBlock.querySelector(`.board__tasks`);

render(controlsBlock, createMenuTemplate());
// render(mainBlock, createFiltersTemplate(filters));
render(tasksBlock, createTaskEditTemplate(tasks.slice(0, 1)[0]));

tasks.slice(0, tasksShownCount - 1).forEach((task) => render(tasksBlock, createTaskTemplate(task)));

render(boardBlock, createLoadMoreButtonTemplate(TASK_COUNT > TASK_SHOW_COUNT), `beforeend`);

const loadMoreButton = boardBlock.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const showStart = tasksShownCount;
  const showEnd = showStart + tasksShownCount;

  tasks.slice(showStart, showEnd).forEach((task) => render(tasksBlock, createTaskTemplate(task)));

  tasksShownCount = showEnd;

  if (tasksShownCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
