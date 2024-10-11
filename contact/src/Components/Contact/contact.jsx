 import React from 'react'
import './contact.css'
import Swal from 'sweetalert2'

 const Contact=()=>{
  
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "59d32481-0cbd-447e-b429-c1683a16cc72");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
              });
        }
      };
    

    return(
        <section className='contact'>
            <form onSubmit={onSubmit}>
                <h2>Contact Form</h2>
                <div className='input-box'>
                    <label>Full Name</label>
                    <input type='text' className='field' placeholder='Enter your name' name='name' required />

                </div>
                <div className='input-box'>
                    <label>Email Address</label>
                    <input type='email' className='field' placeholder='Enter your email' name='email' required />
                </div>
                <div className='input-box'>
                    <label>Message</label>
                    <textarea className='field mess' placeholder='Enter your message' name='message' required></textarea>
                </div>
                <button type='submit' className='btn'>Send</button>

            </form>

        </section>

    );

 };

 export default Contact;