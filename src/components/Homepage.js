import topBanner from "../images/TopBanner.png";
import thirdDivImg from "../images/TB.png";
import classes from "../styles/Homepage.module.css";
import Select from "react-dropdown-select";

const Homepage = () => {
  const options = [{ label: "Amit Dhakite", value: "amit" }];
  return (
    <div>
      <div className={classes.bannerDiv}>
        <img className={classes.banner} src={topBanner}></img>
        <nav className={classes.fullNav}>
          <p class={classes.topHead}>Travel Buddy</p>
          <div class={classes.topNav}>
            {/*<div class={classes.navTitleDiv2}>
              <Select
                options={options}
                multiselect={false}
                placeholder="Search for attractions"
              />
            </div>*/}
            <div class={classes.navTitleDiv}>
              <p class={classes.navTitles}>News</p>
            </div>
            <div class={classes.navTitleDiv}>
              <p class={classes.navTitles}>Login</p>
            </div>
            <div class={classes.navTitleDiv1}>
              <p class={classes.navTitles}>SignUp</p>
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
        <div className={classes.thirdTravelBuddy}>Travel Buddy</div>
        <div className={classes.thirdDivLine}>
          Amazing place to travel with new friends.
        </div>
        <div className={classes.thirdDivLine1}>Join Today!!</div>
        <div className={classes.loginRegister}>
          <div className={classes.thirdDivLogin}>Login</div>
          <div className={classes.thirdDivLogin}>Register</div>
        </div>
      </div>
      <div className={classes.fourthDiv}></div>
    </div>
  );
};

export default Homepage;
