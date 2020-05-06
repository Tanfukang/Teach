<template>
<!-- 选择老师组件 -->
    <div class="selectTeacher">
        <el-select v-model="teacherId" placeholder="请选择" @change="selectTeacher">
            <el-option :label="item.userName" :value="item.userId" v-for="item in Teacher" :key="item.userId"></el-option>
        </el-select>
    </div>
</template>

<script>
import request from '../../api/Class';
export default {
    data() {
        return {
            teacherId:'',
            Teacher:[]
        };
    },
    created() {
        request
            .Allteacher()
            .then(res => {
                this.Teacher = res.data;
            })
            .catch(error => {});
    },
    methods: {
        selectTeacher(value){
            console.log(value)
        }
    }
};
</script>

<style scoped lang="less">
</style>
