<template>
    <div>
        <div v-for="(obj, index) in la" :key="index" @click="emit()">
            {{obj.name}}
        </div>
    </div>
</template>

<script>
    export default {
        props: ['objects'],
        data() {
            return {
                la: []
            }
        },
        created() {
            this.la = JSON.parse(JSON.stringify(this.objects))
        },
    }
</script>

<style lang="scss" scoped>

</style>