function FileReader() {
  
}

FileReader.prototype.readLine = function(lineNumber) {
  return $.get('assets/violin/setup.txt').then(function(data) {
    return data.split("\n")[lineNumber];
  });
};

// module.exports = FileReader;

