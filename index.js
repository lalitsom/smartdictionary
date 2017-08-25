const remote = require('electron').remote;
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

AutoLauncher = mainProcess.Launcher();

searchBar = document.getElementById('searchbar');
resultList = document.getElementById('result_list');
suggestionsList = document.getElementById('suggestions_list');


const {clipboard} = require('electron');
setInterval(checkClipboard,2000);
var jsonfile = require('jsonfile')
var file = 'dictionary.json'
var dict;
jsonfile.readFile(file, function(err, obj) {
  if(err){
    console.log(err);
  }else{
      dict = obj;
  }
});


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

function checkClipboard(){
  sentence = (clipboard.readText()).split(" ");
  //console.log(sentence);
  suggestionsList.innerHTML="";
  for(var i in sentence){
    //console.log(word)
    if(i>10 || sentence[i].length > 24){
      continue;
    }
    suggestionsList.innerHTML+=  "<span onclick=search(this);>" + sentence[i] + "</span> ";
  }
}

function search(text){
  searchBar.value = text.innerHTML;
  check();
  searchBar.focus();
}

function toggleLogin(chkbox){
  if(chkbox.checked){
    AutoLauncher.enable();
  }else{
    AutoLauncher.disable();
  }
}



check();
