var step = .01;
var inter = 10;
function Engine(svg, run, seek){

  
  this.renderer = new Renderer(svg);
  this.state = new State(step);
  this.setClickHandler(svg);
  this.setButtonHandler(run);
  this.setSeekHandler(seek);
  this.setMouseMoveHandler(svg);
  this.setKeyHandler();
  this.setCheckboxesHandler();
  this.activePoint = 0;
  var that = this;
  document.body.addEventListener("click", function(e){
    that.deactivate();
  });
  document.body.addEventListener("mouseup", function(e){
    that.down = false;
  });
}

Engine.prototype.setCheckboxesHandler = function(svg){
  var that = this;
  document.getElementById("lines").addEventListener("click", function(evt){
    that.renderer.bdrawLines = (this.checked);
    that.renderer.render(that.state, that);
  });
  document.getElementById("curve").addEventListener("click", function(evt){
    that.renderer.bdrawCurve = (this.checked);
    that.renderer.render(that.state, that);
  });
  document.getElementById("points").addEventListener("click", function(evt){
    that.renderer.bdrawPoints = (this.checked);
    that.renderer.render(that.state, that);
  });
}
Engine.prototype.setClickHandler = function(svg){
  var that = this;
  svg.addEventListener("click", function(evt){
    var elementx = svg.getBoundingClientRect().left;
    var elementy = svg.getBoundingClientRect().top;

    var x, y;
    x = evt.pageX - elementx - window.scrollX;
    y = evt.pageY - elementy - window.scrollY;
    that.state.addPoint(x, y);
    that.renderer.render(that.state, that);
  });
}
Engine.prototype.setMouseMoveHandler = function(svg){
  var that = this;
  svg.addEventListener("mousemove", function(evt){
    if(that.activePoint && that.down){
      var elementx = svg.getBoundingClientRect().left;
      var elementy = svg.getBoundingClientRect().top;

      var x, y;
      x = evt.pageX - elementx - window.scrollX;
      y = evt.pageY - elementy - window.scrollY;

      that.activePoint.x = x;
      that.activePoint.y = y;
      that.renderer.render(that.state, that);
    }   
  });
}
Engine.prototype.setKeyHandler = function(){
  var that = this;
  document.body.addEventListener("keypress", function(evt){    
    if(that.handleKey(evt.key))
      evt.preventDefault();
  }); 
}
Engine.prototype.handleKey = function(key){
  if(!this.activePoint)return 0;

  if(key == "ArrowUp")
    this.activePoint.moveUp();
  else if(key == "ArrowDown")
    this.activePoint.moveDown();
  else if(key == "ArrowRight")
    this.activePoint.moveRight();
  else if(key == "ArrowLeft")
    this.activePoint.moveLeft();
  else if(key == "Delete"){
    this.state.deletePoint(this.activePoint);
    this.activePoint = 0;
  }else{
    return false;
  }
  this.renderer.render(this.state, this);
  return true;
}
Engine.prototype.setButtonHandler = function(run){
  var that = this;
  run.addEventListener("click", function(){
    that.animate();
  });
}
Engine.prototype.animate = function(){
  var t = 0;
  this.state.setTime(0);
  this.renderer.render(this.state, this);    
  var that = this;
  var func = function(){
    t += step;
    if(t > 1)t = 1;
    that.state.setTime(t);
    that.renderer.render(that.state, that);    
    if(t != 1)
      setTimeout(func, inter);    
  }
  setTimeout(func, inter);    
  
}

Engine.prototype.setSeekHandler = function(seek){
  var that = this;  
  seek.addEventListener("input", function(evt){
    var val = seek.value / 100;
    that.state.setTime(val);
    that.renderer.render(that.state, that);
  });
}

Engine.prototype.activatePoint = function(p){
  p.active = true;
  if(this.activePoint)
    this.activePoint.active = false;  
  this.activePoint = p;
  this.down = true;
  this.renderer.render(this.state, this);
}

Engine.prototype.deactivate = function(){
  if(this.activePoint)
    this.activePoint.active = false;  
  this.activePoint = 0;
  this.renderer.render(this.state, this);
}

Engine.prototype.saveState = function(){
  var st = "";
  for(var i = 0;i < this.state.points.length;i++){
    if(i)
      st += ",";
    st += this.state.points[i].x + "," + this.state.points[i].y;
  }
  return document.location.protocol +"//"+ document.location.hostname + document.location.pathname + "#" + st;
}

Engine.prototype.loadState = function(str){
  var axis = str.split(",");
  for(var i = 0;i < axis.length;i += 2){
    this.state.addPoint(+axis[i], +axis[i + 1]);
  }
  this.renderer.render(this.state, this);
}

