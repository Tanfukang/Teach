<template>
    <div class="">
        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-purple">题干</div></el-col>
            <el-col :span="22">
                <div class="grid-content bg-purple">
                    <el-input type="textarea" autosize v-model="form.stem"> </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-purple">参考答案</div></el-col>
            <el-col :span="22">
                <div class="grid-content bg-purple">
                    <editor></editor>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-purple">分值</div></el-col>
            <el-col :span="22">
                <div class="grid-content">
                    <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
            <el-col :span="22">
                <div class="grid-content">
                    <el-button round>重置</el-button>
                    <el-button type="primary" round icon="el-icon-document-checked" @click="newTopic">新增题目</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import editor from '../addtopic/Editor';
export default {
    data() {
        return {
            form: {
                stem: ''
            },
             num: 1,
        };
    },
    components: {
        // 引入组件
        editor
    },
    created() {},
    methods: {
          handleChange(value) {
            console.log(value);
        },
        newTopic(){

        }
    }
};
</script>

<style scoped lang="less">
.el-row {
    margin-bottom: 10px;
}
</style>
