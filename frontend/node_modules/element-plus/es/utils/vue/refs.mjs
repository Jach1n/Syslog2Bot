const composeRefs = (...refs) => {
  return (el) => {
    refs.forEach((ref) => {
      ref.value = el;
    });
  };
};

export { composeRefs };
//# sourceMappingURL=refs.mjs.map
