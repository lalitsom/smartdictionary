searchBar = document.getElementById('searchbar');
resultList = document.getElementById('result_list');

var jsonfile = require('jsonfile')
var file = 'dictionary.json'
var dict;
jsonfile.readFile(file, function(err, obj) {
  dict = obj;
})


function check(){
  if (searchBar.value.length<1){
    emptyResultDiv();
    addMsg('Waiting for Input....');
  }else{
    emptyResultDiv();
    meaningList = getList(searchBar.value);
    meaningList.forEach(addResult);
  }
}

function emptyResultDiv() {
  resultList.innerHTML="";
}

function addMsg(msg) {
  resultList.innerHTML=  msg;
}

function getList(word) {
  word = word.toUpperCase();
  result = [];
  counter= 0;
  for(var keyword in dict){
      if(keyword.search(word)!=0){
        continue;
      }
      result.push(keyword + " : " +dict[keyword]);
    counter+=1;
    if(counter>40){
      break;
    }
  }
  return result.sort();
}

function addResult(item){
  resultList.innerHTML +=
  '<li>  <div class="result alert alert-warning"> '+item+'</div>  </li>';
}



check();
