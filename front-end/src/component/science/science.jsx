import React, { useState, useEffect } from 'react';

import { Card } from 'antd';

import './science.css'

// ant design
const { Meta } = Card;

function Science() {
  const [science, setScience] = useState();

  useEffect(() => {
    const cachedHits = window.sessionStorage.getItem('science');
    if (cachedHits) {
      setScience(JSON.parse(cachedHits));
    }
    else {
      fetch(`http://127.0.0.1:5000//science`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => setScience(data))
        .catch(error => console.log(error))
    }
  }, [])

  return (
    <div>
      {science &&
        <div className='science-container'>
          <div className="card-science" key={0}>
            <h1 className="title-science">Check today's 7 news from science world (from Nature.com)</h1>
          </div>
          {science.map((info, i) => (
            <div className="card-science" key={++i}>
              <a href={`${info.link}`} target="_blank" rel="noopener noreferrer">
                <Card
                  hoverable
                  cover={<img alt="article" src={`${info.img}`} />}
                >
                  <Meta title={info.title} description={info.description} />
                </Card> </a>
            </div>))}
        </div>}
    </div>
  )
}

export default Science
