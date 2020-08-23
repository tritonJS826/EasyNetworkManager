const newDataId = () => {
  const now = Date.now();
  const id = String(now);

  return id;
};

export default newDataId;
