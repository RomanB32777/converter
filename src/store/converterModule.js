// import axios from "axios";

export const converterModule = {
    state: () => ({
        currencies: [
            {
                id: "bitcoin",
                symbol: "btc",
                name: "Bitcoin",
            },
            {
                id: "ethereum",
                symbol: "eth",
                name: "Ethereum",
            },
            {
                id: "uniswap-state-dollar",
                symbol: "usd",
                name: "US Dollar",
            },
        ],
        currencyFromBlock:
        {
            select: {
                value: "btc",
                id: "bitcoin",
            },
            number: 1
        },
        currencyToBlock:
        {
            select: {
                value: "usd",
                id: "uniswap-state-dollar",
            },
            number: 1,
        },
        loading: false,
    }),

    mutations: {
        setCurrencyFromBlock(state, currency) {
            state.currencyFromBlock = currency
        },
        setCurrencyToBlock(state, currency) {
            state.currencyToBlock = currency
        },
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    getters: {
        currenciesOptions(state) {
            return [
                ...state.currencies.map((currency) => ({
                    name: currency.name,
                    value: currency.symbol,
                    id: currency.id,
                })),
            ];
        },
        cryptoCurrenciesOptions(state) {
            return [
                ...state.currencies.filter(currency => currency.symbol !== 'usd').map((currency) =>
                ({
                    name: currency.name,
                    value: currency.symbol,
                    id: currency.id
                })
                ),
            ];
        },
    },
    actions: {
    },
    namespaced: true
}