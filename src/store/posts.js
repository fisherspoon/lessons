export default {
    namespaced: true,
    state: () => ({
        postsData: [],
        singlePostData: {},
        author: {},
        allPostsByAuthor: []
    }),
    mutations:{
      setPostData(state, payload){
          state.postsData = payload
      },
      setSinglePost(state, payload){
          state.singlePostData = payload
      },
      setAuthorData(state, payload){
          state.author = payload
      },
      setAllPostsByAuthor(state, payload){
          state.allPostsByAuthor = payload
      }
    },
    actions:{
        getAllPosts({ commit }){
            async function fetchPostsJSON() {
                const response = await fetch(process.env.VUE_APP_URL_POSTS);
                const posts = await response.json();
                return posts;
            }
            fetchPostsJSON().then(posts => {
                commit('setPostData', posts)
            });
        },
        getPostByAuthor({ commit, state }, idPost){
            async function fetchPostsJSON() {
                const response = await fetch(process.env.VUE_APP_URL_POSTS);
                const posts = await response.json();
                return posts;
            }
            fetchPostsJSON().then(posts => {
                commit('setSinglePost', posts.find(item => item.id == idPost))
            }).then(() => {
                    fetch(`${process.env.VUE_APP_URL_AUTHOR}${state.singlePostData.userId}`)
                        .then(response => response.json())
                        .then((response) => {
                            commit('setAuthorData', response)
                        })
                }
            )
        },
        getAllPostsByAuthor({ commit, state }, idAuthor){
            fetch(`${process.env.VUE_APP_URL_AUTHOR}${idAuthor}`)
                .then(response => response.json())
                .then((response) => {
                    commit('setAuthorData', response)
                })
                .then(() => {
                    fetch(`${process.env.VUE_APP_URL_POSTS}?userId=${idAuthor}`)
                        .then(response => response.json())
                        .then((response) => {
                            commit('setAllPostsByAuthor', response)
                        })
                })
        }
    }
}