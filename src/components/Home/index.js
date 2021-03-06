import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import {
  FiShoppingCart,
  FiSettings,
  FiUser,
  FiDollarSign,
  FiShoppingBag
} from "react-icons/fi";
import "./style.css";
import CentralCard from "../Navigation/centralCard";
import cards from "../Navigation/cardData.json";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  setAccounts,
  setTransactions,
  setAccessToken
} from "../../redux/actions";
import { pullVitalData } from "../../configs/api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBig: false,
      fadeIn: false,
      smallContainer: "",
      data: {},
      toast: false
    };
    this.currentDate = new Date();
    this.cardFunction = this.cardFunction.bind(this);
  }

  componentDidMount = () => {
    pullVitalData();
  };

  cardFunction = () => {
    if (this.state.isBig && this.state.fadeIn) {
      this.setState({
        fadeIn: false
      });
    } else {
      setTimeout(() => {
        this.setState({
          fadeIn: true
        });
      }, 1000);
    }
    this.setState({
      isBig: !this.state.isBig,
      smallContainer: "smallContainer"
    });
  };

  render() {
    return (
      <div>
        <div className="background" />
        <div
          className="foreground"
          style={{ padding: 20, textAlign: "center" }}
        >
          <Grid container justify="center" spacing={8}>
            {cards.map(item => {
              return (
                <CentralCard
                  key={item.pathname}
                  size={item.size}
                  pathname={item.pathname}
                  title={item.title}
                >
                  {item.title === "Transaction" && <FiShoppingCart />}
                  {item.title === "Account" && <FiUser />}
                  {item.title === "Budget" && <FiDollarSign />}
                  {item.title === "Savings" && <FiShoppingBag />}
                  {item.title === "Settings" && <FiSettings />}
                </CentralCard>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  setTransactions: transactions => dispatch(setTransactions(transactions)),
  setAccounts: accounts => dispatch(setAccounts(accounts)),
  setAccessToken: token => dispatch(setAccessToken(token))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
