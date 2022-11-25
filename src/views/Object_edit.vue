<template>
     <div class="container pt-5" style="min-height: 100vh !important;">
      <div v-if="object" class="row justify-content-between pb-5 gx-3 gy-3" >
      <form class="col-lg-5 shadow py-3 px-5 border border-0 rounded-3 bg-light mar-top" >
            <div class="row g-3" >

            <div class="col-12">
            <label class="form-label text-muted">Object name</label>
            <input v-model="object.name" type="text" class="form-control" placeholder="Input name here">
            </div>
            <div class="col-6">
            <label class="form-label text-muted">Price per night</label>
            <div class="input-group mb-3">
                  <span class="input-group-text">€</span>
                  <input type="number" v-model="object.price" class="form-control" placeholder="0">
            </div>
            </div>

            <div class="col-6">
            <label class="form-label text-muted">Pool</label>
            <select class="form-select" v-model="object.pool" aria-label="Default select example">
                  <option value="false" selected>No</option>
                  <option value="true">Yes</option>
            </select>
            </div>

            <div class="col-6">
            <label class="form-label text-muted">Balcony</label>
            <select class="form-select" v-model="object.baclony" aria-label="Default select example">
                  <option value="false" selected>No</option>
                  <option value="true">Yes</option>
            </select>
            </div>
            <div class="col-6">
            <label class="form-label text-muted">Pets allowed</label>
            <select class="form-select" v-model="object.pets" aria-label="Default select example">
                  <option value="false" selected>No</option>
                  <option value="true">Yes</option>
            </select>
            </div>
            <div class="col-6">
            <label class="form-label text-muted">How many beds</label>
            <input type="number" v-model="object.beds" class="form-control" placeholder="0">
            </div>
            <div class="col-6">
            <label class="form-label text-muted">Images</label>
            <input type="file" @change="uploadFile" ref="file" multiple>
            </div>

            <div class="col-12" style="height: 400px;" >
            <GMapMap :center="newLocation" :zoom="13" map-type-id="terrain" ref="map" class="h-100">
                  <GMapMarker :position="newLocation" :draggable="true" @dragend="coordinates($event.latLng)">

                  </GMapMarker>
            </GMapMap>
            </div>
            </div>


            <!-- Submit button -->
            <button class="btn btn-primary mt-2" @click.prevent="submitFile">Submit</button>

      </form>

      <div class="col-lg-6 py-3 px-5 border border-0 shadow rounded-3 bg-light mar-top">
           <div class="row gy-4">
            <div class="col-6" :key="index" v-for="(image, index) in images">
                  <div class="img" :style="{ 'background-image': 'url(' + image.url + ')' }">
                        <div class="position-absolute start-0 end-0 top-0 bottom-0">
                              <div class="d-flex h-100 flex-column justify-content-center align-items-center">
                                    <div class="d-flex m-0 p-0 justify-content-center img-info-wrapper" >
                                          <button class="btn btn-danger px-2 py-1" @click="deleteImage(image.id)">
                                                Delete
                                          </button>
                                    </div>
                              </div>
                       </div>
                  </div>
           </div>
           </div>
      </div>
    </div>

    <div class="row">
      <div class="col-8">
            <div class="row">
                  <div class="col-12"><div class="h5 mt-4">Add pricelist item</div></div>
                  <div class="col-3"><input class="form-control" v-model="newPricelist.dateFrom" type="date" name="dateFrom" placeholder="Date from"></div>
                  <div class="col-3"><input class="form-control" v-model="newPricelist.dateTo" type="date" name="dateTo" placeholder="Date to"></div>
                  <div class="col-3"><input v-model="newPricelist.price" type="number" class="form-control" placeholder="0"></div>
                  <div class="col-3 btn btn-primary" @click="addPricelist()">Save</div>
            </div>
            <div class="mt-4 h5">List of pricelist items</div>
            <div v-if="object.pricelist">
                  <div :key="index"  v-for="(item, index) in object.pricelist"  class="mb-5 mt-3" >
                        <pricelist-item :item="item" />
                  </div>
            </div>
      </div>
    </div>
     </div>
</template>


<script>
import {objectDetails, removeImage, update_object, images, addPricelist} from '@/middleware/axios.js';
import pricelistItem from '../components/edit/pricelistItem.vue';

export default {
  components: { pricelistItem },
      data() {
            return {
                  object: null,
                  images: [],
                  updateImages: [],
                  center: {},
                  newLocation: {},
                  newPricelist: {
                        dateFrom: null,
                        dateTo: null,
                        price: null,
                  }
            }
      },
      async created() {
            console.log("test");
            let response = await objectDetails(this.$route.params._id);
            this.object = response.data;
            this.newLocation = {
                  lat: this.object.location.coordinates[1],
                  lng: this.object.location.coordinates[0],
            }
            this.object.images.forEach( img => {
                  let url = { 
                        url: 'http://localhost:4000/api/uploads/' + img.filename,
                        id: img._id      
                  };
                  this.images.push(url);
            })
      },
      methods: {
            coordinates(e)
            {
                  this.object.location = {
                        type: 'Point',
                        coordinates: [e.lng(), e.lat()]
                  }
                  this.newLocation = {
                        lat: e.lat(),
                        lng: e.lng()
                  }
            },
            async deleteImage(id) {
                  try {
                        let res = await removeImage(id);
                        this.images = this.images.filter( image => image.id != id )
                  } catch (error) {
                        
                  }
            },
            uploadFile() {
                  this.updateImages = this.$refs.file.files;
            },
            async submitFile() {
                  try {
                        let add_o = await update_object(this.object)

                        if (add_o.data._id && this.updateImages.length)
                        {
                              const formData = new FormData();
                              for (const i of Object.keys(this.updateImages)) {
                              formData.append('images', this.updateImages[i])
                              }
                              formData.append('object_id', add_o.data._id)
                              let a = await images(formData);
                        }
                  } catch (error) 
                  {
                        alert(error.data.message)
                  }
            },
            async addPricelist() {
                  let npl = this.newPricelist;
                  npl.object_id = this.object._id;
                  try {
                        let res = await addPricelist(npl);
                        console.log(res);
                  } catch (e) {
                        console.log(e);
                  }

            }
      }
}
</script>

<style lang="css" scoped>
.img{
      background-size: cover;
      background-position: center;
      min-height: 100px;
      max-height: 140px;
}

.img-info-wrapper{
      opacity: 0;
      transition: all 0.3s;
}
.img:hover .img-info-wrapper{
      opacity: 1;
      transition: all 0.3s;   
}
</style>