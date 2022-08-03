import * as Controllers from "./controllers/index";

export class App {

    static spaLinks = document.getElementsByClassName('spa-link');

    static start = () => {

        window.onpopstate = (evt) => { //événement qui se produit quand on se "deplace" dans l'historique du navigateur
            console.log("window.onpopstate");
            App.navigateToRoute(evt.state?.route || "");
        }

        window.onload = () => {
            console.log("window.onload");
            //événement qui se produit quand la page se charge 
            //par refresh ou saisie d'une route dans la barre d'adresse du navigateur
            if(!history.state){
                const route = location.pathname;
                App.pushRouteToHistory(route);
                App.navigateToRoute(route);
            }
            else{
                App.navigateToRoute(history.state?.route || "");
            }
        }
    }

    static pushRouteToHistory = (route) => { //permet d'ajouter une route dans l'historique
        if(route == history.state?.route) return; //si la dernière entrée dans l'historique est la même inutile de l'ajouter
        console.log("pushRouteToHistory", route);
        history.pushState({
            route
        }, null, route);
    }

    static navigateToRoute = async (route) => { //permet d'afficher le contenu de la page demandée
        console.log("navigateToRoute", route);
        const routeItems = route.replace(/^\//, "").replace(/\/$/, "").split('/');//Je supprime les éventuels / au début et à la fin de la route et je la découpe pour obtenir un tableau
        const controllerName = routeItems?.shift() || "home"; //Je récupère la première partie de la route qui correspond au nom du controlleur
        const controllerKey = controllerName.charAt(0).toUpperCase() + controllerName.slice(1) + "Controller";
        let Controller = Controllers[controllerKey];
        if(!Controller){
            Controller = Controllers['ErrorController'];
        }
        let controllerInstance = new Controller();
        const html = await controllerInstance.index(routeItems);

        document.getElementById('root').innerHTML = '';
        document.getElementById('root').append(html);

        //initialisation de l'événement click sur les liens de la page (une fois le contenu modifié)
        for(const link of App.spaLinks){
            link.onclick = (evt) => {
                evt.preventDefault();
                console.log("link.onclick");
                const route = evt.target.pathname;
                App.pushRouteToHistory(route);
                App.navigateToRoute(route);
            }
        }
    }

}