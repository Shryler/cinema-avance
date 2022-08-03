export class HomeControllerView {
    models = null;
    constructor(models) {
        this.models = models;
        this.importCss();
    }

    importCss = async () => {
        const cssModule = await import('./home.index.view.css', {
            assert: { type: "css" },
        });
        document.adoptedStyleSheets = [cssModule.default];
    };

    async render() {

        const { films } = this.models;
        const filmList = films.map((film) => {
            return `
            <a href="/filmDetail/${film.id}" alt=""><div class="card p-2 mb-4 d-flex flex-sm-row flex-wrap align-items-center container">
            <img src="${film.affiche}" class="card-img-top p-2 border w-50" alt="${film.title}">
            <div class="card-body text-center w-50">
                <h5 class="card-title">${film.title}</h5>
                <p class="card-text">${film.synopsis}</p>
            </div>
            </div>
        </div></a>
            `;
        }).join('');

        const viewHtml = `
        ${filmList}
        `;

        const viewElement = document.createElement("div");
        viewElement.innerHTML = viewHtml;

        return viewElement;
    };
}
