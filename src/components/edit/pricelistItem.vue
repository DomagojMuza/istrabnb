<template>
      <div>
          <div class="row">
                  <div class="col-3"><input class="form-control" v-model="item.dateFrom" type="date" name="dateFrom" placeholder="Date from"></div>
                  <div class="col-3"><input class="form-control" v-model="item.dateTo" type="date" name="dateTo" placeholder="Date to"></div>
                  <div class="col-2"><input v-model="item.price" type="number" class="form-control" placeholder="0"></div>
                  <div class="col-2 " @click="update()">
                        <button class="btn btn-primary">
                              Update
                        </button>
                  </div>
                  <div class="col-2" @click="remove()">
                        <button class="btn btn-danger">
                              Remove
                        </button>
                  </div>
            </div>  
      </div>
</template>

<script>
import { updatePricelistItem, removePricelistItem } from '@/middleware/axios.js'

    export default {
      props: ['item'],
      data() {
            return {
                 
            }
      },
      created() {
            this.item.dateFrom = new Date(this.item.dateFrom).toISOString().substring(0, 10);
            this.item.dateTo = new Date(this.item.dateTo).toISOString().substring(0, 10);
            // console.log(this.item);
      },
      methods: {
            async update() {
                  try {
                        let res = await updatePricelistItem(this.item);
                        console.log(res);  
                  } catch (error) {
                        console.log(error);
                        alert(error.data);
                  } 
            },
            async remove()
            {
                  try {
                        let res = await removePricelistItem(this.item._id);
                        console.log(res);
                  } catch (error) {
                        console.log(error);
                        alert(error);
                  }
            }
      },
    }
</script>