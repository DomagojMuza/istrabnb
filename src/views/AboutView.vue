<template>
  <div>
    <div class="pt-5">
      <div class="d-flex justify-content-center">
        <button class="btn" @click="component = 'List'">List</button>
        <button class="btn" @click="component = 'Details'">Add</button>
      </div>
    </div>
    <div v-if="loaded" class="container">
      <component :is="component" v-bind="test" />
    </div>
    
  </div>
</template>

<script>
import List from '@/components/admin_page/List.vue'
import Details from '@/components/admin_page/Details.vue'
// import { objects } from '@/store.js'
import { objects } from '@/middleware/axios.js'

export default {
  components: { List, Details },
  data() {
    return {
      component: "List",
      objects: [],
      loaded: false
      // objects
    }
  },
  async beforeCreate(){
    let res = await objects()
    this.objects = res.data
    this.loaded = true;
  },
  computed: {
    test: function () {
      if(this.component == "List")
      {
        return {objects: this.objects}
      }
      else if (this.component == 'Details')
      {
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>