export default {
    namespaced: true,
    state: () => ({
        counter: 0
    }),
    mutations:{
        incrementCount(state) {
            state.counter++;
        },
        decreaseCount(state) {
            if(state.counter > 0){
                state.counter--;
            }
        },
    }
}