import { createStore } from 'vuex'
import { converterModule } from "@/store/converterModule";
import { portfolioModule } from "@/store/portfolioModule";

export default createStore({
  modules: {
    converter: converterModule,
    portfolio: portfolioModule
  }
})
