export const fs = require('fs');


export const createNewFile = () => (dispatch) => {
  fs.open('testFile.txt', 'w', (err) => {
        if(err) throw err;
        alert('File created');
    });
};

export const appendFile = () => (dispatch) => {
  fs.appendFile('testFile.txt', ' This line is beyond the end.', (err) => {
        if(err) throw err;
        alert('Data has been added!');
    });
};

export const readFile = () => (dispatch) => {
  fs.readFile('textFile.txt', 'utf8', (err, data) => {
       if(err) throw err;
       alert(data);
   });
};

export const getAlltables = () => (dispatch) => {
  fs.readFile('tables.txt', 'utf8', (err, data) => {
       if(err) throw err;
       alert(data);
   });
};

export const delTable = (path) => (dispatch) => {
  fs.unlink(path, (err) => {
        if(err) throw err;
        alert('File deleted successfully!');
    });
};
