const { createApp } = Vue;

createApp({
    data() {
        return {
            drinks: [],
            textoPesquisa: '',
            carregando: false,
        };
    },
    computed: {
        drinksFiltrados() {
            return this.drinks.filter(drink =>
                drink.strDrink.toLowerCase().includes(this.textoPesquisa.toLowerCase())
            );
        },
    },
    methods: {
        async buscarDrinks() {
            this.carregando = true;
            try {
                const resposta = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
                const dados = await resposta.json();
                this.drinks = dados.drinks;
                this.carregando = false;
            } catch (erro) {
                console.error('Erro ao buscar drinks:', erro);
                this.carregando = false;
            }
        },
    },
}).mount('#app');