import { HTTP } from "../api/http-common";

export const state = () => ({
  products: [
    // {
    //   id: 1,
    //   src: "moe1.jpg",
    //   title: "Mòe 1",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 50,
    //   ratings: 3,
    //   reviews: 5,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 2,
    //   src: "moe2.jpg",
    //   title: "Mòe 2",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 35,
    //   ratings: 5,
    //   reviews: 10,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 3,
    //   src: "moe3.jpg",
    //   title: "Mòe 3",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 110,
    //   ratings: 2,
    //   reviews: 3,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 4,
    //   title: "Mòe 4",
    //   src: "moe4.jpg",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 50,
    //   ratings: 1,
    //   reviews: 0,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 5,
    //   title: "Mòe 5",
    //   src: "moe5.jpg",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 35,
    //   ratings: 4,
    //   reviews: 2,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 6,
    //   title: "Mòe 6",
    //   src: "moe6.jpg",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 110,
    //   ratings: 5,
    //   reviews: 1,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 7,
    //   title: "Mòe 7",
    //   src: "moe7.jpg",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 50,
    //   ratings: 5,
    //   reviews: 7,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 8,
    //   title: "Mòe 8",
    //   src: "moe8.jpg",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 35,
    //   ratings: 3,
    //   reviews: 0,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 9,
    //   title: "Mòe 9",
    //   src: "moe9.png",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 110,
    //   ratings: 4,
    //   reviews: 2,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // }
  ],
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: "",
    productTitleSearched: ""
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false
  },
  listComment: [],
  listStar: [0, 1, 2, 3, 4]


});

export const getters = {
  productsAdded: state => {
    return state.products.filter(el => {
      return el.isAddedToCart;
    });
  },
  productsAddedToFavourite: state => {
    return state.products.filter(el => {
      return el.isFavourite;
    });
  },
  getProductById: state => id => {
    return state.products.find(product => product.id == id);
  },
  isUserLoggedIn: state => {
    return state.userInfo.isLoggedIn;
  },
  isUserSignedUp: state => {
    return state.userInfo.isSignedUp;
  },
  getUserName: state => {
    return state.userInfo.name;
  },
  isLoginModalOpen: state => {
    return state.systemInfo.openLoginModal;
  },
  isSignupModalOpen: state => {
    return state.systemInfo.openSignupModal;
  },
  isCheckoutModalOpen: state => {
    return state.systemInfo.openCheckoutModal;
  },
  quantity: state => {
    return state.products.quantity;
  },

};

export const mutations = {
  getCommentList: (state, value) => {
    state.listComment = [...state.listComment, value]
  },
  addToCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = true;
      }
    });
  },
  setAddedBtn: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = false;
      }
    });
  },
  removeProductsFromFavourite: state => {
    state.products.filter(el => {
      el.isFavourite = false;
    });
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn;
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp;
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched;
  },
  setUserName: (state, name) => {
    state.userInfo.name = name;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched;
  },
  showLoginModal: (state, show) => {
    state.systemInfo.openLoginModal = show;
  },
  showSignupModal: (state, show) => {
    state.systemInfo.openSignupModal = show;
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show;
  },
  addToFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = true;
      }
    });
  },
  removeFromFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = false;
      }
    });
  },
  quantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.quantity = data.quantity;
      }
    });
  },
  SET_LIST_PRODUCT(state, product) {
    state.products = product;
  }
};

export const actions = {
  async fetchlistproduct({ commit }) {
    HTTP.get("/Moe-api").then(response => {
      commit("SET_LIST_PRODUCT", response.data)
    })
  },

  async logout({ commit }) {
    const { data } = await this.$axios.get("/api/logout")
    if (data.ok) commit("SET_USER", null)
  },

  async handleToken({ commit }, token) {
    const res = await this.$axios.post("/api/stripe", token)
    commit("SET_USER", res.data)
  }
} 
