import Vue from 'vue'

const state = Vue.observable({
    anime: [],
    isLoaded: false
})

export const actions = {
    async getAnime(){
       mutations.setIsLoaded(false);
        try{
            let data = await fetch('https://api.jikan.moe/v3/top/anime')
            mutations.setAnime(await data.json())
            mutations.setIsLoaded(true)
        }catch (err){
           console.log(err)
        }
    }
}

export const mutations = {
    setAnime: payload => state.anime = payload.top,
    setIsLoaded: payload => state.isLoaded = payload
}

export const getters = {
    anime: () => state.anime,
    isLoaded: () => state.isLoaded
}