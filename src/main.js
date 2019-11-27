import {createMenuTemplate} from './components/site-menu';
import {createFiltersTemplate} from './components/filters';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

const TASKS_NUMBER = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainBlock = document.querySelector(`.main`);
const controlsBlock = mainBlock.querySelector(`.main__control`);

render(controlsBlock, createMenuTemplate());
render(mainBlock, createFiltersTemplate());
render(mainBlock, createBoardTemplate());

const tasksBlock = mainBlock.querySelector(`.board__tasks`);

render(tasksBlock, createTaskEditTemplate());

for (let i = 0; i < TASKS_NUMBER; i++) {
  render(tasksBlock, createTaskTemplate());
}

render(tasksBlock, createLoadMoreButtonTemplate(), `afterend`);
