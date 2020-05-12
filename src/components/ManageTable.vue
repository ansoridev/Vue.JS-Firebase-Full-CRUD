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
                <h1>Manage Data</h1>
            </div>

            <div class="separator-breadcrumb border-top"></div>

            <div class="row">
               
                <div class="col-md-12">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="card-title mb-3" >{{ data.name }}</div>
                            <form name="CustomTable">
                                <div class="row" >
                                    <div class="col-md-6 form-group mb-3" v-for="(fieldname, index) in field" :key="index" >
                                        <label for="">{{ fieldname }}</label>
                                        <input type="text" v-if="dataType[index] == 'String'" class="form-control form-control-rounded" v-bind:placeholder="('Enter '+ fieldname)" v-model="newTable[fieldname]">
                                        <input type="number" v-if="dataType[index] == 'Number'" class="form-control form-control-rounded" v-bind:placeholder="('Enter '+ fieldname)" v-model="newTable[fieldname]">
                                    </div>
								
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-primary" @click="addTable()" >Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

               <div class="col-md-12 mb-4">
                    <div class="card text-left">
                        <div class="card-body">
                            <h4 class="card-title mb-3">{{ data.name }} - Data</h4>
                        </div>
                        <div class="card-body">


                            <div class="table-responsive">
                                <table id="scroll_horizontal_table" class="display table table-striped table-bordered" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th v-for="fieldname in field" :key="fieldname">{{ fieldname }}</th>
                                            
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(record, index) in records" :key="index">
                                            
                                            <td v-for="fieldname in field" >{{ record[fieldname] }}</td>
                                            
                                            <td> 
                                                <span class="text-success mr-2" @click="editRecord(index)" style="cursor: pointer;" >
                                                    <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                                                </span>
                                                <span class="text-danger mr-2" @click="deleteRecord(index)" style="cursor: pointer;">
                                                    <i class="nav-icon i-Close-Window font-weight-bold"></i>

                                                </span>

                                                <!-- @click="deleteRecord(index)" -->
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>

                        </div>
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

import { db } from '../config/db'

export default {
    
    name: 'ManageTable',
    
    components: {
        name: 'ManageTable'
    },

    data () {
        return {
        	photoURL:"",
            data:{},
            field: [],
            dataType: [],
        	newTable: [],
        	records:{},
        	editKey: ""
        }
        
    },

    created: function(){
        this.tableData()
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
	    tableData: function(){
	    	
	    	var tablename ="";

	    	db.ref('tables').child(this.$router.currentRoute.params.id).on('value', (snap) => {
                this.data = snap.val()
                
                tablename = this.data.name;

                var field = snap.val().field
                this.field = field.split(',')

                var dataType = snap.val().dataType
                this.dataType = dataType.split(',')

            });

            this.t = setInterval(() => {
				if(tablename != ""){
					this.tableRecords()	
		            clearInterval(this.t)
				}
				
			}, 1000)
            
	    },
	    addTable: function() {

	    	if(!this.editKey){
	    		db.ref(this.data.name).push(this.newTable)

	    		swal({
	                type: "success", 
	                title: "Success!", 
	                text: "Your record has been saved", 
	                showConfirmButton: false,
  					timer: 1500
	            })

	    	}else{
	    		db.ref(this.data.name).child(this.editKey).update(this.newTable)
	    		this.editKey = ""

	    		swal({
	                type: "success", 
	                title: "Success!", 
	                text: "Your record has been updated", 
	                showConfirmButton: false,
  					timer: 1500
	            })
	    	}
	    	
	    	this.newTable = []

	    },
        tableRecords: function(){

        	db.ref(this.data.name).on('value', (snap) => {
                this.records = snap.val()
            });	
		
		},
		deleteRecord: function(key){
			var key = key;
			var name = this.data.name;
			swal( {
		        title: "Are you sure?", text: "You won't be able to revert this!", type: "warning", showCancelButton: !0, confirmButtonColor: "#0CC27E", cancelButtonColor: "#FF586B", confirmButtonText: "Yes, delete it!", cancelButtonText: "No, cancel!", confirmButtonClass: "btn btn-success mr-5", cancelButtonClass: "btn btn-danger", buttonsStyling: !1
		    }
		    ).then(function() {
		        
		        db.ref(name).child(key).remove()

		        swal("Deleted!", "Your record has been deleted.", "success")
		    }
		    , function(t) {
		        "cancel"===t&&swal("Cancelled", "Your record is safe :)", "error")
		    })

		    
		},
		editRecord: function(key){

			db.ref(this.data.name).child(key).on('value', (snap) => {
          		this.newTable = snap.val()
          		this.editKey = key
            });	
		}
	},

	filters: {
	  capitalize: function (value) {
	    if (!value) return ''
	    value = value.toString()
	    return value.charAt(0).toUpperCase() + value.slice(1)
	  }
	}
    
    
}


</script>