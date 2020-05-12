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
                    <li class="nav-item">
                        <router-link :to="{ name: 'Tables' }" class="nav-item-hold">
                            <i class="nav-icon i-Library"></i>
                            <span class="nav-text">Tables</span>
                        </router-link>
                        <div class="triangle"></div>
                    </li>
                    <li class="nav-item active">
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
                <h1>Files</h1>
            </div>

            <div class="separator-breadcrumb border-top"></div>

            <div class="row">
               
                <div class="col-md-12">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="card-title mb-3">File Upload</div>
                            <form>
                                <div class="row">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                        </div>
                                        <div class="custom-file">
                                            <input class="custom-file-input" id="files" for="inputGroupFileAddon01"
                                              type="file"
                                              name="file"
                                              ref="uploadInput"
                                              accept="image/*"
                                              :multiple="false"
                                              @change="detectFiles($event)"  >

                                            <label class="custom-file-label" for="files">Choose file</label>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="row" v-if="uploading && !uploadEnd">
                                  {{progressUpload}}%
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

               
               <div class="col-md-12 mb-4">
                    <div class="card text-left">
                        <div class="card-body">
                            <h4 class="card-title mb-3">File List</h4>
                        </div>
                        <div class="card-body">


                            <div class="table-responsive">
                                <table id="scroll_horizontal_table" class="display table table-striped table-bordered " style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Preview/Download</th>
                                            <th>Upload Date</th>
                                            <th>Action</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="file of allFiles" :key="file['.key']" >
                                            <td>{{ file.imageName }}</td>
                                            <td><a :href="file.downloadURL" target="__blank" >Click To Open</a></td>
                                            <td>{{ file.date }}</td>
                                            <td>
                                                <span class="text-danger mr-2" @click="alertConfirm(file.imageName,file['.key'])" style="cursor: pointer;" >
                                                    <i class="nav-icon i-Close-Window font-weight-bold"></i>
                                                </span>
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
import { firestorage } from '../config/db'
import { db } from '../config/db'

export default {
  name: 'files',
  firebase: {
      allFiles: db.ref('UserImages')
  },
  data () {
    return {
      photoURL:"",
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: '',
      currentDate: '',
      imgFileName: '',
    }
  },
  created: function(){
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
    selectFile () {
      this.$refs.uploadInput.click()
    },
    detectFiles (e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = firestorage.ref('images/' + file.name).put(file)

      this.currentDate = (new Date().getDay())+'/'+(new Date().getMonth())+'/'+(new Date().getFullYear());
      this.imgFileName = file.name
    },
    alertConfirm(filename, key){
      filename = filename
      key = key

      swal({
          title: "Are you sure?", text: "You won't be able to revert this!", type: "warning", showCancelButton: !0, confirmButtonColor: "#0CC27E", cancelButtonColor: "#FF586B", confirmButtonText: "Yes, delete it!", cancelButtonText: "No, cancel!", confirmButtonClass: "btn btn-success mr-5", cancelButtonClass: "btn btn-danger", buttonsStyling: !1
      }).then(function() {
          
          
          firestorage
            .ref('images/' + filename)
            .delete()
            .then(() => {
              
            })
            .catch((error) => {
              console.error(`file delete error occured: ${error}`)
            })

          db.ref('UserImages').child(key).remove()

          swal("Deleted!", "Your file has been deleted.", "success")
          
      }, function(t) {
          "cancel"===t&&swal("Cancelled", "Your file is safe :)", "error")
      })

      this.uploading = false;
      this.uploadEnd = false;
      this.downloadURL = '';

    }
  },
  watch: {
    uploadTask: function () {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      },
      null,
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.uploadEnd = true
          this.downloadURL = downloadURL
          this.$emit('downloadURL', downloadURL)
          db.ref('UserImages').push({'imageName' : this.imgFileName, 'date' : this.currentDate, 'downloadURL' : downloadURL })

          
            swal({
                type: "success", 
                title: "Success!", 
                text: "Your file has been saved", 
                buttonsStyling: !1, 
                confirmButtonClass: "btn btn-lg btn-success"
            })

        })
      })
    }
  }
};
</script>