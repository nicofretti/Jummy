<template>
  <div class="field">
    <p class="label" v-if="label">{{ label }}</p>
    <input class="value" :value="value" :type="type"/>
  </div>
</template>

<script>

export default {
  name: "LabelInput",
  props: ["label", "type", "value"],
}
</script>

<style scoped lang="scss">
@import "src/global";

div.field {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;

  > p {
    font-size: 25px;
    margin: 0;
  }

  > input {
    font-size: 25px;
    font-family: Quicksand-Bold, sans-serif;
    color: $TEXT;
    background: $BACKGROUND;
    height: 60px;
    border: none;
    border-radius: 8px;
    padding-left: 20px;

  }
}

</style>
