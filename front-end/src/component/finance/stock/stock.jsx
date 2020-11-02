import React, { useState, useEffect } from 'react';
import StockChart from './chart/chartStock'

import { Card, Col, Row, Carousel } from 'antd';

import './stock.css'

function Stock() {
    const [companies, setCompanies] = useState([]);

    const stockCompanies = [
        [
            { name: "Apple Inc.", ticker: "AAPL" },
            { name: "Microsoft Corporation", ticker: "MSFT" },
            { name: "The Walt Disney Company", ticker: "DIS" }
        ],
        [
            { name: "Alphabet Inc.", ticker: "GOOGL" },
            { name: "BP p.l.c.", ticker: "BP" },
            { name: "The Coca-Cola Company", ticker: "KO" }
        ],
        [
            { name: "Facebook, Inc.", ticker: "FB" },
            { name: "SPDR S&P 500 ETF Trust", ticker: "SPY" },
            { name: "Walmart Inc.", ticker: "WMT" }
        ]
    ]

    useEffect(() => {
        fetch(`http://127.0.0.1:5000//yahoo`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(error => console.log(error))
    }, [])

    const checkStock = (companyName) => {
        const stockNum = ((companies[companies.length - 1][companyName] - companies[companies.length - 2][companyName]) / companies[companies.length - 2][companyName] * 100).toFixed(2)
        if (stockNum == 0.00) {
            return 'no market today'
        }
        else {
            return `${stockNum}%`
        }
    }

    const chartStock = (companyName) => {
        let array = []
        let date = 0
        let stock = 0
        for (let i = 0; i < companies.length; i++) {
            if (companies[i][companyName] !== null) {
                date = companies[i].Date
                stock = companies[i][companyName]
                array.push({ 'date': date, 'stock': stock })
            }
        }
        return array
    }

    return (
        <div>
            { companies.length > 0 &&
                <div className="site-card-wrapper">
                    <Carousel autoplay>
                        {stockCompanies.map(comp =>
                            <div>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card title={comp[0].name} bordered={false} >
                                            <h2 className="stock-title">Close price</h2>
                                            <h3 className="stock-number">{checkStock(comp[0].ticker)}</h3>
                                            <StockChart chartStock = {chartStock(comp[0].ticker)} />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title={comp[1].ticker} bordered={false} >
                                            <h2 className="stock-title">Close price</h2>
                                            <h3 className="stock-number">{checkStock(comp[1].ticker)}</h3>
                                            <StockChart chartStock = {chartStock(comp[1].ticker)} />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title={comp[2].name} bordered={false} >
                                            <h2 className="stock-title">Close price</h2>
                                            <h3 className="stock-number">{checkStock(comp[2].ticker)}</h3>
                                            <StockChart chartStock = {chartStock(comp[2].ticker)} />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>)}
                    </Carousel>
                </div>}
        </div>
    )
}

export default Stock

