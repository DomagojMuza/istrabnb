<template>
      <router-link class="link" :to="{ name: 'object-details', params: {_id: object.id} }" style="text-decoration: none;">
            <div class="row object-card shadow gx-0">
                  <div class="col-6" style="padding: 0;" >
                        <div v-if="images.length > 0" :id="id" class="carousel slide" data-bs-interval="false" data-bs-ride="carousel">
                              <div class="carousel-inner">
                                    <div :key="index" v-for="(img, index) in images" :class="{ 'active carousel-item' : index == 0, 'carousel-item': index} ">
                                          <img :src="img" class="d-block w-100" alt="...">
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
                        
                  </div>
                  <div class="col-6 p-3 d-flex flex-column justify-content-between">
                        <div class="row">
                              <div class="col">
                                    <h3 class="h4">{{ object.text }}</h3>
                              </div>
                        </div>
                  <div class="row g-3">

                  <div class="col-auto me-3">
                        <div class="row g-0">
                              <div class="col-auto">
                              <i class="fa-solid fa-lg fa-water-ladder"></i>
                              </div>
                              <div class="col d-flex align-items-center">
                              <div class="ms-2 text-muted">{{ object.pool ? 'Pool' : 'No pool' }}</div>
                              </div>
                        </div>
                  </div>

                  <div class="col-auto">
                        <div class="row g-0">
                              <div class="col-auto">
                              <i class="fa-solid fa-lg fa-paw"></i>
                              </div>
                              <div class="col d-flex align-items-center">
                              <div class="ms-2 text-muted">{{ object.pets ? 'Pets allowed' : 'Pets Not allowed' }}</div>
                              </div>
                        </div>
                  </div>

                                          <div class="col-auto">
                              <div class="row g-0">
                              <div class="col-auto">
                                    <i class="fa-solid fa-lg fa-water"></i>
                              </div>
                              <div class="col d-flex align-items-center">
                                    <div class="ms-2 text-muted">{{ object.baclony ? 'Near sea' : 'Not near sea' }}</div>
                              </div>
                              </div>
                        </div>

                  
                        <div class="col-auto">
                              <div class="row g-0">
                              <div class="col-auto">
                                    <i class="fa-solid fa-lg fa-bed"></i>
                              </div>
                              <div class="col d-flex align-items-center">
                                    <div class="ms-2 text-muted">
                                          {{ object.beds }} Beds
                                    </div>
                              </div>
                              </div>
                        </div>
                  
                  </div>
                        <div class="text-end">
                              <div class="ms-2">Price per week</div>
                        <div class="d-flex justify-content-end align-items-end">
                              <div class="h2 text-warning fw-bolder mb-0">{{ object.price }} €</div>
                  </div>
                        </div>
                  </div>
            </div>
      </router-link>
</template>

<script>
    export default {
      props: ['object'],
      data() {
            return {
                  images: [],
                  id: 'carouselExampleControls',
                  data_bs: '#carouselExampleControls'
            }
      },
      created() {
            if(this.object.images)
            {
                  let rand = Math.floor(Math.random() * 10000000) + 1;
                  this.id += rand;
                  this.data_bs += rand;
                  this.object.images.forEach(img => {
                        let url = 'http://localhost:4000/api/uploads/' + img.filename;
                        this.images.push(url);   
            }     );
            }
      },
    }
</script>

<style  scoped>

img{
      height: 250px;
      object-fit: cover; 
      border-radius: 8px 0 0 8px;
}

.object-card{
      border: 1px solid #00000080;
      border-radius: 8px; 
      background-color: white;
}

.link:active, .link:hover, .link{
      color: black;
}
</style>
