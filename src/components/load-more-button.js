export const createLoadMoreButtonTemplate = (isVisible) => {
  const hiddenClass = !isVisible ? `load-more_hidden` : ``;

  return (
    `<button class="load-more ${hiddenClass}" type="button">load more</button>`
  );
};
