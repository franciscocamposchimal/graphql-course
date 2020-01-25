import Vue from 'vue';
import { SESSION_QUERY } from "@/graphql/queries";

const userSession = (component) => {
    return Vue.component('userSession',{
        render(createElement){
            return createElement(component, {
                props:{
                    user: this.user
                }
            });
        },
        data(){
            return {
                user: {
                    id: "no id...",
                    username: "no username..."
                }
            }
        },
        apollo: {
            session: {
                query: SESSION_QUERY,
                pollInterval: 1000,
                result() {
                    console.log("Still alive!!..");
                },
                error() {
                    this.$router.push('login');
                },
            },
        },
        mounted(){
            this.$apollo.query({
                query: SESSION_QUERY,
            }).then( resp => {
                this.user.id = resp.data.getCurrentUser.id;
                this.user.username = resp.data.getCurrentUser.username;
            }).catch( () => {
                this.$router.push('login');
            }); 
        }
    });
}

export default userSession;