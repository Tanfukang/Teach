<template>
    <div class="addtopic">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                题目类型
                <!-- 题目类型 -->
                <TopicType v-model="radio" class="radio-style"></TopicType>
                <el-button type="primary" @click="achieve" class="sachieve">完成制作</el-button>
            </div>
            <!-- 选择题 -->
            <SelectTopic class="text item" v-if="radio === 1"></SelectTopic>
            <!-- 填空题 -->
            <Completion class="text item" v-if="radio === 2"></Completion>
            <!-- 问答题 -->
            <EssayQuestion class="text item" v-if="radio === 3"></EssayQuestion>
        </el-card>
        <!-- 选择题 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">一、选择题（本题共0道小题，共<el-badge :value="12" class="item"> </el-badge>分）</div>
            <div class="text item"></div>
        </el-card>
        <!-- 填空题 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">二、填空题（本题共0道小题，共<el-badge :value="12" class="item"> </el-badge>分）</div>
            <div class="text item"></div>
        </el-card>
        <!-- 问答题 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">三、问答题（本题共0道小题，共<el-badge :value="12" class="item"> </el-badge>分）</div>
            <div class="text item"></div>
        </el-card>
    </div>
</template>

<script>

import request from '@/api/Paper';
import SelectTopic from './addtopic/SelectTopic';  //选择题组件
import Completion from './addtopic/Completion';     //填空题组件
import EssayQuestion from './addtopic/EssayQuestion';   //问答题组件
import TopicType from './addtopic/TopicType';       //问题类型组件

export default {
    data() {
        return {
            radio:1,
            input: '',
            check: []            
        };
    },
    components: {
        // 引入组件
        TopicType,
        SelectTopic,
        Completion,
        EssayQuestion
    },
    created() {
        
    },
    methods: {
        achieve() {
            console.log('完成');
        },
        
    }
};
</script>

<style scoped lang="less">
.sachieve {
    float: right;
}
.radio-style {
    display: inline-block;
    margin-left: 20px;
}
.box-card {
    margin-bottom: 20px;
}

</style>
