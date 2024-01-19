let fillVal = 0;
let fill = false;

const fillModeCheckbox = document.getElementById('fillMode');
const fillNumInput = document.getElementById('fillNum');

const groups=[
  [ 0,  0,  1,  1,  2,  2,  2,  2,  2,  2,  3,  3,  3,  3,  3,  3,  3],
  [ 0,  0,  0,  1,  1,  1,  1,  2,  2,  2,  3,  4,  4,  4,  4,  3,  3],
  [ 0,  5,  5,  5,  1,  1,  1,  2,  6,  2,  3,  4,  3,  3,  4,  7,  3],
  [ 0,  5,  5,  1,  1,  1,  1,  6,  6,  2,  3,  3,  3,  4,  4,  7,  3],
  [ 0,  5,  8,  1,  6,  6,  6,  6,  9, 11, 11,  3,  3,  4,  7,  7,  3],
  [ 0,  5,  8,  8,  6,  8,  9,  9,  9, 10, 11,  3,  3,  4,  4,  7,  7],
  [ 0,  5, 13,  8,  8,  8,  9,  9,  9, 10, 11,  3,  3, 12,  4,  7,  7],
  [ 0,  5, 13, 13,  8,  9,  9, 10, 10, 10, 11,  3, 11, 12,  7,  7,  7],
  [ 0,  5, 13, 13, 13,  9,  9, 10, 11, 11, 11, 11, 11, 12, 12,  7,  7],
  [ 0,  5, 13, 13, 13, 13, 10, 10, 15, 15, 11, 12, 11, 12,  7,  7,  7],
  [ 0,  5, 13, 13, 13, 10, 10, 14, 14, 15, 15, 12, 12, 12, 12, 12,  7],
  [ 0,  5, 13, 13, 10, 10, 14, 14, 14, 17, 15, 15, 16, 16,  7, 12,  7],
  [ 0,  5, 13, 14, 14, 14, 14, 14, 17, 17, 17, 15, 15, 16,  7,  7,  7],
  [ 0,  5, 14, 14, 14, 14, 14, 14, 17, 19, 17, 16, 16, 16, 16,  7,  7],
  [ 0,  5,  5, 14,  0,  0, 18, 17, 17, 19, 16, 16, 19, 19, 16, 16,  7],
  [ 0,  0,  5,  5,  0, 18, 18, 19, 19, 19, 19, 19, 19, 19,  7,  7,  7],
  [ 0,  0,  0,  0,  0,  0, 18, 18, 18, 18, 18, 18, 18, 19,  7,  7,  7],
];

//const prev = [];

const colors = [
'repeating-linear-gradient(45deg, #ffe6cc, #ffe6cc 7px, #ffffff 7px, #ffffff 14px)',
'#ff9999',
'repeating-linear-gradient(45deg, #ccffcc, #ccffcc 7px, #ffffff 7px, #ffffff 14px)',
'#99ff99',
'repeating-linear-gradient(45deg, #ccccff, #ccccff 7px, #ffffff 7px, #ffffff 14px)',
'#9999ff',
'repeating-linear-gradient(45deg, #ffcccc, #ffcccc 7px, #ffffff 7px, #ffffff 14px)',
'#ffd699',
'repeating-linear-gradient(45deg, #99ffd6, #99ffd6 7px, #ffffff 7px, #ffffff 14px)',
'#d699ff',
'repeating-linear-gradient(45deg, #d699ff, #d699ff 7px, #ffffff 7px, #ffffff 14px)',
'#99ffd6',
'repeating-linear-gradient(45deg, #ffd699, #ffd699 7px, #ffffff 7px, #ffffff 14px)',
'#ffcccc',
'repeating-linear-gradient(45deg, #9999ff, #9999ff 7px, #ffffff 7px, #ffffff 14px)',
'#ccccff',
'repeating-linear-gradient(45deg, #99ff99, #99ff99 7px, #ffffff 7px, #ffffff 14px)',
'#ccffcc',
'repeating-linear-gradient(45deg, #ff9999, #ff9999 7px, #ffffff 7px, #ffffff 14px)',
'#ffe6cc',
];
// Event listener for the Fill Mode checkbox
fillModeCheckbox.addEventListener('change', function() {
    fill = this.checked;
});

// Event listener for the Fill Value number input
fillNumInput.addEventListener('input', function() {
    fillVal = parseInt(this.value) || 0;
});

const calcButton = document.getElementById('calculate');

calcButton.addEventListener('click', calcArea);

const areaText = document.getElementById('area');

//Create Group Counts
const groupSums = document.getElementById('group-sums');
for(let i = 0; i < 20; i++){
  const groupSum= document.createElement('div');
  groupSum.classList.add('label');
  groupSum.style.background = colors[i];
  groupSum.id = `g${i}`;
  groupSum.innerText = '0';
  groupSums.appendChild(groupSum);
}

const gridSize = 17;
const gridContainer = document.getElementById('grid-container');
const rowLabels = [14, 24, 24, 39, 43, '?', 22, 23, 29, 28, 34, 36, 29, 26, 26, 24, 20];
const colLabels = [13, 20, 22, 28, 30, 36, 35, 39, 49, 39, 39, '?', 23, 32, 23, 17, 13];
// Create the grid
for(let i = 0; i<gridSize; i++){
    const rowLabel = document.createElement('div');
    rowLabel.classList.add('label');
    rowLabel.classList.add('target');
    rowLabel.innerText = rowLabels[i];
    rowLabel.id = `tr${i}`;
    gridContainer.appendChild(rowLabel);
}

