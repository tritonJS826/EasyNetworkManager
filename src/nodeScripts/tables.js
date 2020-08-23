export const fs = require('fs');

export const createNewFile = (path) => {
  fs.open(path, 'w', (err) => {
    if (err) throw err;
  });
};

export const appendFile = (file, context) => {
  fs.appendFile(file, context, (err) => {
    if (err) throw err;
  });
};

export const readFileSync = (file) => {
  const rawdata = fs.readFileSync(file);
  const data = JSON.parse(rawdata);

  return data;
};

export const initialization = () => {
  const path = './tables.json';

  try {
    if (!fs.existsSync(path)) {
      appendFile(path, JSON.stringify({ tables: [] }));
    }
  } catch (err) {
    console.error(err);
  }
};

export const delFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
    alert(`File ${path} removed`);
  });
};

export const rewriteFile = (path, content) => {
  fs.writeFileSync(path, content, { encoding: 'utf8', flag: 'w' }, (err) => {
    if (err) throw err;
  });
};

export const renameFile = (path1, path2) => {
  fs.renameSync(path1, path2, (err) => {
    if (err) throw err;
  });
};
