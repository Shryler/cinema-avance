import { DataManager } from "./helpers/dataManager.helper";
import { App } from "./app";

if (localStorage.getItem("data-cinema") == null){
    DataManager.initDataStorage();
    setTimeout(() => {
        location.reload();
    }, 500);
}
App.start();