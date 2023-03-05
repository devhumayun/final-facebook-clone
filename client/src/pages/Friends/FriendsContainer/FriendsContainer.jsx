import React from 'react'
import { Link } from 'react-router-dom'
import './FriendsContainer.scss'

const FriendsContainer = () => {
  return (
    <div className="friends-container">
      <div className="friends-wraper">
        <div className="friends-req-section">
          <div className="friend-req-header">
            <h2> Friend requests </h2>
            <Link to=""> Sell all</Link>
          </div>
        </div>
        <div className="friend-req-list">
          <div className="friend-req-box">
            <img
              src="https://scontent.fdac151-1.fna.fbcdn.net/v/t39.30808-1/333725195_940135310761166_8743643115135413195_n.jpg?stp=dst-jpg_p240x240&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEojF5ARV5EnQlKJWuwnUrvAatZivQv9yEBq1mK9C_3IczExvCTqA2gKPPFaCCn585EryBPX4rLMjRlM4DqwtCJ&_nc_ohc=_QwgcBba8r8AX_7MPNy&_nc_ht=scontent.fdac151-1.fna&oh=00_AfAciHMT51v3_jn8Xq9bNpwSSMCfzrPjMR7AfzGCj4-nfA&oe=640A6E3D"
              alt=""
            />
            <div className="friend-info">
              <h3>Shakil Bhuiyan</h3>
              <div className="mutual">
                <div className="mutual-list">
                  <img
                    src="https://scontent.fdac151-1.fna.fbcdn.net/v/t39.30808-1/329884423_573816384665303_2062210523774560920_n.jpg?stp=c0.0.240.240a_dst-jpg_p240x240&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHB_HPrm3Cb_ixthBskjD05d2IZM5LaHGp3Yhkzktocal2GLeCSO7ZKN_yfWG4z9lkq2CjLNyIpGZ9269vllPRR&_nc_ohc=ztB0PbDf9VIAX9AgW9P&_nc_ht=scontent.fdac151-1.fna&oh=00_AfDtbA3tobK_IAyhkgW2JcTGl6txC6M-zUW1JF3Pb-uadA&oe=640A6F9C"
                    alt=""
                  />
                  <img
                    src="https://scontent.fdac151-1.fna.fbcdn.net/v/t39.30808-1/334013952_954053689103353_7685717878480248006_n.jpg?stp=dst-jpg_p240x240&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeGnVxizxpGFLmhjTpgSCSGTtqDJ8CTeTTC2oMnwJN5NMAhXokXXVWK_AiCdMtTpRanj2RzQah2sWyBkc2_Np9il&_nc_ohc=9bWLRotfSfAAX92nqmO&_nc_ht=scontent.fdac151-1.fna&oh=00_AfByn5mJnV8KParfVLy-8HPX-3mhuu0hImOqdIqQBOdGig&oe=64092B98"
                    alt=""
                  />
                </div>
                <div className="all-mutual">
                  <span> 49 mutual friends </span>
                </div>
              </div>
            </div>
            <div className="friendaction">
              <button> Confirm </button>
              <button> Delete </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendsContainer
