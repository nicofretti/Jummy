<template>
  <div class="field">
    <p v-if="label">{{ label }}</p>
    <input :style="!this.error ? styleInput:'background:#ecdada'" :value="modelValue" :type="type"
      @input="$emit('update:modelValue',$event.target.value)"/>
  </div>
</template>

<script>

export default {
  name: "LabelInput",
  props: ["modelValue","label", "type","styleInput","error"],
}
</script>

<style lang="scss">
@import "src/global";

div.field {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;

  > p {
    font-size: 20px;
    margin: 0;
  }

  > input {
    font-size: 22px;
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
