<template>
      <div class="details-wrapper" v-if="object">
            <div class="d-flex pt-5 position-relative">
                  <div v-if="images.length > 0" :id="id" class="carousel slide" data-bs-interval="false" data-bs-ride="carousel">
                        <div class="carousel-inner">
                              <div :key="index" v-for="(img, index) in images" :class="{ 'active carousel-item' : index == 0, 'carousel-item': index} ">
                                    <img :src="img" class="d-block w-100 cover" alt="...">
                              </div>
                        </div>
                        <button class="carousel-control-prev" type="button" :data-bs-target="data_bs" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" :data-bs-target="data_bs" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                        </button>
                  </div>
                  <div class="position-absolute top-0 start-0 end-0 h-100">
                        <div class="d-flex align-items-end h-100">
                              <div class="container bg-white overview">
                                    <div class="d-flex justify-content-between mt-2">
                                          <h1 class="fw-bold my-2 mx-5 my-3">{{ object.name }}</h1>
                                          <div class="d-flex align-items-end">
             
                                                <div class="h2 lead mx-3 my-3">Price starting from </div>
                                                <div class=" h1 me-5 mt-3 mb-2">{{ object.price }} €</div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
            <div class="container info p-5 rounded" style="min-height: 400px;">
                  <div>
                        <div class="row py-4 py-lg-0 ">
                        <div class="col-12 col-lg">
                              <div class="row text-light">
                                    <div class="col-lg col-6 d-flex flex-column align-items-center mb-5 mb-lg-0">
                                          <i class="fa-solid fa-bed fa-lg text-black rounded-circle border border-black p-3 mb-3"></i>
                                          <p class="mb-0 lead text-black">{{ object.beds }} Beds</p>
                                    </div>
                                          
                                    <div class="col-lg col-6 d-flex flex-column align-items-center mb-5 mb-lg-0">
                                          <i class="fa-solid fa-lg fa-water text-black rounded-circle border border-black p-3 mb-3"></i>
                                          <p class="mb-0 lead text-black">{{ object.baclony ? 'Near sea' : 'Not near sea' }}</p>
                                    </div>

            
                                    <div class="col-lg col-6 d-flex flex-column align-items-center">
                                          <i class="fa-solid fa-lg fa-paw text-black rounded-circle border border-black p-3 mb-3"></i>
                                          <p class="mb-0 lead text-black">
                                                {{ object.pets ? 'Pets allowed' : 'Pets Not allowed' }}
                                          </p>
                                    </div>
                              </div>
                        </div>
                        </div>
                  </div>
                  <GMapMap v-if="center" :center="center" :zoom="16" map-type-id="terrain" ref="map" style="height: 500px;"
                        class="mt-4">
                        <GMapMarker :position="center">
                        </GMapMarker>
                  </GMapMap>

                  <div class="d-flex justify-content-end mt-5">
                        <a href="tel:+496170961709" style="text-decoration: none;">
                              <button class="btn btn-primary px-4 py-3 rounded">Get an Offer</button>
                        </a>
                  </div>
            </div>
      </div>
</template>

<script>
import {objectDetails} from '@/middleware/axios.js';

export default {

      data() {
            return {
                  images: [],
                  center: {},
                  object: null,
                  id: 'detailsSlider',
                  data_bs: '#detailsSlider'

            }
      },
      async mounted() {

            let response = await objectDetails(this.$route.params._id);
            this.object = response.data;
            console.log(this.object);
            this.center = {
                  lat: this.object.location.coordinates[1],
                  lng: this.object.location.coordinates[0],
            }
            this.object.images.forEach( img => {
                  let url = 'http://localhost:4000/api/uploads/' + img.filename;
                        this.images.push(url);
            })

      }
    }
</script>

<style lang="css" scoped>
      .cover{
            height: 95vh;
            object-fit: cover;
            width: 100%;
      }
      #detailsSlider{
            width: 100%;
      }

      .overview{
            border-radius: 12px 12px 0 0;
            border-color: #00000080;
            border-style: solid;
            border-width: 1px 1px 0 1px;
      }

      .info{
            border-color: #00000080;
            border-style: solid;
            border-width: 0 1px 1px 1px;  
            background-color: white;
      }

      .details-wrapper{
            background-color: whitesmoke;
      }
</style>