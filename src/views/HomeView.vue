<template>
  <div class="d-flex pt-5" style="height: 100vh !important;">
    <div class="col-5 px-4 list-wrapper">
      <div :key="index" v-for="(m, index) in markers"  class="my-5" >
        <!-- @click="openMarker(m.id)" -->
        <Card :object="m" />
      </div>
    </div>
    <div v-if="markers" class="col-7">
      <Map ref="mapComp" class="h-100" :markers="markers" :bounds="bounds" @fetchByBox="fetch" />
    </div>
  </div>
</template>

<script>
import Map from './list/Map.vue'
import Card from '@/components/cards/list_card.vue'
import { objects } from '@/middleware/axios.js'

export default {
  name: 'App',
  components: 
  {
    Map,
    Card
  },
  data() {
    return {
      markers: null,
      bounds: {}
    }
  },
  async mounted() 
  {

    try {
      let a = await objects();
      this.markers = a.data.map( ob => {
        return {
          position: {
            lat: ob.location.coordinates[1],
            lng: ob.location.coordinates[0],
          },
          id: ob._id,
          text: ob.name,
          images: ob.images,
          pool: ob.pool,
          beds: ob.beds,
          baclony: ob.baclony,
          pets: ob.pets,
          price: ob.price,
        }
      })
    } catch (error) {
      console.log(error);
    }
 
  },
  methods: 
  {
    openMarker(id)
    {
      this.$refs.mapComp.openMarker(id);
    },
    async fetch(box)
    {
      try {
        let a = await objects(box);
        this.markers = a.data.map( ob => {
          return {
            position: {
              lat: ob.location.coordinates[1],
              lng: ob.location.coordinates[0],
            },
            id: ob._id,
            text: ob.name,
            images: ob.images,
            pool: ob.pool,
            beds: ob.beds,
            baclony: ob.baclony,
            pets: ob.pets,
            price: ob.price,
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
  
}
</script>


<style scoped>


.list-wrapper{
  overflow: overlay;
}

.map-wrapper{
  width: 65%;
}

</style>