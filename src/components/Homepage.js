import { useState } from "react";
import topBanner from "../images/TopBanner.png";
import Homepage2 from "../images/Homepage2.png";
import thirdDivImg from "../images/TB.png";
import classes from "../styles/Homepage.module.css";
import Select from "react-dropdown-select";
import { Link } from "react-router-dom";
import Backdrop from "./layout/Backdrop";
import logout from "./auth/logout.js";
import Footer from "./layout/Footer";
const Homepage = () => {
  logout();
  return (
    <div>
      <div className={classes.bannerDiv}>
        <img className={classes.banner} src={topBanner}></img>
        <nav className={classes.fullNav}>
          <p class={classes.topHead}>Travel Buddy</p>
          <div class={classes.topNav}>
            <div class={classes.navTitleDiv}>
              <Link to="/login" class={classes.navTitles}>
                Login
              </Link>
            </div>
            <div class={classes.navTitleDiv1}>
              <Link to="/register" class={classes.navTitles}>
                SignUp
              </Link>
            </div>
          </div>
        </nav>
        <div className={classes.tagDiv}>
          <p className={classes.tagline}>FIND YOUR TRAVEL COMPANION!!</p>
        </div>
      </div>
      <div className={classes.secondDiv}>
        <p className={classes.secondDivQuote}>Explore the world</p>
        <div className={classes.secondDivLine}>
          Travel Buddy is a gathering place who belives that the world is a book
          and those who do not travel read only one page.
        </div>
      </div>
      <div className={classes.thirdDiv}>
        <img className={classes.thirdBanner} src={thirdDivImg}></img>
        <div className={classes.tbDiv}>
          <div className={classes.thirdTravelBuddy}>Travel Buddy</div>
          <div className={classes.thirdDivLine}>
            Amazing place to travel with new friends.
          </div>
          <div className={classes.thirdDivLine1}>Join Today!!</div>
          <div className={classes.loginRegister}>
            <Link to="/login" className={classes.thirdDivLogin}>
              Login
            </Link>
            <Link to="/register" className={classes.thirdDivLogin}>
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.fourthDiv}>
        <img className={classes.banner1} src={Homepage2} alt="travelBuddy" />
      </div>
      <Footer homepage />
    </div>
  );
};

export default Homepage;
