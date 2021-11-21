export const withDataProcessingBtn = btn => ({
    name: 'BtnDataProcessing',
    props:{
        inputName:{
            type: String,
            default: ''
        },
        inputSurname:{
            type: String,
            default: ''
        },
        customType:{
            type: String,
            default: 'button'
        },
        name:{
            type: String,
            default: 'Button name'
        },
        customClassBtn:{
            type: String,
            default: 'btn-default'
        }
    },
    render(h) {
        const vm = this
        return h(
            btn,
            {
                props: {
                    ...vm.$props
                },
                nativeOn: {
                    click: () => {
                        console.log(this.inputName);
                        console.log(this.inputSurname);
                        localStorage.setItem("Имя", this.inputName);
                        localStorage.setItem("Фамилия", this.inputSurname);
                    }
                }
            },
        )
    }

})