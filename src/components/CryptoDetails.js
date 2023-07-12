import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoCoinIdQuery, useGetCryptoHistoryQuery } from "../api/CryptoApi";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import millify from "millify";
import { Col, Row, Select, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";
import Loader from "./Loader";
const { Option } = Select;

const CryptoDetails = () => {
 
  const { coinId } = useParams();
  // console.log(coinId)
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoCoinIdQuery(coinId);
  console.log(data)
  const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timeperiod})
  console.log(coinHistory)
  if (isFetching) return <Loader/>;
  const cryptoDetails = data?.data?.coin;
  console.log(cryptoDetails)
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      id: 1,
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      id: 2,
      title: "Rank",
      value: cryptoDetails?.rank,
      icon: <NumberOutlined />,
    },
    {
      id: 3,
      title: "Price At",
      value: `$ ${cryptoDetails?.priceAt && millify(cryptoDetails?.priceAt)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      id: 4,
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      id: 5,
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      id: 6,
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      id:7,
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      id: 8,
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      id: 9,
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      id: 10,
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Typography.Title level={2} className="coin-name">
            {cryptoDetails?.name} ( {cryptoDetails?.symbol} ) Price
            {/* : {millify(cryptoDetails.price)} */}
          </Typography.Title>
          <p>
            {cryptoDetails?.name} live price in US dollar. View value
            statistics, market cap and supply.
          </p>
        </Col>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value Statistcs
            </Typography.Title>
            <p>An overview showing the stats of {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ title, value, icon, id }) => (
            <Col className="coin-stats" key={id}>
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">
              Other Statistcs
            </Typography.Title>
            <p>An overview showing the stats of all cryptocurriencies</p>
          </Col>
          {genericStats.map(({ title, value, icon, id }) => (
            <Col className="coin-stats" key={id}>
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Typography.Title level={3} className="coin-details-heading">
          What is {cryptoDetails.name}
          <Row className="coin-desc">
            {/* <p className="coin-desc"> */}
            {HTMLReactParser(cryptoDetails.description)}
            {/* </p> */}
          </Row>
        </Typography.Title>
      </Col>
      <Col className="coin-links">
        <Typography.Title className="coin-details-heading">
          {cryptoDetails.name} Links
        </Typography.Title>
        {cryptoDetails?.links.map((link, i) => (
          <Row className="coin-link" key={i}>
            <Typography.Title level={3} className="link-name">
              {link.type}
            </Typography.Title>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.name}
            </a>
          </Row>
        ))}
      </Col>
      {/* </Col> */}
    </>
  );
};

export default CryptoDetails;
