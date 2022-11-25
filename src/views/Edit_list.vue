<template>
      <div v-if="objects" style="min-height: 100vh;" class="pt-5">
            <div class="container" ref="list">
                  <h1>My objects</h1>
                  <div class="row">
                        <div :key="index" v-for="(m, index) in objects"  class="my-5 col-4" >
                              <Card :object="m" />
                        </div>
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
                  pagination: {
                        limit: 12,
                        skip: 1,
                        forUser: true,
                  },
                  maxPage: null,
                  count: null

            }
      },
      async created(){
            let response = await objects(this.pagination);
            this.count = response.data.count
            console.log(this.count);
            this.maxPage = this.count > 12 ? Math.ceil(this.count / this.pagination.limit) : null;
            this.objects = response.data.objects;
      },
      methods: {
            async find(skip)
            {
                  try {
                        this.pagination.skip = skip;
                        let response = await objects(this.pagination);
                        this.objects = response.data.objects;

                        this.$refs.list.scrollIntoView();
                      
                  } catch (error) {
                        alert('edit');
                  }
            },
      }
}
</script>