interface IMovie {
    title: string;
    releaseYear: number;
    rating: number;
    awards: string[];
}

interface ICategory {
    name: string;
    movies: IMovie[];
    addMovie: (movie: IMovie) => void;
}

interface IList {
    name?: string;
    data: IMovie[];
    addMovie: (movie: IMovie) => void;
    applyFiltersValue: (newFilters: IFilter[]) => IMovie[];
    applySearchValue: (searchTerm: string) => IMovie[];
}

class Movie implements IMovie {
    constructor(
        public title: string,
        public releaseYear: number,
        public rating: number,
        public awards: string[] = []
    ) {}
}

class Category implements ICategory {
    movies: IMovie[] = [];

    constructor(public name: string) {}

    addMovie(movie: IMovie): void {
        this.movies.push(movie);
    }
}

enum GridFilterTypeEnum {
    Match,
    Range,
    Values,
}

interface MatchFilter {
    type: GridFilterTypeEnum.Match;
    filter: string;
}

interface RangeFilter {
    type: GridFilterTypeEnum.Range;
    filter: number;
    filterTo: number;
}

interface ValuesFilter {
    type: GridFilterTypeEnum.Values;
    values: string[];
}

type IFilter = MatchFilter | RangeFilter | ValuesFilter;

class FilterManager {
    static applyFilters(data: IMovie[], filters: IFilter[]): IMovie[] {
        return filters.reduce((filteredMovies, filter) => {
            switch (filter.type) {
                case GridFilterTypeEnum.Match:
                    return filteredMovies.filter(movie =>
                        movie.title.toLowerCase().includes(filter.filter.toLowerCase())
                    );
                case GridFilterTypeEnum.Range:
                    return filteredMovies.filter(movie =>
                        movie.releaseYear >= filter.filter && movie.releaseYear <= filter.filterTo
                    );
                case GridFilterTypeEnum.Values:
                    return filteredMovies.filter(movie =>
                        filter.values.some(value => movie.awards.includes(value))
                    );
                default:
                    return filteredMovies;
            }
        }, data);
    }
}

class MovieList implements IList {
    data: IMovie[] = [];
    private filters: IFilter[] = [];

    addMovie(movie: IMovie): void {
        this.data.push(movie);
    }

    applyFiltersValue(newFilters: IFilter[]): IMovie[] {
        this.filters = newFilters;
        return FilterManager.applyFilters(this.data, this.filters);
    }

    applySearchValue(searchTerm: string): IMovie[] {
        if (searchTerm) {
            this.filters = [];
        }
        return this.data.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
}

class CategoryList implements IList {
    data: IMovie[] = [];
    private filters: IFilter[] = [];

    constructor(public name: string) {}

    addMovie(movie: IMovie): void {
        this.data.push(movie);
    }

    applyFiltersValue(newFilters: IFilter[]): IMovie[] {
        this.filters = newFilters;
        return FilterManager.applyFilters(this.data, this.filters);
    }

    applySearchValue(searchTerm: string): IMovie[] {
        if (searchTerm) {
            this.filters = [];
        }
        return this.data.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
}

const actionCategory = new Category("Action");
const dramaCategory = new Category("Drama");

const movie1 = new Movie("Фільм 1", 2020, 8.5, ["Оскар"]);
const movie2 = new Movie("Фільм 2", 2018, 7.2, ["Золотий глобус", "Оскар"]);
const movie3 = new Movie("Фільм 3", 2024, 7.2, ["Оскар"]);
const movie4 = new Movie("Фільм 4", 1995, 6.2, ["Золотий глобус"]);
const movie5 = new Movie("Фільм 5", 1999, 9.0, ["Оскар"]);
const movie6 = new Movie("Фільм 6", 2017, 7.2, ["Золотий глобус"]);

actionCategory.addMovie(movie1);
actionCategory.addMovie(movie2);
actionCategory.addMovie(movie3);
actionCategory.addMovie(movie5);
actionCategory.addMovie(movie6);
dramaCategory.addMovie(movie2);
dramaCategory.addMovie(movie3);
dramaCategory.addMovie(movie5);
dramaCategory.addMovie(movie6);

const actionList = new MovieList();

actionList.addMovie(movie1);
actionList.addMovie(movie2);
actionList.addMovie(movie3);
actionList.addMovie(movie5);
actionList.addMovie(movie6);

const categoryList = new CategoryList("Всі фільми");
categoryList.addMovie(movie1);
categoryList.addMovie(movie2);
categoryList.addMovie(movie4);
categoryList.addMovie(movie5);
categoryList.addMovie(movie6);

const filteredActionMovies = actionList.applyFiltersValue([
    { type: GridFilterTypeEnum.Match, filter: "Фільм" },
    { type: GridFilterTypeEnum.Range, filter: 2019, filterTo: 2024 },
    { type: GridFilterTypeEnum.Values, values: ["Оскар"] }
]);
console.log(filteredActionMovies);

const searchedMovies = categoryList.applySearchValue("Фільм 1");
console.log(searchedMovies);
