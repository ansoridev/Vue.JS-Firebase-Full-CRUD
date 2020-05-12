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
                    <li class="nav-item active">
                        <router-link :to="{ name: 'Home' }" class="nav-item-hold"  >
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
        <!--=============== Left side End ================-->

        <!-- ============ Body content start ============= -->
        <div class="main-content-wrap sidenav-open d-flex flex-column">

            <div class="breadcrumb">
                <h1>Dashboard</h1>
            </div>
            <div class="separator-breadcrumb border-top"></div>

            <div class="row">
            <div class="col-md-6">
                            <div class="card card-profile-1 mb-4">
                                <div class="card-body text-center">
                                    
                                    <label>Display Name</label>
                                    <input type="text" class="form-control form-control-rounded" v-model="displayName">
                                    
                                    <br>
                                    <label>Email</label>
                                    <input type="text" class="form-control form-control-rounded" v-model="email">
                                    
                                    <br>
                                    <label>Profile Picture</label>
                                    <input class="form-control" id="files" 
                                      type="file"
                                      name="file"
                                      ref="uploadInput"
                                      accept="image/*"
                                      :multiple="false"
                                      @change="detectFiles($event)" >
                                    
                                    <div class="row" v-if="uploading && !uploadEnd">
                                      {{progressUpload}}%
                                    </div>

                                    <br><br>
                                    <button class="btn btn-primary btn-rounded" @click="update()" >Save</button>

                                    <div class="card-socials-simple mt-4">
                                        
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
  name: 'home',
    data() {
        return {
            email: '',
            displayName: null,
            photoURL: null,
            fileName: '',
            
            progressUpload: 0,
            uploadTask: '',
            uploading: false,
            uploadEnd: false,
            downloadURL: '',
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
    detectFiles (e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = firestorage.ref('UserProfile/' + file.name).put(file)
    },
    userData:function(){
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid;

        if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          this.downloadURL = user.photoURL;
          uid = user.uid;
        }

        this.email = email;
        this.displayName = name;
        this.photoURL = photoUrl;
        
    },
    update: function(){

        var user = firebase.auth().currentUser;
        
        user.updateProfile({
          displayName: this.displayName,
          email: this.email,
          photoURL: this.downloadURL
        })

        swal({
            type: "success", 
            title: "Success!", 
            text: "Your profile has been saved", 
            showConfirmButton: false,
            timer: 1500
        })

        //this.$router.replace('home')
        //this.$router.push({path: "/home", name:"home", component: home,  props: true})
        this.$router.push({ name: 'Home', params: {pEmail: this.email, pDisplayName: this.displayName,pPhotoURL: this.downloadURL}})

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

        })
      })
    }
  }
}
</script>