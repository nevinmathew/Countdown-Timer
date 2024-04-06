import axios from 'axios';
import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaV2 = () => {
  const recaptchaRef = useRef();
  const key = "secretkey"

  const handleSubmit = async (e) =>{
    event.preventDefault()
    const captchaValue = recaptchaRef.current.getValue()
    console.log(captchaValue+" "+"token")
  if (!captchaValue) {
    alert('Please verify the reCAPTCHA!')
  } else {
    // const res = await fetch('http://localhost:8000/verify', {
    //   method: 'POST',
    //   body: JSON.stringify({ captchaValue }),
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })
    const res = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${key}&response=${captchaValue}`,
      );
    const data = await res.json()
    if (data.success) {
      // make form submission
      alert('Form submission successful!')
    } else {
      alert('reCAPTCHA validation failed!')
    }
  }
}

return(
    <form onSubmit={handleSubmit} >
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={`${key}`}
      />
    </div>
    <button>Submit</button>
    </form>
  );
};

export default RecaptchaV2;
