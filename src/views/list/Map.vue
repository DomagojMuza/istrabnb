<template>
  <GMapMap :center="center" :zoom="9" map-type-id="terrain" ref="map" @dragend="change()" @zoom_changed="change()">
     <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position"
        @click="openMarker(m.id)" >
        
        <GMapInfoWindow   :opened="openedMarkerID === m.id" ref="infoWindow">
          <div> {{ m.text }} </div>
        </GMapInfoWindow>

      </GMapMarker>
  </GMapMap>
</template>

<script>
export default {
  props: ['markers', 'bounds'],
  data() {
    return {
      openedMarkerID: null,
      center: { lat: 45.1917883, lng: 13.9255512 },
      icon: "@/assets/shop.png"
    };
  },
  methods: {
    change()
    {
     this.$refs.map.$mapPromise.then( map => {
      let ne = map.getBounds().getNorthEast().lng() + ',' + map.getBounds().getNorthEast().lat();
      let sw = map.getBounds().getSouthWest().lng() + ',' + map.getBounds().getSouthWest().lat();
      this.$emit("fetchByBox", {sw, ne});

    })
    },
    openMarker(id) {
      this.openedMarkerID = id;
      
       this.markers.forEach( marker => {
           if(id === marker.id) 
           {
            this.$refs.map.$mapPromise.then( map => {
                map.panTo(marker.position)
            })
           }
       })
    },
  },
  mounted() {
    this.$refs.map.$mapPromise.then(() => {
      let bounds = new window.google.maps.LatLngBounds();
      this.markers.forEach(marker => {
        bounds.extend(marker.position)
      });
      this.$refs.map.fitBounds(bounds)
  })
  }
};
</script>

<style>
  body {
    margin: 0;
  }
</style>