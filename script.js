var selectedSquare = 0;
var activeColor = "#ff0000"
var backgroundColor = "#ffffff"

backgroundPicker = document.getElementById('shape-selector__background-picker')
backgroundPicker.value = backgroundColor;
data = [
    {
        type:'four-square',
        0: ['none',0,0,0,"#ff0000"],
        1: ['rectangle',0,1,1,"#ff0000"],
        2: ['none',1,0,0,"#ff0000"],
        3: ['circle',1,1,3,"#ff0000"],

    }
]




function renderShapes(container, data) {
    const svg = d3.selectAll(`.${container}`)
    .attr("viewBox", `0 0 400 400`)


    svg.selectAll("*").remove();

    const keys = Object.keys(data[0]).filter(key => key !== 'type');
    
    keys.forEach(key => {
      const [letter, row, col, rotation, color] = data[0][key];
      let shape;
  
      if (letter === 'rectangle') {
        shape = svg.append('rect')
                   .attr('x', `${200*col}`)
                   .attr('y', `${200*row}`)
                   .attr('width', 200)
                   .attr('height', 200)
                   .attr('fill', color);
      } else if (letter === 'none') {
                    shape = svg.append('rect')
                    .attr('x', `${200*col}`)
                    .attr('y', `${200*row}`)
                    .attr('width', 200)
                    .attr('height', 200)
                    .attr('opacity', '0');

      } else if (letter === 'circle') {
                    shape = svg.append("path")
                    .attr("fill", color)
                    .attr("transform", `translate(${200 * col}, ${200 * row})`)
                    .attr("d", d=> { 
                        if(rotation == 0){ 
                            return "M2.67029e-05 19.3548L1.88066e-05 200L180.645 200C180.645 100.232 99.7676 19.3548 2.67029e-05 19.3548Z"}
                        else if(rotation == 1){
                            return"M180.645 3.05176e-05L3.10513e-05 1.47251e-05L1.52588e-05 180.645C99.7676 180.645 180.645 99.7676 180.645 3.05176e-05Z" }
                        else if(rotation == 2){
                            return "M200 180.645L200 2.26213e-05L19.3548 3.05176e-05C19.3548 99.7676 100.232 180.645 200 180.645Z" }
                        else if(rotation == 3){
                            return"M19.3548 200H200V19.3548C100.232 19.3548 19.3548 100.232 19.3548 200Z" }
                        }
                        );
      } else if (letter === 'triangle') {
        shape = svg.append('polygon')
                  // .attr('points', `${200*col},${200*row} ${200*col},${200+200*row} ${200+200*col},${200+200*row}`)
                   
                   .attr('points', d => {
                    if(rotation == 0){
                        return `${200*col},${200*row} ${200*col},${200+200*row} ${200+200*col},${200+200*row}`
                    }
                    else if(rotation == 1){
                        return `${200*col},${200*row} ${200*col},${200+200*row} ${200+200*col},${200*row}`
                    }
                    else if(rotation == 2){
                        return `${200*col},${200+200*row} ${200+200*col},${200+200*row} ${200+200*col},${200*row}`
                    }
                    else if(rotation == 3){
                        return `${200*col},${200*row} ${200+200*col},${200+200*row} ${200+200*col},${200*row}`
                    }
                   }) 
                   .attr('fill', color)        
                }

                shape.on('click', function() {
                    // Update rotation value in data
                    data[0][key][3] = (rotation + 1) % 4; // Increment rotation by 1, wrapping around at 4
              
                    // Re-render shapes with updated data
                    svg.selectAll('*').remove(); // Clear existing shapes
                    render();
                  });
      })};


  

  function render(){
    renderShapes('chart-container', data);
  }
  render();
  
  function handleClick() {
    // Increment rotate property in data for all triangles
    data = data.map(d => ({ rotate: d.rotate + 1 }));
  
    // Update triangles with new rotation values
    svg.selectAll('polygon')
      .transition()
      .duration(500)
      .attr("transform", d => `rotate(${d.rotate}, 125, 100)`);
  }

  //rotate squares
const charts = document.getElementsByClassName("chart-container")


charts[1].style.transform = 'rotate(90deg)';
charts[2].style.transform = 'rotate(270deg)';
charts[3].style.transform = 'rotate(180deg)';

     
//show data based on clicked square
const rectangle = document.getElementById('shape-selector__rectangle')
const triangle = document.getElementById('shape-selector__triangle')
const none = document.getElementById('shape-selector__none')
const circle = document.getElementById('shape-selector__circle')

rectangle.addEventListener('click',function(){
    data[0][selectedSquare][0] = 'rectangle'
    render();
    renderControlPanel()
})

triangle.addEventListener('click',function(){
    data[0][selectedSquare][0] = 'triangle'
    render();
    renderControlPanel()
})
none.addEventListener('click',function(){
    data[0][selectedSquare][0] = 'none'
    render();
    renderControlPanel()
})

circle.addEventListener('click',function(){
    data[0][selectedSquare][0] = 'circle'
    render();
    renderControlPanel()
})

//change color

colorPicker = document.getElementById('shape-selector__color-picker')
colorPicker.addEventListener("input", function(event){
    activeColor = event.target.value
    data[0][selectedSquare][4] = activeColor;
    render()
}, false);

backgroundPicker.addEventListener("input", function(event){
    fourBlock = document.getElementById('four-block')
    fourBlock.style.backgroundColor = event.target.value
    mainBlock = document.getElementById('main-block')
    mainBlock.style.backgroundColor = event.target.value

}, false);



//render the control panel
function renderControlPanel() {
    controlPanel = document.getElementById('control__shape-selector')
    controlPanel.style.display = 'flex'
    instructions = document.getElementById('control__shape-selector-empty')
    instructions.style.display = 'none'
    none.style.color = 'black';
    triangle.style.color = 'black';
    rectangle.style.color = 'black';
    circle.style.color = 'black';
if(data[0][selectedSquare][0] == 'triangle'){
    triangle.style.color = 'blue';
}
else if(data[0][selectedSquare][0] == 'rectangle'){
    rectangle.style.color = 'blue';
}
else if(data[0][selectedSquare][0] == 'none'){
    none.style.color = 'blue';
}
else if(data[0][selectedSquare][0] == 'circle'){
    circle.style.color = 'blue';
}
}

const boxes = document.querySelectorAll('.box');

// Add click event listener to each box
boxes.forEach((box, index) => {
    box.addEventListener('click', function() {
        selectedSquare = index;
        colorPicker.value = data[0][selectedSquare][4]
        
        // Toggle 'hidden' class on the clicked box
        boxes.forEach((temp) => {
            temp.style.border = '0px'
            temp.style.pointerEvents = 'auto'
        })
        this.style.border = '5px solid black'
        this.style.pointerEvents = 'none'
        renderControlPanel()
    });
});