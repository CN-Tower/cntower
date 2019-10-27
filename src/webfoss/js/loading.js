var urlStr = location.href;
var patts = [/index/,/home/,/about/,/service/,/cases/,/customer/,/contact/];
var curPage = "";
for(var i in patts){
    if(patts[i].exec(urlStr)){
        curPage = patts[i].exec(urlStr)[0] + '_';
        break;
    } else {curPage = "index_"}
}
var loadingBg = document.getElementsByClassName("loadingBg")[0];
switch (curPage){
    case "home_":
        loadingBg.style.backgroundColor = "#cdbca6";
        break;
    case "about_":
        loadingBg.style.backgroundColor ="#8a8787";
        break;
    case "service_":
        loadingBg.style.backgroundColor ="#bdb19a";
        break;
    case "cases_":
        loadingBg.style.backgroundColor ="#D6DFEB";
        break;
    case "customer_":
        loadingBg.style.backgroundColor ="#f1e4e4";
        break;
    case "contact_":
        loadingBg.style.backgroundColor ="#b6b6b6";
        break;
    default:
        loadingBg.style.backgroundColor ="#DCDAD4";
        break;
}