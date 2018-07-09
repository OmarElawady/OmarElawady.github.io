function Point(x ,y){
  this.x = x;
  this.y = y;
  this.active = false;
}

Point.prototype.moveUp = function(){
  this.y--;
}
Point.prototype.moveDown = function(){
  this.y++;
}
Point.prototype.moveRight = function(){
  this.x++;
}
Point.prototype.moveLeft   = function(){
  this.x--;
}
