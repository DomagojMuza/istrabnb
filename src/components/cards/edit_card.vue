<template>
      <router-link class="link" style="text-decoration: none;" :to="{ name: 'my-object', params: {_id: object._id} }">
            <div class="row object-card shadow gx-0">
                  <div class="col-12 img position-relative" :style="{ 'background-image': `url(${images[0]})` }" >
                       <div class="position-absolute start-0 end-0 top-0 bottom-0">
                              <div class="d-flex h-100 flex-column justify-content-end ">
                                    <div class="d-flex justify-content-center info-wrapper rounded-top p-3">
                                          <h1>{{ object.name }}</h1>
                                    </div>
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

.img{
      background-size: cover;
      background-position: center;
      border-radius: 8px !important;
      min-height: 300px;
      max-height: 300px;
}

.info-wrapper{
      background-color:rgba(0,0,0,0.7);
      color: white;
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
