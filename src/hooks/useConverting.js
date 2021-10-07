import axios from "axios";
import {ref, computed} from 'vue'

const useConverting = () => {
    const num = ref({
        first: 1,
        second: 1
    })

    const selected = ref({
        first: 'btc',
        second: 'usd'
    })

    const selectedCurrencies = ref({
        first: {
            num: 1,
            cur: 'btc'
        },
        second: {
            num: 1,
            cur: 'usd'
        }
    })

    // console.log(num.value, selected.value);

    // ref
    const getCource = async (currency1, currency2) => {
        
    }
    
    // computed()
}

export default useConverting