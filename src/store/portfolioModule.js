import axios from "axios";

export const portfolioModule = {
    state: () => ({
        crypto: [
            ""
        ],
        cryptoWallet: [],
        transactionHistory: [
            {
                id: 0,
                action: 'add',
                coin: 'bitcoin',
                number: 2,
            }
        ],
        exchangeRates: {},
        loading: false
    }),

    mutations: {
        setTransactionHistory(state, purchases) { // purchases - покупки
            state.transactionHistory = purchases
        },
        setCryptoWallet(state, wallet) {
            state.cryptoWallet = wallet
        },
        setExchangeRates(state, exchangeRates) { // exchangeRates - курсы валют
            state.exchangeRates = exchangeRates
        },
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    getters: {
        getTransactionHistory(state) {
            return [...state.transactionHistory.map(i => (
                {
                    ...i,
                    price: state.exchangeRates[i.coin],
                    total: state.exchangeRates[i.coin] * i.number,
                    delete: i.id
                }
            ))
            ]
        },
        getPurceTotalValue(state, getters) {
            return getters.getTransactionHistory.reduce((sum, current) => {

                return +(sum + (current.action === 'add' ? current.total : -current.total)).toFixed(2)
            }, 0);
        },
        getCryptoWallet(state, getters) {
            const cryptoWallet = getters.getTransactionHistory.reduce((wallet, current) => {
                const k = (current.action === 'add' ? 1 : -1)
                wallet[current.coin] = {
                    total: +(((wallet[current.coin] && wallet[current.coin].total) || 0) + current.total * k).toFixed(2),
                    number: ((wallet[current.coin] && wallet[current.coin].number) || 0) + current.number * k
                }
                return wallet
            }, {})
            state.cryptoWallet = cryptoWallet
            return cryptoWallet
        }
    },
    actions: {
        fetchExchangeRates({ state, commit }, currencies) {
            currencies.length && currencies.map(async currency => {
                try {
                    commit('setLoading', true);
                    if (currency.symbol !== 'usd') {
                        const { data } = await axios.get(
                            `https://api.coingecko.com/api/v3/simple/price?ids=${currency.id}&vs_currencies=usd`
                        );
                        commit('setExchangeRates', { ...state.exchangeRates, [currency.id]: data[currency.id]['usd'] });
                    }
                } catch (error) {
                    console.log(error);
                }
                finally {
                    commit('setLoading', false);
                }
            })

        }
    },
    namespaced: true
}