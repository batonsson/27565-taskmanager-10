const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`
];

const countTasks = (tasks) => {
  return tasks.length;
};

const countOverdueTasks = (tasks) => {
  return tasks.reduce((acc, task) => {
    let isOverdue = false;
    let {dueDate} = task;

    if (!dueDate) {
      return acc;
    }

    let currentDate = new Date();

    isOverdue = Math.ceil(Math.abs((currentDate - dueDate) / (1000 * 3600 * 24))) > 7;

    return isOverdue ? acc + 1 : acc;
  }, 0);
};

const countTodayTasks = (tasks) => {
  return tasks.reduce((acc, task) => {
    let isToday = false;
    let {dueDate} = task;

    if (!dueDate) {
      return acc;
    }

    let currentDate = new Date();

    isToday = (currentDate.getFullYear() === dueDate.getFullYear()) && (currentDate.getMonth() === dueDate.getMonth()) && (currentDate.getDay() === dueDate.getDay());

    return isToday ? acc + 1 : acc;
  }, 0);
};

const countFavoriteTasks = (tasks) => {
  return tasks.reduce((acc, task) => {
    let {isFavorite} = task;

    return isFavorite ? acc + 1 : acc;
  }, 0);
};

const countRepeatingTasks = (tasks) => {
  return tasks.reduce((acc, task) => {
    let {repeatingDays} = task;

    return Object.values(repeatingDays).some(Boolean) ? acc + 1 : acc;
  }, 0);
};

const countTaggedTasks = (tasks) => {
  return tasks.reduce((acc, task) => {
    let {tags} = task;

    return tags.size ? acc + 1 : acc;
  }, 0);
};

const countArchivedTasks = (tasks) => {
  return tasks.reduce((acc, task) => {
    let {isArchive} = task;

    return isArchive ? acc + 1 : acc;
  }, 0);
};

const filterActions = {
  all: countTasks,
  overdue: countOverdueTasks,
  today: countTodayTasks,
  favorites: countFavoriteTasks,
  repeating: countRepeatingTasks,
  tags: countTaggedTasks,
  archive: countArchivedTasks
};

const generateFilters = (tasks) => {
  return filterNames.map((filter) => {
    return {
      name: filter,
      count: filterActions[filter](tasks),
    };
  });
};

export {generateFilters};
