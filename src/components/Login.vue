<template>
    <div class="auth-layout-wrap" style="background-image: url(assets/images/photo-wide-4.jpg)">
        <div class="auth-content">
            <div class="card o-hidden">
                <div class="row">
                    <div class="col-md-6">
                        <div class="p-4">
                            <div class="auth-logo text-center mb-4">
                                <img src="assets/images/logo.png" alt="">
                            </div>
                            <h1 class="mb-3 text-18">Sign In</h1>
                            <form>
                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input id="email" v-model="email" class="form-control form-control-rounded" type="text">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input id="password" v-model="password" class="form-control form-control-rounded" type="password">
                                </div>
                                <button type="button" @click="login" class="btn btn-rounded btn-primary btn-block mt-2">Sign In</button>

                            </form>

                        </div>
                    </div>
                    <div class="col-md-6 text-center" style="background-size: cover;background-image: url(assets/images/photo-long-3.jpg)">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>