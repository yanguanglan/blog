function xhrLoadJS (url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
        var script = document.createElement('script');
        script.type = 'text/script';
        script.text = xhr.responseText;
        eval(xhr.responseText);
        document.body.appendChild(script);
        callback();
      }
    }
  }
  xhr.send(null);
}