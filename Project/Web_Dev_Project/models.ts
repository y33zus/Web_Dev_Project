export interface Movie{
    id: number,
    name: string,
    year_of_publishing: number,
    director: string,
    genre: string,
    photo: string
}

export interface Recommendation{
    Title: string,
    Year: string,
    Runtime: string,
    Poster: string
}

export interface Watch_list{
    user_id: number,
    movie_id: number
}

export interface Watched_list{
    Title: string,
    Year: string,
    Runtime: string,
    Poster: string
}

export interface Personal_top{
    Title: string,
    Year: string,
    Runtime: string,
    Poster: string
}

export interface Token { 
    access: string; 
    refresh: string; 
}