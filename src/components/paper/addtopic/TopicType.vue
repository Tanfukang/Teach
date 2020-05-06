<!-- 问题类型组件 
typeName（题目名称）
typeId（题目id）-->
<template>
    <div class="topicType">
        <el-radio-group v-model="radioSelcet">
            <el-radio :label="item.typeId" v-for="item in proType" :key="item.typeId">{{ item.typeName }}</el-radio>
        </el-radio-group>
    </div>
</template>

<script>
import request from '@/api/Paper';
export default {
    model: {
        prop:'radio',
        event:'changeRadio'
    },
    disabled: {
        // 是否禁用，默认false，非必传。
        type: Boolean,
        default: false
    },
    props:{
        radio:{
            require:true,
            type:Number
        }
    },
    data() {
        return {
            radioSelcet:'',
            //问题类型
            proType: []
        };
    },
    created() {
        //获取问题类型
        request.problemTypes().then(res => {
            this.proType = res.data;
        });
        this.$nextTick(()=>{
            this.radioSelcet = this.radio;
        })
    },
    watch:{
       radioSelcet(to){
           this.$emit('changeRadio',to)
       } 
    },
    methods: {}
};
</script>

<style scoped lang="less">
</style>
