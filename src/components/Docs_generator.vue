<template>
    <div>
        <h1>Docs generator</h1>

        <v-btn class="primary" @click="downloadPDF">Download pdf</v-btn>
    </div>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
    data(){
        return{

        }
    },
    methods:{
        downloadPDF(){
            
            var docDefinition = {
                content: [
                    // if you don't need styles, you can use a simple string to define a paragraph
                    'This is a standard paragraph, using default style'
                ]
            };

            pdfMake.createPdf(docDefinition).download();
        }
    }
}
</script>

<style scoped>

</style>