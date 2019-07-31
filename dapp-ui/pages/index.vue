<template>
  <div class="container m-5">
    <div>
      <!-- <h1 class="title">ETHIndia Workshop</h1> -->
      <div class="row">
        <div class="col-sm"><card :propObject="test"/></div>
      </div>
    </div>
  </div>
</template>

<script>
import card from "~/components/card.vue";

export default {
  components: {
    card
  },
  data() {
    return {
      test: {
        name: 'XYZ',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        price: '2 ETH',
      }
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
