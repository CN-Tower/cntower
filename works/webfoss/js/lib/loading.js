var urlStr = location.href;
var patts = [/index\.html/,/home\.html/,/about\.html/,/service\.html/,/cases\.html/,/customer\.html/,/contact\.html/];
var curPage = "";
for(var i in patts){
    if(patts[i].exec(urlStr)){
        curPage = patts[i].exec(urlStr)[0];
        break;
    }else{curPage = "index.html"}
}
var loadingBg = document.getElementsByClassName("loadingBg")[0];
switch (curPage){
    case "home.html":
        loadingBg.style.backgroundColor = "#cdbca6";
        break;
    case "about.html":
        loadingBg.style.backgroundColor ="#8a8787";
        break;
    case "service.html":
        loadingBg.style.backgroundColor ="#bdb19a";
        break;
    case "cases.html":
        loadingBg.style.backgroundColor ="#D6DFEB";
        break;
    case "customer.html":
        loadingBg.style.backgroundColor ="#f1e4e4";
        break;
    case "contact.html":
        loadingBg.style.backgroundColor ="#b6b6b6";
        break;
    default:
        loadingBg.style.backgroundColor ="#DCDAD4";
        break;
}