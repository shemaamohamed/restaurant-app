import React, { useState } from 'react';
import Header from './Header';
import FAQ from './FAQ';

function App () {
  const [faqs, setfaqs] = useState([
    {
      question: 'What features does the app offer?',
      answer: 'Our app allows you to view the menu, place orders for takeout or delivery, make reservations, and earn rewards points for every purchase.',
      open: true
    },
    {
      question: 'How do I create an account?',
      answer: 'Simply download the app from the App Store or Google Play, open it, and follow the prompts to create an account using your email address or social media accounts.',
      open: false
    },
    {
      question: 'Can I modify my order after placing it?',
      answer: 'Once an order is placed, modifications can only be made within a short timeframe. Please contact us directly through the app or call the restaurant as soon as possible for assistance.',
      open: false
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard encryption to ensure that your payment information is secure. You can enjoy peace of mind when making transactions through our app.',
      open: false
    },
    {
      question: 'What should I do if I encounter technical issues?',
      answer: 'If you experience any technical difficulties, please visit the “Help” section in the app or contact our support team at [support email or phone number] for assistance.',
      open: false
    },
    {
      question: 'Can I view my order history in the app?',
      answer: 'Yes, you can easily view your order history by going to the “Order History” section in the app. This allows you to quickly reorder your favorite meals with just a few taps!',
      open: false
    }


  ]);

  const toggleFAQ = index => {
    setfaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      return faq;
    }))
  }


  return (
    <div className="App">
      <Header />
      <div className="faqs">
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  );
}

export default App;
