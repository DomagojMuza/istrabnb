<template>
      <div v-if="objects" style="min-height: 100vh;" class="pt-5">
            <div class="container">
                  <h1>My objects</h1>
                  <div class="row">
                        <div :key="index" v-for="(m, index) in objects"  class="my-5 col-4" >
                              <Card :object="m" />
                        </div>
                  </div>
            </div>
      </div>
</template>

<script>
import { objects } from '@/middleware/axios.js'
import Card from '@/components/cards/edit_card.vue'

export default {
      components: {Card},
      data(){
            return{
                  objects: [],
            }
      },
      async created(){
            let a = await objects();
            console.log(a);
            this.objects = a.data;
      }
}
</script>