<template>
  <div class="section">
    <div class="card is-clearfix columns">
      <figure class="card-image is-480x480 column is-one-thirds">
        <img :src="product.url" alt="Placeholder image" />
      </figure>
      <div class="card-content column is-two-thirds">
        <div class="card-content__title">
          <h2 class="title is-4">
            {{ product.title }}
            <button
              class="button is-small"
              :title="removeFromFavouriteLabel"
              v-show="product.isFavourite"
              @click="removeFromFavourite(product.id)"
            >
              <span class="icon is-small">
                <i class="fa fa-heart"></i>
              </span>
            </button>
            <button
              class="button is-small"
              :title="addToFavouriteLabel"
              v-show="!product.isFavourite"
              @click="saveToFavorite(product.id)"
            >
              <span class="icon is-small">
                <i class="far fa-heart"></i>
              </span>
            </button>
          </h2>
        </div>
        <div class="card-content__text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud
          </p>
        </div>
        <div class="star">
          <div
            class="card-content__ratings "
            v-for="star in listStar"
            :key="star"
          >
            <font-awesome-icon
              v-show="isOneVote"
              v-on:click="onClickStar(star)"
              :icon="isOneVote ? faRegular : faGrinStars"
            />
            <font-awesome-icon
              v-show="!isOneVote"
              v-on:click="onClickGrinStar(star)"
              icon="fa-solid fa-star"
            />
          </div>
        </div>
        <div class="card-content__reviews">
          <div class="is-pulled-left">
            <p>
              <strong>{{
                product.reviews > 0
                  ? `${product.reviews} Reviews`
                  : "no one review"
              }}</strong>
            </p>
          </div>
          <div class=" is-rounded is-small is-pulled-right">
            <button
              :disabled="product.quantity <= 1 ? true : false"
              class="button is-small"
              @click="decreaseItem(product)"
            >
              -
            </button>

            <input
              class="input is-outlined"
              type="text"
              :value="product.quantity"
              style="width: 40px ;height: 30px"
            />
            <button class="button is-small" @click="increaseItem(product)">
              +
            </button>
          </div>
        </div>
        <div class="card-content__price is-pulled-left">
          <span class="title is-3"
            ><strong>{{ product.price }}&euro;</strong></span
          >
        </div>

        <div class="card-content__btn is-pulled-right">
          <button
            style="margin-bottom:20px"
            class="button is-primary"
            v-if="!isAddedBtn"
            @click="addToCart(product.id)"
          >
            {{ addToCartLabel }}
          </button>
          <button
            class="button is-text"
            v-if="isAddedBtn"
            @click="removeFromCart(product.id)"
          >
            {{ removeFromCartLabel }}
          </button>
        </div>
        <form v-on:keyup.enter="submit" ref="formCmt">
          <textarea
            v-model="cmt"
            id="confirmationText"
            rows="10"
            class="textarea is-primary has-fixed-size input-comment"
            placeholder="Comment here..."
          ></textarea>
        </form>

        <div class="commentLayout">
          <img src="~/assets/moe/realpcy.jpeg" class="img-circle-small" />
          <div style="padding:0px 15px 0px 5px; font-weight:700">
            real_pcy
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud
          </div>
        </div>
        <div class="commentLayout">
          <img src="~/assets/moe/kimjuncotton.jpeg" class="img-circle-small" />
          <div style="padding:0px 15px 0px 5px; font-weight:700">
            kimjuncotton
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud
          </div>
        </div>
        <div class="commentLayout">
          <img src="~/assets/moe/oohsehun.jpeg" class="img-circle-small" />
          <div style="padding:0px 15px 0px 5px; font-weight:700">
            oohsehun
          </div>
          <div>
            xinh đẹp tuyệt vời
          </div>
        </div>
        <div v-for="comm in listComment" :key="comm">
          <div class="commentLayout">
            <img src="~/assets/moe/realpcy.jpeg" class="img-circle-small" />
            <div style="padding:0px 15px 0px 5px; font-weight:700">
              real__pcy
            </div>
            <div>
              {{ comm }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faGrinStars } from "@fortawesome/free-regular-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add icons to the library */
library.add(faStar, faGrinStars);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

export default {
  name: "product_detail-id",

  validate({ params }) {
    return /^\d+$/.test(params.id);
  },

  data() {
    return {
      faRegular:"fa-regular",
      faGrinStars:"fa-grin-stars",
      isOneVote: false,
      addToCartLabel: "Add to cart",
      removeFromCartLabel: "Remove from cart",
      addToFavouriteLabel: "Add to favourite",
      removeFromFavouriteLabel: "Remove from favourite",
      product: {},
      selected: 1,
      quantityArray: [],
      cmt: ""
    };
  },

  mounted() {
    this.product = this.$store.getters.getProductById(this.$route.params.id);
    this.selected = this.product.quantity;

    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
  },

  computed: {
    isAddedBtn() {
      return this.product.isAddedBtn;
    },
    listComment() {
      return this.$store.state.listComment;
    },
    listStar() {
      return this.$store.state.listStar;
    }
  },

  methods: {
    onClickStar(item) {
      this.isOneVote = !this.isOneVote;
      this.
      console.log(item)
      
    },
    onClickGrinStar(item) {
      this.isOneVote = !this.isOneVote;
      console.log(item)
    },
    submit() {
      this.$store.commit("getCommentList", this.cmt);
      this.cmt = "";
    },
    increaseItem(item) {
      let data = {
        id: item.id,
        quantity: item.quantity + 1
      };
      this.$store.commit("quantity", data);
    },
    decreaseItem(item) {
      let data = {
        id: item.id,
        quantity: item.quantity - 1
      };
      this.$store.commit("quantity", data);
    },
    addToCart(id) {
      let data = {
        id: id,
        status: true
      };
      this.$store.commit("addToCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected
      };
      this.$store.commit("quantity", data);
    },
    saveToFavorite(id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;

      if (isUserLogged) {
        this.$store.commit("addToFavourite", id);
      } else {
        this.$store.commit("showLoginModal", true);
      }
    },
    removeFromFavourite(id) {
      this.$store.commit("removeFromFavourite", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt-input {
  width: 300px;
}
.card-content {
  padding: 15px 10px 15px 0;

  &__text {
    margin: 15px 0;
  }
  &__reviews {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
  }
}
.commentLayout {
  display: flex;
  margin: 10px 0;
}
.star {
  display: flex;
}
.img-circle-small {
  width: 40px;
  height: 37px;
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
  border: 2px solid #ccc;
  margin-bottom: 2px;
}
.input-comment {
  margin-top: 30px;
  height: 70px;
}
</style>
