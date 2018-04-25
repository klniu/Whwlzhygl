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
    cityarr: {
      type: String,
      default: () => {
        return '[]'
      }
    }
  },
  computed: {
    selectedOptions() {
      return JSON.parse(this.cityarr)
    }
  },
  data() {
    return {
      cityCascaderProps: {
        value: 'label'
      },
      options: chinaData
    };
  },
  methods: {
    handleChange(value) {
      this.$emit('update:cityarr', JSON.stringify(value))
    }
  }
}
</script>
