function parameter(a, b, t){
  return new Point(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
}

var Bez = {
  reduce: function(ps, t){
    var newPs = [];
    var n = ps.length;
    for(var i = 0;i < n - 1;i++){
      newPs.push(parameter(ps[i], ps[i+1], t));
    }
    return newPs;
  }
  ,calc: function(ps, t){
    if(t == 0)return ps[0];
    var n = ps.length;
    if(t == 1)return ps[ps.length - 1];
    var coef = Math.pow(1 - t, n - 1);
    var x = coef * ps[0].x;
    var y = coef * ps[0].y;
     
    for(var i = 1;i < ps.length;i++){
      coef *= t / (1 - t)  * (n - i) / i;
      x += ps[i].x * coef;
      y += ps[i].y * coef;    
    }
    return new Point(x, y);
  }
}


function   binomial( n,  k){
  var res = 1;
  for(var i = 0;i < k;i++){
  res *= (n - i) / (i + 1);
  }
  return res;
}

