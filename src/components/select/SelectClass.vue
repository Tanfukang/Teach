<!-- 选择班级
className(班级名称)
classId(班级id) -->
<template>
    <div class="selectclass">
        <el-select v-model="value" placeholder="请选择" @change="selectClass">
            <el-option :label="item.className" :value="item.classId" v-for="item in classList" :key="item.classId"></el-option>
        </el-select>
    </div>
</template>

<script>
import request from '@/api/Student';
export default {
    data() {
        return {
            classList:[]
        };
    },
    created() {
        //获取所有班级的信息
        request.AllClass().then(res => {
            this.classList = res.data;
        });
    },
    methods: {
        selectClass(val) {
            console.log(val)
        }
    }
};
</script>

<style scoped lang="less">
</style>
