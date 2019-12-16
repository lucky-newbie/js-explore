function flat(arr){
  var res = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res.push(...flat(item))
    } else {
      res.push(item)
    }
  });
  return res;
}