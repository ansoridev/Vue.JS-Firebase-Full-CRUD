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
                                    <div class="avatar box-shadow-2 mb-3">
                                        <!-- <img src="assets/images/faces/16.jpg" alt=""> -->
                                        <img :src="photoURL" alt="">
                                    </div>
                                    <h5 class="m-0"><b>{{ displayName }}</b></h5>
                                    <p class="mt-0">{{ email }}</p>
                                    
                                   
                                    <button class="btn btn-primary btn-rounded" @click="update()" >Update</button>
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
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'home',
    props: {
        pEmail: '',
        pDisplayName: null,
        pPhotoURL: null
    },
    data() {
        return {
            email: this.pEmail,
            displayName: this.pDisplayName,
            photoURL: this.pPhotoURL
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
            var name, email, photoUrl, uid;

            if (user != null) {
              name = user.displayName;
              email = user.email;
              photoUrl = user.photoURL;
            }
            if(this.email == null){
                this.email = email;
                this.displayName = name;
                this.photoURL = photoUrl;
            }
            
            
        },
        update: function(){
            this.$router.replace('updateProfile')
        }
    }

}
</script>