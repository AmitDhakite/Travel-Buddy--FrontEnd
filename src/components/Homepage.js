import topBanner from "../images/TopBanner.png";
import classes from "../styles/Homepage.module.css";

const Homepage = () => {
  return (
    <div>
      <div className={classes.bannerDiv}>
        <img className={classes.banner} src={topBanner}></img>
        <nav className={classes.fullNav}>
          <p class={classes.topHead}>Travel Buddy</p>
          <div class={classes.topNav}>
            <div class={classes.navTitleDiv}>
              <p class={classes.navTitles}>News</p>
            </div>
            <div class={classes.navTitleDiv}>
              <p class={classes.navTitles}>Login</p>
            </div>
            <div class={classes.navTitleDiv}>
              <p class={classes.navTitles}>SignUp</p>
            </div>
          </div>
        </nav>
        <div className={classes.tagDiv}>
          <p className={classes.tagline}>FIND YOUR TRAVEL COMPANION!!</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
