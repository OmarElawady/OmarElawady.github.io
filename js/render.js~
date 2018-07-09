
function Renderer(svg){
  this.svg = svg;
  this.curvePoints = [];  
  this.bdrawCurve = document.getElementById("curve").checked;
  this.bdrawLines = document.getElementById("lines").checked;
  this.bdrawPoints = document.getElementById("points").checked;
}


Renderer.prototype.render = function(state, eng){
  this.svg.innerHTML = "";  
  var n = state.points.length;

  this.curvePoints = [];
  if(this.bdrawLines)this.draw(state.points, state.t);
  if(this.bdrawCurve)this.drawCurve(state);
  if(this.bdrawPoints)
  for(var i = 0;i < n;i++){
    this.addPoint(state.points[i], eng);  
  }
  
}
Renderer.prototype.addLine = function(a, b){
  var l =  document.createElementNS('http://www.w3.org/2000/svg', 'line');
  l.setAttribute("x1", a.x);
  l.setAttribute("y1", a.y);
  l.setAttribute("x2", b.x);
  l.setAttribute("y2", b.y);
  l.setAttribute("style", "stroke:rgb(139,0,0);stroke-width:2");
  this.svg.appendChild(l);
}

Renderer.prototype.addPoint = function(a, eng){
  var p =  document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  p.setAttribute("cx", a.x);
  p.setAttribute("cy", a.y);
  p.setAttribute("r", 5);
  p.setAttribute("stroke", "green");
  p.setAttribute("stroke-width", "1");
  p.setAttribute("class", "control");
  p.setAttribute("fill", (a.active? "blue" : "yellow"));
  p.addEventListener("mousedown", function(e){
    eng.activatePoint(a);
    e.stopPropagation();
  });
  this.svg.appendChild(p);
}

Renderer.prototype.draw = function(ps, t){
  var n = ps.length;
  if(n < 2)return 0;
  var c =  document.createElementNS('http://www.w3.org/2000/svg', 'path');
  c.setAttribute("style", "stroke:rgb(139,0,0);stroke-width:2");
  var path = "M " + ps[0].x + " " + ps[0].y;
  for(var i = 1;i < n;i++){
    path += " L " + ps[i].x + " " + ps[i].y;    
  }
  c.setAttribute("d", path);
  this.svg.appendChild(c);  
  this.draw(Bez.reduce(ps, t), t);
}



Renderer.prototype.drawCurve = function(state){
  if(state.points == 0)return 0;
  var c =  document.createElementNS('http://www.w3.org/2000/svg', 'path');
  
  c.setAttribute("stroke", "brown");
  c.setAttribute("stroke-width", "3");
  c.setAttribute("fill", "none");
  var cur = Bez.calc(state.points, 0);
  var path = "M " + cur.x + " " + cur.y;
  for(var i = step;i < state.t;i += step){
    cur = Bez.calc(state.points, i);
    path += " L " + cur.x + " " + cur.y;
  }

  c.setAttribute("d", path);
  this.svg.appendChild(c);
}


