import {DAYS, COLORS} from '../const';
import {getRandomArrayItem, getRandomDate} from '../utils';

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const generateRepeatingDays = (days) => {
  const repeatingDays = {};

  for (const day of days) {
    repeatingDays[day] = Math.random() > 0.5;
  }

  return repeatingDays;
};

const generateTags = (tags) => {
  return tags.filter(() => Math.random() > 0.5).slice(0, 3);
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: generateRepeatingDays(DAYS),
    tags: new Set(generateTags(Tags)),
    color: getRandomArrayItem(COLORS),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTasks};
