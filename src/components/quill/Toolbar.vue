<template lang="">
  <div id="my">
    <div class="ql-formats">
      <button class="ql-bold" />
      <button class="ql-italic" />
      <button class="ql-underline" />
      <button class="ql-strike" />
    </div>

    <div class="ql-formats">
      <button class="ql-blockquote" />
      <button class="ql-code-block" />
    </div>
    <div class="ql-formats">
      <button
        class="ql-header"
        value="1"
      />
      <button
        class="ql-header"
        value="2"
      />
    </div>

    <div class="ql-formats">
      <button
        class="ql-list"
        value="ordered"
      />
      <button
        class="ql-code-block"
        value="bullet"
      />
    </div>

    <div class="ql-formats">
      <button
        class="ql-script"
        value="sub"
      />
      <button
        class="ql-script"
        value="super"
      />
    </div>
    <div class="ql-formats">
      <button
        class="ql-indent"
        value="-1"
      />
      <button
        class="ql-indent"
        value="+1"
      />
    </div>
    <div class="ql-formats">
      <button
        class="ql-direction"
        value="rtl"
      />
    </div>
    <div class="ql-formats">
      <select class="ql-size">
        <option value="small">
          Small
        </option>
        <option
          value="medium"
          selected
        >
          Medium
        </option>
        <option value="large">
          Large
        </option>
        <option value="huge">
          Huge
        </option>
      </select>
    </div>
    <div class="ql-formats">
      <select class="ql-header">
        <option value="1">
          Header 1
        </option>
        <option value="2">
          Header 2
        </option>
        <option value="3">
          Header 3
        </option>
        <option value="4">
          Header 4
        </option>
        <option value="5">
          Header 5
        </option>
        <option value="6">
          Header 6
        </option>
        <option
          value="normal"
          selected
        >
          Normal
        </option>
      </select>
    </div>
    <!-- Color Picker -->
    <div class="ql-formats">
      <select class="ql-color">
        <option value="red">
          Red
        </option>
        <option value="green">
          Green
        </option>
        <option value="blue">
          Blue
        </option>
        <option value="#000000">
          Black
        </option>
        <option value="#FFFFFF">
          White
        </option>
        <!-- Add more colors as needed -->
      </select>
      <select class="ql-background">
        <option value="red">
          Red
        </option>
        <option value="green">
          Green
        </option>
        <option value="blue">
          Blue
        </option>
        <option value="#000000">
          Black
        </option>
        <option value="#FFFFFF">
          White
        </option>
        <!-- Add more colors as needed -->
      </select>
    </div>
    <div class="ql-formats">
      <select class="ql-font">
        <option
          value="sans-serif"
          selected
        >
          Sans Serif
        </option>
        <option value="serif">
          Serif
        </option>
        <option value="monospace">
          Monospace
        </option>
      </select>
      <button
        class="ql-align"
      >
        <span class="ql-align-left" />
      </button>
      <button
        class="ql-align"
        value="center"
      >
        <span class="ql-align-center" />
      </button>
      <button
        class="ql-align"
        value="right"
      >
        <span class="ql-align-right" />
      </button>
      <button
        class="ql-align"
        value="justify"
      >
        <span class="ql-align-justify" />
      </button>
      <button
        class="ql-link"
      />
      <button
        class="ql-image"
      />
    </div>
    <v-chip
      v-for="b in customButtoms"
      :key="b.id"
      class="mx-1"
      size="x-small"
      color="red"
      @click="sendCodeName(b.code_name)"
    >
      {{ b.name }}
    </v-chip>
  </div>
</template>

<script setup>
const props = defineProps({
  customButtoms: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['click'])
const sendCodeName = (codeName) => {
  emit('click', codeName)
}
</script>

<style lang="">

</style>
