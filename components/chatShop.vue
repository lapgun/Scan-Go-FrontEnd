<template>
  <div>
    <div v-if="user_id">
      <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Scan & go</h4>
                    <p class="modal-content-header">Chúng tôi có thể giúp gì cho bạn ?</p>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>Hello {{user_name}}</p>
                    <i class="fas fa-envelope envelope_1"></i>
                    <p class="content_modal">
                      Once you start a new conversation, you’ll see
                      <br/>it listed here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <a @click="showModal = true" href="#" class="border_pixed">
        <i style="margin-right:7px" class="fas fa-comments"></i>chats
      </a>
    </div>
    <div v-else>
      <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Scan & go</h4>
                    <p class="modal-content-header">Chúng tôi có thể giúp gì cho bạn ?</p>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <i class="fas fa-envelope envelope"></i>
                    <p class="content_modal">
                      Once you start a new conversation, you’ll see
                      <br/>it listed here.
                    </p>
                    <a style="margin-left:140px" href="#" @click="$router.push('/login')">Login |</a>
                    <a href="#" @click="$router.push('/register')">Register</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <a @click="showModal = true" href="#" class="border_pixed">
        <i style="margin-right:7px" class="fas fa-comments"></i>chats
      </a>
    </div>
  </div>
</template>
<script>
    export default {
        mounted() {
            if (this.$store.state.token) {
                this.getUsers();
            }
        },
        data() {
            return {
                showModal: false,
                user_id: "",
                user_name: "",
                users: []
            };
        },
        methods: {
            getUsers() {
                let self = this;
                this.$axios.get("/users/decoded").then(function (res) {
                    self.user_id = res.data.decoded.user_id;
                    self.user_name = res.data.decoded.user_name;
                    self.users = res.data.data;
                });
            }
        }
    };
</script>
<style scoped>
  .border_pixed {
    width: 98px;
    background: #00bfa5;
    height: 55px;
    position: fixed;
    bottom: 0;
    right: 0;
    border-radius: 15px 15px 0 0;
    text-align: center;
    line-height: 50px;
    color: #fff;
  }

  .modal-mask {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-content {
    width: 400px;
    height: 470px;
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .modal-content-header {
    margin: 35px 0 -5px -85px;
  }

  .envelope {
    margin: 90px 0 0 165px;
    font-size: 50px;
  }

  .envelope_1 {
    margin: 70px 0 0 165px;
    font-size: 50px;
  }

  .content_modal {
    text-align: center;
  }
</style>
