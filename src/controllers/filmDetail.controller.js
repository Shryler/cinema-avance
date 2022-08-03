import { DataManager } from '../helpers/dataManager.helper';

export class FilmDetailController {

    index = async (params) => {
        const id = params[0];
        const film = DataManager.getOne("film", id);
        const seances = film?.getSeanceList();
        if(!id || !film){ 
            location.href = '/error';
        }
        const {FilmDetailIndexView} = await import('../views/filmDetail/filmDetail.index.view.js');
        const view = new FilmDetailIndexView({film, seances});
        return view.render();
    }
}