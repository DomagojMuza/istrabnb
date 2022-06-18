<template>
     <div class="container pt-5" style="min-height: 100vh !important;">
      <div v-if="object" class="row justify-content-between pb-5 gx-3" >
      <form class="col-lg-5 col-md-7 col-10 shadow py-3 px-5 border border-0 rounded-3 bg-light mar-top" >
      <!-- <div>
            <input type="file" @change="uploadFile" ref="file" multiple>
            
            </div> -->

            <!-- <div class="form-outline mb-4">
            <input type="text" class="form-control" v-model="object.name" />
            <label class="form-label" for="loginName">Apartment name</label>
            </div> -->

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
            <GMapMap :center="object.location" :zoom="13" map-type-id="terrain" ref="map" class="h-100">
                  <GMapMarker :position="object.location" :draggable="true" @dragend="coordinates($event.latLng)">

                  </GMapMarker>
            </GMapMap>
            </div>
            </div>


            <!-- Submit button -->
            <button @click.prevent="submitFile">Submit</button>

      </form>

      <div class="col-6 py-3 px-5 border border-0 shadow rounded-3 bg-light mar-top">
           <div class="row gy-4">
            <div class="col-6" :key="index" v-for="(image, index) in images">
                  <div class="img" :style="{ 'background-image': `url(${image.url})` }">
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
     </div>
</template>


<script>
import {objectDetails, removeImage, update_object, images} from '@/middleware/axios.js';

export default {
      data() {
            return {
                  object: null,
                  images: [],
                  updateImages: [],
                  center: {},
                  newLocation: {}
            }
      },
      async created() {
            console.log("test");
            let response = await objectDetails(this.$route.params._id);
            this.object = response.data;
            console.log(this.object);
            this.object.location = {
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
                  this.newLocation = {
                        type: 'Point',
                        coordinates: [e.lng(), e.lat()]
                  }
                  this.object.location = {
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
                        let obj = Object.assign({}, this.object)
                        if (this.newLocation) obj.location = this.newLocation
                        let add_o = await update_object(obj)

                        if (add_o.data._id && this.updateImages.length)
                        {
                              const formData = new FormData();
                              for (const i of Object.keys(this.updateImages)) {
                              formData.append('images', this.updateImages[i])
                              }
                              formData.append('object_id', add_o.data._id)
                              let a = await images(formData);
                        }
                  } catch (error) {
                        console.log(error);
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