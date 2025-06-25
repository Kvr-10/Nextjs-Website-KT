'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

// MUI Components
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Components
import Navbar from '@/components/Navbar';
import LeftBanner from '@/components/AuthPageBanner/LeftBanner';
import TermFooter from '@/components/Footer/TermFooter';

// Styles
import '@/app/styles/Auth.css';

// API URL
import { apiUrl, apiUrl1 } from '@/lib/Private';

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [tabBtn, setTabBtn] = useState('customer');

  const showHidePassword = () => setShowPassword(!showPassword);

const login = async (e, usertype) => {
  e.preventDefault();

  const userType = usertype.charAt(0).toUpperCase() + usertype.slice(1).toLowerCase(); // FIXED

  if (inputEmail !== '') {
    const user = {
      email: inputEmail,
      password: inputPassword,
      user_type: userType, // Now it's correctly assigned
    };

try {
  const res = await axios.post(`${apiUrl1}/v3/api/login/`, user);
  console.log(res.data);

  if (res.data.msg === "Account Does Not Exist.") {
    Swal.fire({ title: "Account doesn't exist. Signup first.", confirmButtonColor: "#56b124" });
  } else if (res.data.msg === "Your account is not verified yet. Plz verify it first.") {
   await axios.post(`${apiUrl1}/v3/api/login/`, user);
    Swal.fire({
      title: "Activation link sent. Please verify your email.",
      confirmButtonColor: "#56b124"
    });
  } else if (res.data.msg === "Incorrect password") {
    Swal.fire({ title: "Invalid Credentials", confirmButtonColor: "#56b124" });
  } else {
const normalizedKTMauth = {
  id: res.data.user.id,
  KT_ID: res.data.user.KT_ID || null, // optional fallback
  username: res.data.user.username || res.data.user.full_name,
  account_type: res.data.user.account_type,
  mobile_number: res.data.user.phone_number,
  tokens: {
    refresh: res.data.token.refresh,
    access: res.data.token.access,
  },
};
    console.log("Saved KTMauth:", normalizedKTMauth);
    localStorage.setItem("KTMauth", JSON.stringify(normalizedKTMauth));
    Swal.fire({ title: "Login Successful", confirmButtonColor: "#56b124" });
    
const userType = normalizedKTMauth["account_type"]?.toLowerCase();

if (userType === "personal" || userType === "organization" || userType === "customer") {
  router.push("/sell/user");
} else if (["recycler", "kabadi", "collector", "dealer"].includes(userType)) {
  router.push("/dealer/home");
} else {
  // fallback route (optional)
  router.push("/");
}

  }
} catch (err) {
  console.error(err);
  Swal.fire({ title: "Account doesn't exist!!", confirmButtonColor: "#56b124" }).then(() => {
    location.reload();
  });
}
}
};


  return (
    <>
      <div className="auth__section">
        <LeftBanner />

        <div className="section">
          <h1>Sign In</h1>

          <form className="form">
            <div className="signin__type__btns">
              <button
                type="button"
                className={`signin__type ${tabBtn === 'customer' ? 'active' : ''}`}
                onClick={() => setTabBtn('customer')}
              >
                Customer
              </button>
              <button
                type="button"
                className={`signin__type ${tabBtn === 'dealer' ? 'active' : ''}`}
                onClick={() => setTabBtn('dealer')}
              >
                Dealer
              </button>
            </div>

            <TextField
              className="input"
              type="email"
              label="Email ID"
              variant="outlined"
              onChange={(e) => setInputEmail(e.target.value)}
              value={inputEmail}
              required
            />

            <FormControl variant="outlined" className="form__control">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                required
                label="Password"
                className="input"
                type={showPassword ? 'text' : 'password'}
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={showHidePassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <a className="forgot__password__link" href="/forget_password">
              Forgot Password?
            </a>

            <button className="form__button" type="submit" onClick={(e) => login(e, tabBtn)}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
