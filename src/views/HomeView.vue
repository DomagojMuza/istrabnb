<template>
  <div class="d-flex pt-5" style="height: 100vh !important;">
    <div class="col-lg-5 col-12 px-4 list-wrapper" ref="list2">
      <div class="h3 mt-3 text-primary">Found {{ count }} objects</div>
      <div :key="index" v-for="(m, index) in markers"  class="mb-5 mt-3" >
        <!-- @click="openMarker(m.id)" -->
        <Card :object="m" />
      </div>
      <nav v-if="maxPage" class="d-flex justify-content-center" aria-label="Page navigation example">
        <ul class="pagination">
          <li v-if="pagination.skip -1 > 1" class="page-item" @click="find(1)"><div class="page-link" >1</div></li>
          <li v-if="pagination.skip -1 > 0" class="page-item" @click="find(pagination.skip - 1)"><div class="page-link" >{{ pagination.skip -1 }}</div></li>
          <li class="page-item active"><div class="page-link" >{{ pagination.skip }}</div></li>
          <li v-if="maxPage >= pagination.skip + 1" class="page-item" @click="find(pagination.skip + 1)"><div class="page-link" >{{ pagination.skip + 1  }}</div></li>
          <li v-if="maxPage >= pagination.skip + 2" class="page-item" @click="find(maxPage)"><div class="page-link" >{{ maxPage }}</div></li>
        </ul>
      </nav>
    </div>
    <div v-if="markers" class="col-7 d-lg-block d-none">
      <Map ref="mapComp" class="h-100" :markers="markers" :bounds="bounds" @fetchByBox="mapDraggedFetch" />
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
      bounds: {},
      page: null,
      maxPage: null,
      perPage: 10,
      count: null,
      pagination: {
        limit: 10,
        skip: 1,
      },
      default: {
        limit: 10,
        skip: 1
      },
      box: null,
    }
  },
  async mounted() 
  {

    try {
      console.log('in');
      let res = await objects();
      console.log(res);
      this.setData(res);
    } catch (error) {
      alert('mounted');
    }
  },
  methods: 
  {
    openMarker(id)
    {
      this.$refs.mapComp.openMarker(id);
    },
    async mapDraggedFetch(box)
    {
      try {
        this.box = box;
        this.pagination = Object.assign({}, this.default);
        let res = await objects(box);
        this.setData(res);
      } catch (error) {
        alert('map drag');
      }
    },
    async find(skip)
    {
      try {
        this.pagination.skip = skip;
        let search = Object.assign({}, this.pagination, this.box);
        let res = await objects(search);
        this.setData(res);
        var element = this.$refs.list2;
        var top = element.offsetTop;
        element.scrollTo(0, top);

      } catch (error) {
        alert('find');
      }
    },
    setData(res)
    {
      this.count = res.data.count
      this.maxPage = this.count > 10 ? Math.ceil(this.count / this.perPage) : null;
      this.markers = []
      this.markers = res.data.objects.map( ob => {
        let smallestPrice = ob.pricelist.reduce( function(prev, curr) {
                return prev.price < curr.price ? prev : curr;
          }, 0);
          // console.log(price);
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
          price: smallestPrice.price,
        }
      })
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