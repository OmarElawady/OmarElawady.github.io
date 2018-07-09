function State(step){
  this.step = step;
  this.points = [];
  this.t = 0;
  this.activePoint = -1;
}

State.prototype.addPoint = function(x, y){
  this.points.push(new Point(x, y));
}

State.prototype.setTime = function(t){
  this.t = t;
}

State.prototype.deletePoint = function(p){
  for(var i = 0;i < this.points.length;i++){
    if(p.x == this.points[i].x && this.points[i].y == p.y){
      this.points.splice(i, 1);
    }
  }
}
