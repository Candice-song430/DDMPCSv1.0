<template>
  <div>
    <source-item
      v-for="item in tools"
      :item_title="item.item_title"
      :item_type="item.item_title | getCategoryType"
    ></source-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tools: [
        {
          item_title: "Inner Join"
        },
        {
          item_title: "Outer Join"
        },
        {
          item_title: "Left Join"
        },
        {
          item_title: "Right Join"
        },
        {
          item_title: "Sort"
        },
        {
          item_title: "Distinct"
        },
        {
          item_title: "Export"
        },
        {
          item_title: "Copy"
        },
        {
          item_title: "Intersection"
        },
        {
          item_title: "Union"
        },
        {
          item_title: "Difference"
        },
        {
          item_title: "Conditional Filter"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
