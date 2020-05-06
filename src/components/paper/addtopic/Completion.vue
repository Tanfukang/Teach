<template>
    <div class="">
        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-purple">题干</div></el-col>
            <el-col :span="22">
                <div class="grid-content bg-purple">
                   <el-button  round icon="el-icon-document-checked" @click="newTopic">插入填空</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    methods: {
        newTopic(){
            
        }
    }
};
</script>

<style scoped lang="less">
</style>
