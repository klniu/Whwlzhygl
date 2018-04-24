<template>
  <div>
    <el-cascader
      :options="options"
      :props="cityCascaderProps"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
<script>
import chinaData from './city'
export default {
  props: {
    value: {
      type: String,
      default: () => {
        return '[]'
      }
    }
  },
  data() {
    return {
      cityCascaderProps: {
        value: 'label'
      },
      options: chinaData,
      selectedOptions: JSON.parse(this.value)
    };
  },
  methods: {
    handleChange(value) {
      this.$emit('input', JSON.stringify(value))
    }
  }
}
</script>
