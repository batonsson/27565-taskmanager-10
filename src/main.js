import {createMenuTemplate} from './components/site-menu';
import {createFiltersTemplate} from './components/filters';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {generateTasks} from './mocks/task.js';
import {generateFilters} from './mocks/filter.js';

const TASK_COUNT = 17;
const TASK_SHOW_COUNT = 8;

const tasksState = {
  shownCount: 0,
  renderedCount: 0
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const showTasks = () => {
  const {shownCount, renderedCount} = tasksState; // render max of 7 tasks at first call (renderedCount === 0) cause task-edit is already rendered
  const tasksToShow = TASK_SHOW_COUNT < (TASK_COUNT - shownCount) ? TASK_SHOW_COUNT - Number(!renderedCount) : (TASK_COUNT - shownCount);

  tasks.slice(shownCount, shownCount + tasksToShow).forEach((task) => render(tasksBlock, createTaskTemplate(task)));

  tasksState.shownCount += tasksToShow;
  tasksState.renderedCount++;
};

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);

const mainBlock = document.querySelector(`.main`);

render(mainBlock, createBoardTemplate());

const controlsBlock = mainBlock.querySelector(`.main__control`);
const boardBlock = mainBlock.querySelector(`.board`);
const tasksBlock = boardBlock.querySelector(`.board__tasks`);

render(controlsBlock, createMenuTemplate());
render(controlsBlock, createFiltersTemplate(filters), `afterend`);
render(tasksBlock, createTaskEditTemplate(tasks.slice(0, 1)[0]));
tasksState.shownCount++;

showTasks(true);

render(boardBlock, createLoadMoreButtonTemplate(TASK_COUNT > TASK_SHOW_COUNT), `beforeend`);

const loadMoreButton = boardBlock.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  showTasks(false);

  if (tasksState.shownCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
