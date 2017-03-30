<style>
.navigator {
  display: inline-block;
  margin-right: 5px;
  padding: 5px 10px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
}

.navigator.active {
  color: #fff;
  background-color: #38f;
}
</style>

<template>
<a class="navigator" :class="{active: isActive}" :href="url">{{title}}</a>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
