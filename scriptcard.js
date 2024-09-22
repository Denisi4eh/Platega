/*
See on github: https://github.com/muhammederdem/credit-card-form
*/
      function showPaymentOverlay() {
  const loadingOverlay = document.getElementById('loading-overlay');
  const resultMessage = document.getElementById('result-message');
  const loadingBox = document.getElementById('loading-box'); // Get the loading-box element

  loadingOverlay.style.display = 'flex';

  setTimeout(() => {
    loadingOverlay.style.display = 'none';
    loadingBox.style.display = 'none'; // Hide the white square

    // Update the message in the result-message element
    resultMessage.textContent = 'Оплата не найдена';
    resultMessage.style.display = 'block';

    // Hide the result-message after 3 seconds
    setTimeout(() => {
      resultMessage.style.display = 'none';
    }, 3000);
  }, 7000); // Wait 7 seconds before hiding the loading overlay
}

new Vue({
  el: "#app",
  data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
      cardName: "Ozon Банк",
      cardNumber: "2204 3203 2678 8140",
      cardMonth: "75",
      cardYear: "",
      cardCvv: "75",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "2204 3203 2678 8140",
      otherCardMask: "2204 3203 2678 8140",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
  },
  computed: {
    getCardType () {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
      
      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return "visa"; // default type
    },
		generateCardNumberMask () {
			return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth () {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear () {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    flipCard (status) {
      this.isCardFlipped = status;
    },
    focusInput (e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    },
      
      copyText() {
      const input = event.target;
      navigator.clipboard.writeText(input.value)
        .then(() => {
          console.log("Text copied to clipboard!");
            this.showCopyMessage = true;
          setTimeout(() => {
            this.showCopyMessage = false;
          }, 1000); // Hide after 1 second
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
        });
      }
  }      
});
