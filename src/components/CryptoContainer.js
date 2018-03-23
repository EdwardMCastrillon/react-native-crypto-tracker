import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";

import FetchCoinData from "../Actions/fetchCoinData";
import CoinCard from "./CoinCard";

class CryptoContainer extends Component {

  componentWillMount() {
    this.props.FetchCoinData();
  }

  renderCoinCards() {
    
  }

  render() {
    const { crypto } = this.props;
      return (
        <View>
          {
            crypto.data && crypto.data.length > 0 ? (
              <View>
                { crypto.data.map((coin, index) => {
                  return <CoinCard
                          key={index}
                          coin_name={coin.name}
                          symbol={coin.symbol}
                          price_usd={coin.price_usd}
                          percent_change_24h={coin.percent_change_24h}
                          percent_change_7d={coin.percent_change_7d}
                        />
                  })
                }
              </View>
            ) : (
              <View>
                <Spinner
                  visible={crypto.isFetching}
                  textContent={"Loading..."}
                  textStyle={{color: '#253145'}}
                  animation="fade"
                />
              </View>
            )
          }
        </View>
      );
  }
}

function mapStateToProps(state) {
  return {
    crypto: state.crypto
  }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)