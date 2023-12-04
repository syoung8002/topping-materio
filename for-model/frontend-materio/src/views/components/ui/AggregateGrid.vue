forEach: Aggregate
fileName: {{namePascalCase}}Grid.vue
---
<template>
    <v-container>
        <v-snackbar
            v-model="snackbar.status"
            :timeout="snackbar.timeout"
            :color="snackbar.color"
        >
            {{ snackbar.text }}
            <v-btn style="margin-left: 80px;" text @click="snackbar.status = false">
                Close
            </v-btn>
        </v-snackbar>
        <div class="panel">
            <div class="gs-bundle-of-buttons" style="max-height:10vh;">
                <v-btn @click="addNewRow" @class="contrast-primary-text" small color="primary">
                    <v-icon small style="margin-left: -5px;">mdi-plus</v-icon>등록
                </v-btn>
                <v-btn style="margin-left: 5px;" @click="editSelectedRow()" class="contrast-primary-text" small color="primary">
                    <v-icon small>mdi-pencil</v-icon>수정
                </v-btn>
                {{#commands}}
                {{^isRestRepository}}
                <v-btn style="margin-left: 5px;" {{#if fieldDescriptors}}@click="{{nameCamelCase}}Dialog = true"{{else}}@click="{{nameCamelCase}}"{{/if}} class="contrast-primary-text" small color="primary" {{#if (attachedActorName actorName)}}:disabled="!hasRole('{{actorName}}')"{{/if}}>
                    <v-icon small>mdi-minus-circle-outline</v-icon>{{#ifNotNull displayName name}}{{/ifNotNull}}
                </v-btn> 
                {{#if fieldDescriptors}}
                <v-dialog v-model="{{nameCamelCase}}Dialog" width="500">
                    <{{namePascalCase}}Command
                        @closeDialog="{{nameCamelCase}}Dialog = false"
                        @{{nameCamelCase}}="{{nameCamelCase}}"
                    ></{{namePascalCase}}Command>
                </v-dialog>
                {{/if}}
                {{/isRestRepository}}
                {{/commands}}
            </div>
            <div class="mb-5 text-lg font-bold"></div>
            <div class="table-responsive">
                <v-table>
                    <thead>
                        <tr>
                        <th>Id</th>
                        {{#aggregateRoot.fieldDescriptors}}
                        {{#unless isKey}}
                        {{#if (isNotId nameCamelCase)}}
                        {{#if isVO}}
                        {{#checkVO className}}
                        <th>{{className}}</th>
                        {{/checkVO}}
                        {{else}}
                        <th>{{namePascalCase}}</th>
                        {{/if}}
                        {{/if}}
                        {{/unless}}
                        {{/aggregateRoot.fieldDescriptors}}
                        {{#outgoingRelations}}
                        {{#target}}
                        <th>{{namePascalCase}}Id</th>
                        {{/target}}
                        {{/outgoingRelations}}
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(val, idx) in value" :key="val" @click="changeSelectedRow(val)" :style="val === selectedRow ? 'background-color: #f0f3ff;':''">
                            <td class="font-semibold">\{{ idx + 1 }}</td>
                            {{#aggregateRoot.fieldDescriptors}}
                            {{#unless isKey}}
                            {{#if (isNotId nameCamelCase)}}
                            {{#if isVO}}
                            {{#checkVO className}}
                            <td class="whitespace-nowrap" label="{{#ifNotNull displayName namePascalCase}}{{/ifNotNull}}">
                                <{{className}} :editMode="false" :inList="true" v-model="val.{{nameCamelCase}}"></{{className}}>
                            </td>
                            {{/checkVO}}
                            {{else}}
                            <td class="whitespace-nowrap" label="{{#ifNotNull displayName namePascalCase}}{{/ifNotNull}}">{{#getTableData nameCamelCase}}{{/getTableData}}</td>
                            {{/if}}
                            {{/if}}
                            {{/unless}}
                            {{/aggregateRoot.fieldDescriptors}}
                            {{#outgoingRelations}}
                            {{#target}}
                            <td class="whitespace-nowrap" label="{{#ifNotNull displayName namePascalCase}}{{/ifNotNull}}">
                                <{{namePascalCase}}Id :editMode="editMode" v-model="val.{{nameCamelCase}}Id"></{{namePascalCase}}Id>
                            </td>
                            {{/target}}
                            {{/outgoingRelations}}
                            <Icon style="margin-top: 15px;" icon="mi:delete" @click="deleteRow(val)" />
                        </tr>
                    </tbody>
                </v-table>
            </div>
            {{#aggregateRoot.fieldDescriptors}}
            {{#if isList}}
            <{{getEntityFromList className}}DetailGrid style="margin-top: 20px;" label="{{#ifNotNull displayName namePascalCase}}{{/ifNotNull}}" offline v-if="selectedRow" v-model="selectedRow.{{nameCamelCase}}" :selectedRow="selectedRow"/>
            {{/if}}
            {{/aggregateRoot.fieldDescriptors}}
        </div>
        <v-col>
            <v-dialog
                v-model="openDialog"
                transition="dialog-bottom-transition"
                width="35%"
            >
                <v-card>
                    <v-toolbar
                        color="primary"
                        class="elevation-0"
                        height="50px"
                    >
                        <div style="color:white; font-size:17px; font-weight:700;">Company 등록</div>
                        <v-spacer></v-spacer>
                        <v-icon
                            color="white"
                            small
                            @click="closeDialog()"
                        >mdi-close</v-icon>
                    </v-toolbar>
                    <v-card-text>
                        <{{namePascalCase}} :offline="offline"
                            :isNew="!value.idx"
                            :editMode="true"
                            :inList="false"
                            v-model="newValue"
                            @add="append"
                        />
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col style="margin-bottom:40px;">
            <div class="text-center">
                <v-dialog
                    width="332.5"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                >
                    <v-btn
                        style="position:absolute; top:2%; right:2%"
                        @click="closeDialog()"
                        depressed
                        icon 
                        absolute
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-dialog>
            </div>
        </v-col>
    </div>
</template>

<script>
import BaseGrid from '../base-ui/BaseGrid.vue'

import {{namePascalCase}} from '../{{namePascalCase}}.vue'
{{#aggregateRoot.fieldDescriptors}}
{{#unless isKey}}
{{#if (isNotId nameCamelCase)}}
{{#if isVO}}
{{#checkVO className}}
import {{className}} from '../vo/{{className}}.vue'
{{/checkVO}}
{{/if}}
{{/if}}
{{/unless}}
{{/aggregateRoot.fieldDescriptors}}
{{#outgoingRelations}}
{{#target}}
import {{nameCamelCase}}Id from '../{{nameCamelCase}}Id.vue'
{{/target}}
{{/outgoingRelations}}
{{#aggregateRoot.fieldDescriptors}}
{{#if isList}}
import {{getEntityFromList className}}DetailGrid from './{{getEntityFromList className}}DetailGrid.vue'
{{/if}}
{{/aggregateRoot.fieldDescriptors}}


export default {
    name: '{{nameCamelCase}}Grid',
    mixins:[BaseGrid],
    components:{
        {{namePascalCase}},
        {{#aggregateRoot.fieldDescriptors}}
        {{#unless isKey}}
        {{#if (isNotId nameCamelCase)}}
        {{#if isVO}}
        {{#checkVO className}}
        {{className}},
        {{/checkVO}}
        {{/if}}
        {{/if}}
        {{/unless}}
        {{/aggregateRoot.fieldDescriptors}}
        {{#outgoingRelations}}
        {{#target}}
        {{nameCamelCase}}Id,
        {{/target}}
        {{/outgoingRelations}}
        {{#aggregateRoot.fieldDescriptors}}
        {{#if isList}}
        {{getEntityFromList className}}DetailGrid,
        {{/if}}
        {{/aggregateRoot.fieldDescriptors}}
    },
    data: () => ({
        path: '{{namePlural}}',
        {{#commands}}
        {{^isRestRepository}}
        {{#if fieldDescriptors}}
        {{nameCamelCase}}Dialog: false,
        {{/if}}
        {{/isRestRepository}}
        {{/commands}}
    }),
    watch: {
    },
    methods:{
        {{#commands}}
        {{^isRestRepository}}
        {{nameCamelCase}}({{#if fieldDescriptors}}params{{/if}}){
            try{
                this.repository.invoke(this.getSelectedItem(), "{{nameCamelCase}}", {{#if fieldDescriptors}}params{{else}}null{{/if}})
                this.$EventBus.$emit('show-success','{{#ifNotNull displayname name}}{{/ifNotNull}} 성공적으로 처리되었습니다.')
                {{#if fieldDescriptors}}
                this.{{nameCamelCase}}Dialog = false
                {{/if}}
            }catch(e){
                console.log(e)
            }
            
        },
        {{/isRestRepository}}
        {{/commands}}
    }
}

</script>

<function>
var me = this;

if (me && me.attached) {
    var postCmd = me.attached.find(ele => ele._type.includes("Command") && (ele.isExtendedVerb==true && ele.controllerInfo.method=="POST") || (ele.isRestRepository==true && ele.restRepositoryInfo.method=="POST"));
    var putCmd = me.attached.find(ele => ele._type.includes("Command") && (ele.isExtendedVerb==true && ele.controllerInfo.method=="PUT") || (ele.isRestRepository==true && ele.restRepositoryInfo.method=="PUT"));
    var deleteCmd = me.attached.find(ele => ele._type.includes("Command") && (ele.isExtendedVerb==true && ele.controllerInfo.method=="DELETE") || (ele.isRestRepository==true && ele.restRepositoryInfo.method=="DELETE"));

    me.contexts.actors = {};

    if (postCmd && postCmd.attached) {
        var postActor = postCmd.attached.find(ele => ele._type.includes("Actor"));
        if (postActor) {
            me.contexts.actors.postActor = postActor;
        }
    }
    
    if (putCmd && putCmd.attached) {
        var putActor = putCmd.attached.find(ele => ele._type.includes("Actor"));
        if (putActor) {
            me.contexts.actors.putActor = putActor;
        }
    }
    
    if (deleteCmd && deleteCmd.attached) {
        var deleteActor = deleteCmd.attached.find(ele => ele._type.includes("Actor"));
        if (deleteActor) {
            me.contexts.actors.deleteActor = deleteActor;
        }
    }
}
window.$HandleBars.registerHelper('getPickerName', function (fieldDescriptors) {
    for(var i = 0; i < fieldDescriptors.length; i ++ ){
        if(fieldDescriptors[i] && fieldDescriptors[i].isName == true){
            return fieldDescriptors[i].nameCamelCase
        }else{
            return fieldDescriptors[0].nameCamelCase
        }
    }
})
window.$HandleBars.registerHelper('getNameField', function (fieldDescriptors) {
    for(var i = 0; i < fieldDescriptors.length; i ++ ){
        if(fieldDescriptors[i] && fieldDescriptors[i].isName == true){
            return fieldDescriptors[i].nameCamelCase
        }else if(fieldDescriptors[i].isName == false && fieldDescriptors[i].isKey == false){
            return fieldDescriptors[i].nameCamelCase
        }
    }
});
window.$HandleBars.registerHelper('checkVO', function (className, options) {
    if(className.endsWith("Address") || className.endsWith("Photo") || className.endsWith("User") || className.endsWith("Email") 
            || className.endsWith("Payment") || className.endsWith("Money") || className.endsWith("Weather") || className.endsWith("Rating") ){
        return options.fn(this);
    }
})
window.$HandleBars.registerHelper('getEntityFromList', function (className) {
    if(className.includes("List<") && className.includes(">")) {
        return className.replace("List<", "").replace(">", "");
    }
    return className;
})

window.$HandleBars.registerHelper('ifNotNull', function (displayName, name) {
    if(displayName){
        return displayName;
    }else{
        return name;
    }
})

window.$HandleBars.registerHelper('isNotId', function (className) {
    return (className != 'id')
})
window.$HandleBars.registerHelper('attachedActorName', function (actorName, options) {
    try {
        if(actorName) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        console.log(e)
    }
})
window.$HandleBars.registerHelper('getTableData', function (nameCamelCase) {
    if(nameCamelCase){
        var tdVal = '{{ val.' + nameCamelCase + ' }}'
        return tdVal
    }
})
</function>
