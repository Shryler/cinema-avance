import { DataManager } from '../helpers/dataManager.helper';

export class HomeController {

    index = async (params) => {
        const films = DataManager.getAll("film");

        const {HomeControllerView} = await import('../views/home/home.index.view.js');
        const view = new HomeControllerView({ films });
        return view.render();
    }

}