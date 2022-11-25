<template>
    <div class="d-flex justify-content-center align-items-center pb-5" style="min-height: 100vh !important;">
    <form class="col-lg-4 col-md-7 col-10 shadow py-3 px-5 border border-0 rounded-3 bg-light mar-top" >
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
            <option value="0" selected>No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div class="col-6">
          <label class="form-label text-muted">Balcony</label>
          <select class="form-select" v-model="object.baclony" aria-label="Default select example">
            <option value="0" selected>No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div class="col-6">
          <label class="form-label text-muted">Pets allowed</label>
          <select class="form-select" v-model="object.pets" aria-label="Default select example">
            <option value="0" selected>No</option>
            <option value="1">Yes</option>
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

        <div id="emailHelp" class="form-text mb-1 mt-4">Drag marker to position location</div>
        <div class="col-12 mt-0" style="min-height: 400px;" >
          <GMapMap :center="center" :zoom="9" map-type-id="terrain" ref="map" class="h-100">
            <GMapMarker :position="center" :draggable="true" @dragend="coordinates($event.latLng)">

              </GMapMarker>
          </GMapMap>
        </div>
      </div>

      <!-- Submit button -->
      <button class="btn btn-primary mt-3" @click.prevent="submitFile">Submit</button>

    </form>
    </div>
</template>

<script>
import { images, add_object } from '@/middleware/axios.js'

  export default {
    data() {
      return {
        center: { lat: 45.1917883, lng: 13.9255512 },
        images: null,
        modalShown: false,
        object: {
          name:     null,
          price:    null,
          pool:     0,
          baclony:  0,
          pets:     0,
          location: null
        }
      }
    },
    methods: {
      coordinates(e)
      {
        this.object.location = {
          type: 'Point',
          coordinates: [e.lng(), e.lat()]
        }
      },
      uploadFile() {
      
        this.images = this.$refs.file.files;
      },
      async submitFile() {
       try {
        console.log("submit");
        console.log(this.images);
          let add_o = await add_object(this.object)
          if (add_o.data._id && this.images)
          {
            const formData = new FormData();
            for (const i of Object.keys(this.images)) {
              formData.append('images', this.images[i])
            }
            formData.append('object_id', add_o.data._id)
            await images(formData);
          }
       } catch (error) {
          console.log(error);
          alert(error.data.message)
       }
      }
    }
  }
</script>

<style scoped>

.mar-top{
  margin-top: 80px;
}

</style>