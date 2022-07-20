import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  paymentHandler: any = null;

  constructor() {}

  ngOnInit() {
    this.invokeStripe();
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KFG5eSBjSw1UXqU0bmIQ2IjKwPEAAtoNZDZBY8G2kbcmFRXZ6fMapBAM66AMVGQeRvhD3QarzzLEDjJejJqmQXt00QLEzsHLi',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken });
        alert('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'Concept Squad',
      description: 'Booking flights at the best rates!!',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KFG5eSBjSw1UXqU0bmIQ2IjKwPEAAtoNZDZBY8G2kbcmFRXZ6fMapBAM66AMVGQeRvhD3QarzzLEDjJejJqmQXt00QLEzsHLi',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
