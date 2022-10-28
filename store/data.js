import { doc, addDoc, deleteDoc, updateDoc, collection, onSnapshot, QuerySnapshot } from "@firebase/firestore";
import { db } from "../firebase/firebase";

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

export const state = () => ({
    categories: [],
    mensClothes: [],
    electronics: [],
    womensClothes: [],
    jeweleries: [],
    allGoods: {},
    btn: {},
    amount: 0,
    modalOpen: false,
    basketOpen: false,
    viewImg: false,
    // viewGood: false,
    imgSrc: '',
    text: '',
    info: [
      'Choose the product you like, carefully read its characteristics and then add it to your cart using the "Add to Cart" button.',
      'The shopping cart is available from any page of the site, so you can start placing an order at any time.',
      'You can place an order for the delivery of the selected product:',
      'By filling out a special order form on our website at any time of the day.',     
      `In our online store, you can pay for goods in two ways: `,
       'Cash to the courier upon receipt of the order ',
       'By bank transfer via bank card (online)',
      'After choosing a payment method, proceed to the next step to confirm your details and complete the order.'
    ],
    reviews: [],
    id: 0,
    edit: false,
    editedFeedback: {},
    editedFeedbackId: '',
    goodId: '',
    parent: {},
    orderedGood: {},
    orderedGoodAmount: 0,
    totalAmount: 0,
    totalSum: 0,
    checklist: {},
    productData: [],
    printContent: {}
})

export const mutations = {
  openModal(state){
    state.modalOpen = true
  },
  closeModal(state){
    state.modalOpen = false
    state.edit = false 
  },
  createdFeedbacks(state, feedbacks){
    state.reviews = feedbacks
    for(let i = 0; i < state.reviews.length; i++){
      state.reviews[i].starsCount = [];
      for(let x = 0; x < state.reviews[i].rating; x++){
        state.reviews[i].starsCount.push('')
      }
    }
  },
  async addFeedback(state, item){
    item.starsCount = []
    for(let i = 0; i < item.rating; i++){
      item.starsCount.push('')
    }
     state.reviews.push(item)
    // if(state.id <= state.reviews.length){
    //   state.id += state.reviews.length
    // }
    await addDoc(collection(db, 'reviews'), {
      name: item.name,
      feedback: item.feedback,
      rating: item.rating,
      // id: String(state.id)
    })
  },
  async deleteFeedback(state, id){
    console.log(id);
    await deleteDoc(doc(collection(db, 'reviews'), String(id) ))
  },
  changeFeedback(state, id ){
    state.edit = true 
    state.editedFeedbackId = id
    console.log(state.editedFeedbackId);
  },
  async editedFeedback(state, editedFeedback){
    await updateDoc(doc(collection(db, 'reviews'), state.editedFeedbackId), {
      name: editedFeedback.name,
      feedback: editedFeedback.rating,
      rating: editedFeedback.rating
    })
    state.reviews.forEach(feedback => {
      if(feedback.firebaseId == state.editedFeedbackId){
        name: editedFeedback.name
        feedback: editedFeedback.rating
        rating: editedFeedback.rating
      }
    });

    this.closeModal()
  },
  allGoods(state, allGoods){
    state.allGoods = allGoods;
  },
  plusOrMinus(state, btn){
    state.btn = btn
    let parent = state.btn.closest('.good'),
        parentId = parent.getAttribute('id');
    let text = parent.lastChild;   
    if(state.btn.innerHTML == 'Add to cart'){
      state.allGoods[parentId].amount++;
    } else if(state.btn.innerHTML == 'Substract from cart' && state.allGoods[parentId].amount > 0){
      state.allGoods[parentId].amount--;
    }
      text.classList.add('active')
      text.innerHTML = state.allGoods[parentId].amount;
      state.orderedGoodAmount = state.allGoods[parentId].amount
      state.orderedGood = state.allGoods[parentId]
      state.goodId = parentId;
   }, 
   basket(state){
    const productArray = [];
    for(const key in state.allGoods){
     let totalCount = 0;
     const po = state.allGoods[key];
    if(po.amount){
      productArray.push(po)
      totalCount += po.amount
      state.totalAmount = totalCount
    }
    }
    for (let i = 0; i < productArray.length; i++) {
      state.productData.push(productArray[i])
    }
    state.productData = state.productData.filter(unique)
    console.log(state.productData);
  },
  totalSumProduct(state){
    state.totalSum = 0;
    for(const key in state.allGoods) {
      state.totalSum += state.allGoods[key].totalSum
      state.totalSum = Math.round(state.totalSum)
    }
    // console.log(state.totalSum);
  },
  totalAmountProduct(state){
    state.totalAmount = 0;
    for(const key in state.allGoods) {
      state.totalAmount += state.allGoods[key].amount
      // state.totalSum = Math.round(state.totalSum)
    }
    // console.log(state.totalSum);
  },
  getChecklist(state, checklist){
     state.checklist = checklist;
    //  console.log(state.checklist);
  },
  openBasket(state){
    state.basketOpen = true
  },
  closeBasket(state){
    state.basketOpen = false
  },
  showImage(state, imgSrc, id){
    console.log(imgSrc);
    state.imgSrc = imgSrc
    console.log(id);
    // for(let x = 0; x < state.allGoods.length; x++){
    //   if(x == id){
    //     state.text = state.allGoods[x].description
    //   }
    // }
    // console.log(state.text);
    state.viewImg = true
    // state.viewGood = true
  },
  closeView(state){
    state.viewImg = false
  },
  printOrder(state, window){
    state.printContent = state.printContent
    // console.log(state.printContent);
    window.print()
  },
  printPrepare(state, print){
    // console.log(print);
    state.printContent = print
  }
} 

export const actions = {
  plusOrMinus(context, state, btn, checklist, productData){
    context.commit('plusOrMinus', state, btn)
    context.commit('basket', state)
    context.commit('totalSumProduct', state)
    context.commit('totalAmountProduct', state)
  },
  totalSum(context, state){
    context.commit('totalSumProduct', state)
  }
}