for(let i = 0; i< 2; i++){
  const dummy = document.createElement('div');
  dummy.classList.add('label');
  gridContainer.appendChild(dummy);
}

for(let i = 0; i < gridSize; i++){
  const rowSumLabel = document.createElement('div');
  rowSumLabel.classList.add('label');
  rowSumLabel.innerText = '0';
  rowSumLabel.id = `r${i}`;
  gridContainer.appendChild(rowSumLabel);
}

for(let i = 0; i< 2; i++){
  const dummy = document.createElement('div');
  dummy.classList.add('label');
  gridContainer.appendChild(dummy);
}

for (let j = 0; j < gridSize; j++) {
  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.innerText = '0';
    const colorIndex = groups[i][j];
    cell.style.background = colors[colorIndex];
    cell.addEventListener('click', changeCellValue);
    gridContainer.appendChild(cell);
  }
  const colSumLabel = document.createElement('div');
  colSumLabel.classList.add('label');
  colSumLabel.innerText = '0';
  colSumLabel.id = `c${j}`;
  gridContainer.appendChild(colSumLabel);
  //actual Values
  const colLabel = document.createElement('div');
  colLabel.classList.add('label');
  colLabel.classList.add('target');
  colLabel.innerText = colLabels[j];
  colLabel.id = `tc${j}`;
  gridContainer.appendChild(colLabel);
}

function changeCellValue(event) {
  event.preventDefault();
  const cell = event.target;
  const currentValue = parseInt(cell.innerText);
  const newValue = fill? (currentValue===fillVal?0:fillVal) :  Math.max(currentValue + (event.shiftKey? -1 : 1),0);
  cell.innerText = newValue;
  if(newValue == 0){
    cell.classList.remove("nonZero");
  }else{
    cell.classList.add("nonZero");
  }
  updateSums(cell.dataset.row, cell.dataset.col, newValue-currentValue);
}

function updateSums(row, col, change) {
  // Update row and column sums
  const rowSum = document.getElementById(`r${row}`);
  const colSum = document.getElementById(`c${col}`);
  const rowTgt = document.getElementById(`tr${row}`);
  const colTgt = document.getElementById(`tc${col}`);
  colSum.innerText = parseInt(colSum.innerText) + change;
  rowSum.innerText = parseInt(rowSum.innerText) + change;
  if(colTgt.innerText !== "?") colTgt.innerText = parseInt(colTgt.innerText) - change;
  if(rowTgt.innerText !== "?") rowTgt.innerText = parseInt(rowTgt.innerText) - change;

  // Update group sums
  const group = groups[row][col];
  const groupSum = document.getElementById(`g${group}`);
  groupSum.innerText = parseInt(groupSum.innerText)+change;
}

//Calculates the areas of orthogonally adjacent white (0s) spaces
function calcArea(){
    const cells = document.querySelectorAll('.cell');
    const matrix = [];
    // Loop through each cell and extract data attributes
    cells.forEach(cell => {
      const row = cell.dataset.row;
      const col = cell.dataset.col;
      const value = parseInt(cell.innerText);
    
      // Ensure the matrix has a row for the current row
      matrix[row] = matrix[row] || [];
    
      // Assign the value to the corresponding position in the matrix
      matrix[row][col] = value;
    });
    console.log(matrix);
    //Do DFS to get areas
    var areas = [];
    const visited = Array.from({ length: 17 }, () => Array(17).fill(false));
    for(var startI = 0; startI < gridSize; startI++){
        for(var startJ = 0; startJ < gridSize; startJ++){
            if(!visited[startI][startJ] && !matrix[startI][startJ]){
                visited[startI][startJ] = true;
                const stack = [];
                stack.push({i: startI, j:startJ});
                const n = matrix.length;
                var area = 0;
                while(stack.length!=0){
                    const currentPoint = stack.pop();
                    const i = currentPoint["i"];
                    const j = currentPoint["j"];
                    area++;
                    if(i>0&&!visited[i-1][j]&&!matrix[i-1][j]){
                        stack.push({i: i-1, j: j});
                        visited[i-1][j]= true;
                    } 
                    if(j>0&&!visited[i][j-1]&&!matrix[i][j-1]){
                        stack.push({i: i, j: j-1});
                        visited[i][j-1]= true;
                    } 
                    if(i<n-1&&!visited[i+1][j]&&!matrix[i+1][j]){
                        stack.push({i: i+1, j: j});
                        visited[i+1][j]= true;
                    } 
                    if(j<n-1&&!visited[i][j+1]&&!matrix[i][j+1]){
                        stack.push({i: i, j: j+1});
                        visited[i][j+1]= true;
                    }
                }
                areas.push(area);
            }
        }
    }

    areas = areas.sort((a,b) => a - b);
    //console.log("Areas: ");
    console.log(areas);
    areaCounts = [];
    var i =0;
    while(i< areas.length){
        const curr = areas[i];
        var j=1;
        while(i+j<areas.length && areas[i+j] == curr) j++;
        areaCounts.push([curr, j]);
        i+=j
    }
    console.log(areaCounts);
    const totalArea = areaCounts.reduce((prev, curr) =>prev * (Math.pow(curr[0], curr[1])), 1);
    const areaEquation = areaCounts.reduce((prev, curr) =>prev + `(${curr[0]}^${curr[1]})*`, "");
    console.log(totalArea);
    areaText.innerText = 'Total Area = ' + areaEquation.slice(0,-1) + ` = ${totalArea}`;
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
}
