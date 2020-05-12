<template>
    <div class="app-admin-wrap">
        <div class="main-header">
            <div class="logo">
                <img src="assets/images/logo.png" alt="">
            </div>

            <div class="menu-toggle">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div class="d-flex align-items-center">
                
            </div>

            <div style="margin: auto"></div>

            <div class="header-part-right">
                <i class="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen></i>
                <div class="dropdown">
                    <div class="user colalign-self-end">
                        <img :src="photoURL" id="userDropdown" alt="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="#" @click="logout" >Sign out</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="side-content-wrap">
            <div class="sidebar-left open" data-perfect-scrollbar data-suppress-scroll-x="true">
                <ul class="navigation-left">
                    <li class="nav-item">
                        <router-link :to="{ name: 'Home' }" class="nav-item-hold">
                            <i class="nav-icon i-Bar-Chart"></i>
                            <span class="nav-text">Dashboard</span>
                        </router-link>
                        <div class="triangle"></div>
                    </li>
                    <li class="nav-item active">
                        <router-link :to="{ name: 'Tables' }" class="nav-item-hold">
                            <i class="nav-icon i-Library"></i>
                            <span class="nav-text">Tables</span>
                        </router-link>
                        <div class="triangle"></div>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'Files' }" class="nav-item-hold">
                            <i class="nav-icon i-Suitcase"></i>
                            <span class="nav-text">Files</span>
                        </router-link>
                        <div class="triangle"></div>
                    </li>                    
                </ul>
            </div>
            <div class="sidebar-overlay"></div>
        </div>
        <div class="main-content-wrap sidenav-open d-flex flex-column">
            <div class="breadcrumb">
                <h1>Tables</h1>
            </div>

            <div class="separator-breadcrumb border-top"></div>

            <div class="row">
                <!-- ICON BG -->
                <div class="col-lg-3 col-md-6 col-sm-6" style="cursor: pointer;" data-toggle="modal" data-target="#exampleModal">
                    <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <div class="card-body text-center">
                            <!-- <i class="i-Add-User"></i> -->
                            <span class="fa fa-clone" style="font-size: 67px; color: #999;"></span>
                            <div class="content">
                                <p class="text-muted mt-2 mb-2"> Click To Add New</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="table of tables" :key="table['.key']" class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <div class="card-body text-center">
                            <span :class="table.class" style="font-size: 67px; color: #999;"></span>
                            <div class="content">
                                <p class="text-muted mt-2 mb-2">{{ table.name }}</p>
                                <p class="lead text-primary text-24 mb-2">
                                    <span class="text-success mr-2" style="cursor: pointer;"  @click="editTable1(table['.key'])" data-toggle="modal" data-target="#editModal" >
                                        <i class="nav-icon i-Pen-2 font-weight-bold"></i>

                                    </span>
                                    <a href="javascript:void(0)"><span @click="deleteTable(table['.key'], table.name)" class="text-danger mr-2 alert-confirm" >
                                        <i class="nav-icon i-Close-Window font-weight-bold"></i>
                                    </span></a>
                                    <router-link :to="{ name: 'ManageTable', params: { id: table['.key'] } }" ><span class="text-default mr-2">
                                        <i class="nav-icon i-Eye font-weight-bold"></i>
                                    </span></router-link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                

            </div>

        </div>

        

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add New Table</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="fTable">
                        <div class="modal-body">
                            
                                
                                <div v-if="errors.length" class="alert alert-danger">
                                    <b>Please correct the following error(s):</b>
                                    <ul>
                                      <li v-for="error in errors" :key="error" >{{ error }}</li>
                                    </ul>
                                </div>

                            

                            <div class="row">
                                <div class="col-md-12 form-group mb-3">
                                    <label for="">Table Name*</label>
                                    <input type="text" class="form-control form-control-rounded" id="tblname" placeholder="Enter Table Name" v-model="newTable.name" required>
                                </div>
                                <div class="col-md-12 form-group mb-3">
                                    <label for=""><a target="_blank" href="https://fontawesome.com/v4.7.0/icons/"><u>Icon Class</u></a>*</label>
                                    <input type="text" class="form-control form-control-rounded" id="icnname" placeholder="fa fa-user-o" v-model="newTable.class" required>
                                </div>
                            </div>
                            <div class="row" v-for="(newTable, index) in newTables" :key="index" >
                                <div class="col-md-6 form-group mb-3">
                                    <label for="fieldname">Field Name*</label>
                                    <input type="text" class="form-control form-control-rounded" placeholder="Enter Field Name" v-model="newTable.field" required>
                                </div>
                                <div class="col-md-4 form-group mb-3">
                                    <label for="type">Type*</label>  
                                    <select class="form-control form-control-rounded" v-model="newTable.dataType" >
                                        <option value="String" >String</option>
                                        <option value="Number" >Number</option>
                                    </select>
                                </div>
                                <div class="col-md-1 form-group mb-3" v-if="index > 0">
                                    <label>&nbsp;</label>
                                    <button type="button" class="btn btn-danger" @click="deleteRow(index)">X</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1 form-group mb-3 pull-right">
                                    <button type="button" class="btn btn-primary" @click="addRow()">Add</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="closeModal">Close</button>
                            <button type="button" class="btn btn-primary" @click="addTable" >Save changes</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>


            
            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="">Update Table</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">

                            <div v-if="errors.length" class="alert alert-danger">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                  <li v-for="error in errors" :key="error" >{{ error }}</li>
                                </ul>
                            </div>

                            <div class="row">
                                <div class="col-md-12 form-group mb-3">
                                    <label for="">Table Name</label>
                                    <input type="text" class="form-control form-control-rounded" id="" placeholder="Enter Table Name" v-model="editTable.name" >
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group mb-3">
                                    <label for=""><a href="https://fontawesome.com/v4.7.0/icons/"><u>Icon Class</u></a></label>
                                    <input type="text" class="form-control form-control-rounded" placeholder="fa fa-user-o" v-model="editTable.class" >
                                </div>
                            </div>

                            <div class="row" v-for="(field, index) in editTables.field" :key="index" >
                                <div class="col-md-6 form-group mb-3">
                                    <label for="fieldname">Field Name</label>
                                    <input type="text" class="form-control form-control-rounded" placeholder="Enter Field Name" :name="'field'+index" v-model="editTables.field[index]" >
                                </div>
                                <div class="col-md-4 form-group mb-3">
                                    <label for="type">Type</label>
                                    <select class="form-control form-control-rounded" :name="'dataType'+index" v-model="editTables.dataType[index]" >
                                        
                                        <option value="String"  >String</option>

                                        <option value="Number"  >Number</option>

                                    </select>
                                </div>
                                <div class="col-md-1 form-group mb-3" v-if="index > 0">
                                    <label>&nbsp;</label>
                                    <button class="btn btn-danger" @click="deleteEditRow(index)">X</button>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-md-1 form-group mb-3 pull-right">
                                    <button class="btn btn-primary" @click="addEditRow()">Add</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="closeEditModal">Close</button>
                            <button type="button" class="btn btn-primary" @click="updateTable" >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        <!-- ============ Body content End ============= -->
    </div>
    <!--=============== End app-admin-wrap ================-->
     
