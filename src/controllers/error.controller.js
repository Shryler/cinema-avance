


export class ErrorController {

    index = async () => {
        const {ErrorIndexView} = await import('../views/error/error.index.view');
        const view = new ErrorIndexView();
        return view.render();
    }

}