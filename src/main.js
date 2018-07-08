import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-http-hiep.firebaseio.com/';
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if(request.method == 'POST') {
    request.method = 'PUT'
  }
  next(response => {
    response.json = () => {
      return {
        messages: response.body
      }
    }
  });
})

Vue.component('app-servers' , Home)
export const eventBus = new Vue({
  methods: {
    changeAge(age) {
      this.$emit('ageWasEdited', age);
    }
  }
});



new Vue({
  el: '#app',
  render: h => h(App)
})