</template>

<script>
/* eslint-disable */
import firebase from 'firebase';
import { db } from '../config/db';
export default {
    name: 'tables',
    components: {
        name: 'Tables'
    },
    firebase: {
        tables: db.ref('tables')
    },
    data () {
        return {
            photoURL:"",
            errors: [],
            newTable:{
                name: '',
                class: '',
                field: '',
                dataType: '',
            },
            editTable:{
                name: '',
                class: '',
                field: '',
                dataType: '',
            },
            tableData: {},
            editField: [],
            editDataType: [],
            tableEditKey: "",
            tables: [],
            newTables: [],
            editTables: [],
            fieldStr: '',
            dataTypeStr: '',
            
        }
    },
    created: function(){
        this.addRow()
        this.userData()
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
            this.$router.replace('login')
            })
        },
        userData:function(){
            var user = firebase.auth().currentUser;
            if (user != null) {
              this.photoURL = user.photoURL;
            }
        },
        addTable: function() {
            
            var error = false
            this.errors = []

            this.fieldStr = Array.prototype.map.call(this.newTables, s => s.field).toString()
            this.dataTypeStr = Array.prototype.map.call(this.newTables, s => s.dataType).toString()

            if (!this.newTable.name) {
                this.errors.push('Table name is required.')
                error = true
            }
            if(!this.newTable.class) {
                this.errors.push('Icon name is required.')
                error = true
            }
            
            this.newTables.map((s) => {
               if(!s.field) {
                    this.errors.push('Field name is required.')
                    error = true
                }
            });

            this.newTables.map((s) => {
               if(!s.dataType) {
                    this.errors.push('Field type is required.')
                    error = true
                }
            });

            
            

            if(error == false){

                this.$firebaseRefs.tables.push({
                    name: this.newTable.name,
                    class: this.newTable.class,
                    field: this.fieldStr,
                    dataType: this.dataTypeStr,
                })

                swal({
                    type: "success", 
                    title: "Success!", 
                    text: "Your table has been saved", 
                    showConfirmButton: false,
                    timer: 1500
                })

                this.newTable.name = ''
                this.newTable.class = ''
                this.newTables.field = ''
                this.newTable.field = ''
                this.newTables.dataType = ''
                this.newTable.dataType = ''

                var elem = this.$refs.closeModal
                elem.click()    

            }

            

            

        },
        updateTable: function() {

            var error = false
            this.errors = []

            this.fieldStr = this.editTables.field.join()
            this.dataTypeStr = this.editTables.dataType.join()

            
            if (!this.editTable.name) {
                this.errors.push('Table name is required.')
                error = true
            }
            if(!this.editTable.class) {
                this.errors.push('Icon name is required.')
                error = true
            }
            
            var fieldArr = this.editTables.field
            var dataTypeArr = this.editTables.dataType

            fieldArr.map(s => {
                if(!s) {
                    this.errors.push('Field name is required.')
                    error = true
                }
            });

            dataTypeArr.map((s) => {
               if(!s) {
                    this.errors.push('Field type is required.')
                    error = true
                }
            });

            if(error == false){

                this.$firebaseRefs.tables.child(this.tableEditKey).update({
                    name: this.editTable.name,
                    class: this.editTable.class,
                    field: this.fieldStr,
                    dataType: this.dataTypeStr,
                })

                this.editTable.name = ''
                this.editTable.class = ''
                this.editTables.field = ''
                this.editTables.dataType = ''
                this.tableEditKey = ''

                swal({
                    type: "success", 
                    title: "Success!", 
                    text: "Your table has been updated", 
                    showConfirmButton: false,
                    timer: 1500
                })

                var elem = this.$refs.closeEditModal
                elem.click()

            }

        },
        deleteTable(key, name) {
            var key = key;
            var name = name;

            var firebaseref = this.$firebaseRefs

            swal( {
                title: "Are you sure?", text: "You won't be able to revert this!", type: "warning", showCancelButton: !0, confirmButtonColor: "#0CC27E", cancelButtonColor: "#FF586B", confirmButtonText: "Yes, delete it!", cancelButtonText: "No, cancel!", confirmButtonClass: "btn btn-success mr-5", cancelButtonClass: "btn btn-danger", buttonsStyling: !1
            }
            ).then(function() {
                
                firebaseref.tables.child(key).remove()
                db.ref(name).remove()

                swal("Deleted!", "Your table has been deleted.", "success")
            }
            , function(t) {
                "cancel"===t&&swal("Cancelled", "Your table is safe :)", "error")
            })

        },
        editTable1(key){
            
            this.$firebaseRefs.tables.child(key).on('value', (snap) => {
                
                this.tableData = snap.val()

                this.editTable.name = this.tableData.name

                this.editTable.class = this.tableData.class

                var field = snap.val().field
                this.editTables.field = field.split(',')

                var dataType = snap.val().dataType
                this.editTables.dataType = dataType.split(',')

            });

            this.tableEditKey = key;

        },
        addRow() {
            this.newTables.push({ 
                field: '',
                dataType: ''
            })
        },
        addEditRow(){
            
            this.editTables.field.push("");
            this.editTables.dataType.push("");

            this.fieldStr = this.editTables.field.join();
            this.dataTypeStr = this.editTables.dataType.join();

            this.$firebaseRefs.tables.child(this.tableEditKey).update({
                name: this.editTable.name,
                class: this.editTable.class,
                field: this.fieldStr,
                dataType: this.dataTypeStr,
            });

        },
        deleteEditRow(index) {
            this.editTables.field.splice(index,1)
            this.editTables.dataType.splice(index,1)

            this.fieldStr = this.editTables.field.join()
            this.dataTypeStr = this.editTables.dataType.join()

            this.$firebaseRefs.tables.child(this.tableEditKey).update({
                name: this.editTable.name,
                class: this.editTable.class,
                field: this.fieldStr,
                dataType: this.dataTypeStr,
            })

        },
        deleteRow(index) {
            this.newTables.splice(index,1)
        },
    }
}
</script>