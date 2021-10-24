const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export { classNames }
