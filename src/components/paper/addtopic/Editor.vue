<template>
    <div class="tinymce">
        <Editor id="tinymce" v-model="tinymceHtml" :init="init"></Editor>
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/preview';
import request from '@/api/editor';

export default {
    name: 'TinyMceEditor',
    data() {
        return {
            tinymceHtml: this.content,
            init: {
                //开发环境
                language_url: '/tinymce/langs/zh_CN.js',
                skin_url: '/tinymce/skins/lightgray',
                //线上
                //   language_url: '@/assets/tinymce/langs/zh_CN.js',
                //   skin_url: '@/assets/tinymce/skins/lightgray',
                language: 'zh_CN',
                height: this.height,
                width: this.width,
                menubar:false,
                plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu fullscreen preview',
                toolbar: ' undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image table | removeformat | fullscreen preview code wordcount',
                image_caption: true,
                image_advtab: true,
                //上传后使用绝对路径
                relative_urls: false,
                remove_script_host: false,
                allow_script_urls: true, //允许外链和脚本
                images_upload_handler: (blobInfo, success, failure) => {
                    this.handleImgUpload(blobInfo, success, failure);
                }
            }
        };
    }, 
    props: {
        width: {
            type: Number
        },
        height: {
            type: Number,
            default: 300
        },
        content: {
            type: String,
            default: ''
        }
    },

    mounted() {
        tinymce.init({});
    },
    components: {
        Editor
    },

    methods: {
        handleImgUpload(blobInfo, success, failure) {
            let formdata = new FormData();
            formdata.set('file', blobInfo.blob());
            request(formdata)
                .then(rep => {
                    success(rep.data);
                })
                .catch(rep => {
                    failure('error');
                });
        }
    },

    watch: {
        tinymceHtml(val) {
            this.$emit('contentChange', val);
        }
    }
};
</script>
<style  scoped>

</style>
